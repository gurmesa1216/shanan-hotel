-- ═══════════════════════════════════════════════════════
-- Shanan Hotel — Database schema
-- Run this in MySQL (MariaDB / XAMPP) to create the
-- database and all tables.
-- ═══════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS shanan_hotel;
USE shanan_hotel;

-- ── Categories ──
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(255)
);

-- ── Dishes ──
CREATE TABLE IF NOT EXISTS dishes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  `portion` VARCHAR(50),
  image_url VARCHAR(255),
  gallery JSON,
  rating DECIMAL(2,1) DEFAULT 0,
  prep_time_minutes INT,
  restaurant VARCHAR(150) DEFAULT 'Shanan Hotel Kitchen',
  available BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ── Users ──
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password_hash VARCHAR(255),
  delivery_address VARCHAR(255) DEFAULT 'Bishoftu'
);

-- ── Orders ──
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subtotal DECIMAL(10,2),
  delivery_fee DECIMAL(10,2),
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2),
  status VARCHAR(30) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ── Order items ──
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  dish_id INT,
  quantity INT NOT NULL,
  price_at_order DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (dish_id) REFERENCES dishes(id)
);