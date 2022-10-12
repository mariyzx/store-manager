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

module.exports = { findAll, findById, insert };