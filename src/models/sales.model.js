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

module.exports = { getAll, getById };