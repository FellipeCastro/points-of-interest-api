-- db/init/create_schema.sql
CREATE DATABASE IF NOT EXISTS xy_gps_pois CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE xy_gps_pois;

CREATE TABLE IF NOT EXISTS points_of_interest (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  coordinate_x INT NOT NULL,
  coordinate_y INT NOT NULL
);

-- Optional seed data (uncomment to insert sample rows)
-- INSERT INTO points_of_interest (name, coordinate_x, coordinate_y) VALUES
-- ('Adega do João', 20, 10),
-- ('Casa da Maria', 10, 5);
