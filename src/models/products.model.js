const connection = require('./connection');

const findAll = async () => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result[0];
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async (product) => {
  const [result] = await connection.execute(
    `INSERT INTO StoreManager.products (name) VALUES ('${product}')`,
    [product],
  );
  const finalObj = { id: result.insertId, name: product };
  return finalObj;
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

const update = async (name, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
};

const findByQuery = async (q) => {
  const [products] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${q}%'`,
  );
    console.log(products);
  return products;
};

module.exports = { findAll, findById, insert, deleteById, update, findByQuery };