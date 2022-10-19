const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT id AS 'saleId', date, product_id AS 'productId', quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id;`,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT  date, product_id AS 'productId', quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    WHERE StoreManager.sales.id = ?;`,
    [id],
  );

  return result;
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
};

const update = async (saleId, products) => {
  const result = products.map(async ({ productId, quantity }) => connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [quantity, productId, saleId],
  ));

  await Promise.all(result);

  const updatedProduct = await getById(saleId);

  return { saleId, itemsUpdated: updatedProduct };
};

const findProductBySaleId = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );

  return result;
};

const insertProduct = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );

  const promises = [];

  products.map(async ({ productId, quantity }) => {
    const query = `INSERT INTO StoreManager.sales_products
     (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    const a = await connection.execute(query, [insertId, productId, quantity]);
    promises.push(a);
  });

  await Promise.all(promises); 

  return insertId;
};

module.exports = {
  getAll, getById, deleteById, update, findProductBySaleId, insertProduct,
};