CREATE TABLE `cryptos` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `currentprice` VARCHAR(255) NOT NULL,
  `openingprice` VARCHAR(255) NOT NULL,
  `lowestpriceday` VARCHAR(255) NOT NULL,
  `highestpriceday` VARCHAR(255) NOT NULL,
  `urlimage` VARCHAR(255) NOT NULL
  );

CREATE TABLE `currents` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
  );

CREATE TABLE `articles` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(1024) NOT NULL,
  `summary` VARCHAR(1024) NOT NULL,
  `source` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `urlpage` VARCHAR(1024) NOT NULL,
  `urlimage` VARCHAR(1024) NULL
  );

CREATE TABLE `users` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `isadmin`  BOOLEAN DEFAULT FALSE,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `token` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `crypto` INT NULL,
  FOREIGN KEY(crypto) REFERENCES cryptos(id),
  `current` INT NULL,
  FOREIGN KEY(current) REFERENCES currents(id),
  `article` INT NULL,
  FOREIGN KEY(article) REFERENCES articles(id)
  );
