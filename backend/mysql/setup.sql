USE project;


CREATE TABLE `cryptos` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NOT NULL,
  `code` VARCHAR(255) UNIQUE NOT NULL,
  `imageurl` VARCHAR(255) NOT NULL
  );

CREATE TABLE `currents` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
  );

CREATE TABLE `articles` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `summary` VARCHAR(255) NOT NULL,
  `source` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `urlpage` VARCHAR(255) NOT NULL,
  `urlimage` VARCHAR(255) NULL
  );


CREATE TABLE `users` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `isadmin`  BOOLEAN DEFAULT FALSE,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `token` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `current` INT NULL,
  FOREIGN KEY(current) REFERENCES currents(id),
  `article` INT NULL, 
  FOREIGN KEY(article) REFERENCES articles(id)
  );

CREATE TABLE `favorites` (
  `id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NOT NULL,
  `code` VARCHAR(255) NOT NULL,
  `imageurl` VARCHAR(255) NOT NULL,
  `user` INT NULL, 
  FOREIGN KEY(user) REFERENCES users(id)
  );

INSERT INTO currents (name) VALUES ("EUR");
INSERT INTO currents (name) VALUES ("USD");
INSERT INTO currents (name) VALUES ("BTC");
INSERT INTO users (isadmin, username, email, password, current) VALUES (TRUE, 'user', 'admin@admin.fr', 'U2FsdGVkX190MKXmZh1FIbmDwE+WTWOjXiVhvKvjCH4=', 1);
