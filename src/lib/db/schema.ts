const usersTable = `CREATE TABLE IF NOT EXISTS users (
  staff_id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  age INT NOT NULL,
  password VARCHAR(100) NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(100) NOT NULL,
  gender VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL
);`;

const categoryTable = `CREATE TABLE  category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  capacity VARCHAR(100) NOT NULL,
);`;
const medicineTable = `CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  image VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  code INT NOT NULL,
  quantity INT NOT NULL,
  category_id INT NOT NULL REFERENCES category(category_id),
  brand VARCHAR(20) NOT NULL
);
`;
