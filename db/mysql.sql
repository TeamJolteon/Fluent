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
DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER AUTO_INCREMENT,
  `email` VARCHAR(50),
  `default language` VARCHAR(50),
  `isLoggedIn` Boolean,
  `password` VARCHAR(25),
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
  `currentInterval` INTEGER,
  `repetition` INTEGER,
  `efactor` INTEGER,
  `word` VARCHAR(50),
  `language` VARCHAR(50) ,
  `definition` VARCHAR(500),
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
DROP TABLE IF EXISTS `Articles`;

CREATE TABLE `Articles` (
  `id` INTEGER AUTO_INCREMENT,
  `url` VARCHAR(100),
  `user_id` INTEGER,
  `title` VARCHAR(50),
  `date_written` DATE,
  `date_uploaded` DATE,
  `public` Boolean,
  `publication` VARCHAR(50),
  `text` TEXT,
  `userUploaded` Boolean,
  PRIMARY KEY (`id`)
);
-- ---
-- Foreign Keys
-- ---
ALTER TABLE `vocab` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `vocab` ADD FOREIGN KEY (article_id) REFERENCES `Articles` (`id`);
ALTER TABLE `sentences` ADD FOREIGN KEY (vocab_id) REFERENCES `vocab` (`id`);
ALTER TABLE `sentences` ADD FOREIGN KEY (article_id) REFERENCES `Articles` (`id`);
ALTER TABLE `Articles` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
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
INSERT INTO `Users` (`email`,`default language`,`isLoggedIn`,`password`) VALUES
('hello@here.com','english',1,'1234');
-- INSERT INTO `vocab` (`id`,`user_id`,`article_id`,`interval`,`currentInterval`,`repetition `,`efactor (difficultyVal)`,`wordInEnglish`,`language`,`definition`,`audio?`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `sentences` (`id`,`sentence`,`vocab_id`,`article_id`) VALUES
-- ('','','','');
INSERT INTO `Articles` (`url`,`title`,`date_written`,`date_uploaded`,`public`,`publication`,`text`,`userUploaded`) VALUES
('testUrl','testTitle','2022-01-31','2022-01-31',0,'NYT','text',1);