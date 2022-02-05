DROP DATABASE IF EXISTS volt;
CREATE DATABASE IF NOT EXISTS volt;

USE volt;
-- ---
-- Globals
-- ---
-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;
-- ---
-- Table 'Users'
--
-- ---
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT,
  `email` VARCHAR(50) UNIQUE,
  `default_language` VARCHAR(50),
  `isLoggedIn` Boolean,
  `password` VARCHAR(100),
  PRIMARY KEY (`id`)
);
-- ---
-- Table 'vocab'
--
-- ---
DROP TABLE IF EXISTS `vocab`;

CREATE TABLE `vocab` (
  `id` INTEGER AUTO_INCREMENT,
  `user_id` INTEGER,
  `article_id` INTEGER,
  `interval` INTEGER,
  `currentInterval` INTEGER DEFAULT 1,
  `repetition` INTEGER DEFAULT 0,
  `efactor` float DEFAULT 2.5,
  `word` VARCHAR(50),
  `definition` VARCHAR(500),
  `deleted` Boolean default 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE `translations` (
  `id` INTEGER AUTO_INCREMENT,
  `word_id` INTEGER NOT NULL,
  `language` VARCHAR(50),
  `translation` VARCHAR(100),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'sentences'
--
-- ---
DROP TABLE IF EXISTS `sentences`;

CREATE TABLE `sentences` (
  `id` INTEGER AUTO_INCREMENT,
  `sentence` VARCHAR(1000),
  `vocab_id` INTEGER,
  `article_id` INTEGER,
  PRIMARY KEY (`id`)
);
-- ---
-- Table 'Articles'
--
-- ---
DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` INTEGER AUTO_INCREMENT,
  `url` VARCHAR(1000),
  `user_id` INTEGER,
  `title` VARCHAR(500),
  `date_written` DATE,
  `date_uploaded` DATE,
  `public` Boolean,
  `publication` VARCHAR(50),
  `text` TEXT,
  `userUploaded` Boolean,
  `deleted` Boolean DEFAULT 0,
  PRIMARY KEY (`id`)
);
-- ---
-- Foreign Keys
-- ---
ALTER TABLE `vocab` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `vocab` ADD FOREIGN KEY (article_id) REFERENCES `articles` (`id`);

ALTER TABLE `translations` ADD FOREIGN KEY (word_id) REFERENCES `vocab` (`id`);

ALTER TABLE `sentences` ADD FOREIGN KEY (vocab_id) REFERENCES `vocab` (`id`);
ALTER TABLE `sentences` ADD FOREIGN KEY (article_id) REFERENCES `articles` (`id`);

ALTER TABLE `articles` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
-- ---
-- Table Properties
-- ---
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `vocab` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `sentences` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Articles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ---
-- Test Data
-- ---
INSERT INTO `users` (`email`,`default_language`,`isLoggedIn`,`password`) VALUES
('hello@here.com','english',1,'1234');

INSERT INTO `users` (`email`,`default_language`,`isLoggedIn`,`password`) VALUES
('test@mail.com','english',0,'password');


INSERT INTO `users` (`email`, `default_language`)
VALUES
('alexromeroreyes09@gmail.com', 'Swedish'),
('elliehunt8@gmail.com', 'Swedish'),
('fidwrs@gmail.com', 'Swedish'),
('ginwoopak@gmail.com', 'Swedish'),
('jacobhawkins7@gmail.com', 'Swedish'),
('jmitchell31@g.ucla.edu', 'Swedish'),
('lihouheng0710@gmail.com', 'Swedish'),
('tawata.daniel@gmail.com', 'Swedish'),
('timnevada@gmail.com', 'Swedish');


INSERT INTO `articles` (`user_id`,`url`,`title`,`date_written`,`date_uploaded`,`public`,`publication`,`text`,`userUploaded`) VALUES
(1,'testUrl','testTitle','2022-01-31','2022-01-31',0,'NYT','text',1);
INSERT INTO `articles` (`user_id`,`url`,`title`,`date_written`,`date_uploaded`,`public`,`publication`,`text`,`userUploaded`) VALUES
(1,'testUrl','title','2022-01-31','2022-01-31',0,'NYT','text',0);

INSERT INTO `vocab` (`user_id`,`article_id`,`interval`,`currentInterval`,`repetition`,`efactor`,`word`,`definition`) VALUES
(1,1,3,11,35,3.5,'hello','yoyo');

INSERT INTO `vocab` (`user_id`,`article_id`,`interval`,`currentInterval`,`repetition`,`efactor`,`word`,`definition`) VALUES
(2,2,3,5,35,3.5,'zebra','an animal');


INSERT INTO `sentences` (`sentence`,`vocab_id`,`article_id`) VALUES
('hello thi is a sentence','1','1');
INSERT INTO `sentences` (`sentence`,`vocab_id`,`article_id`) VALUES
('hello thi is a sentence','2','2');

INSERT INTO `translations` (`language`,`word_id`,`translation`) VALUES
('Swedish','1','Hej');
INSERT INTO `translations` (`language`,`word_id`,`translation`) VALUES
('jp','1','シマウマ');

INSERT INTO `translations` (`language`,`word_id`,`translation`) VALUES
('Swedish','2','Hej');
INSERT INTO `translations` (`language`,`word_id`,`translation`) VALUES
('jp','2','シマウマ');



-- To run this mySQL file type the following command in your terminal: mysql -u root < db/mysql.sql

-- drop foreign key commands

-- alter table articles drop constraint articles_ibfk_1; drop user id fk from articles
-- alter table articles drop constraint articles_ibfk_1; drop user id fk from articles
