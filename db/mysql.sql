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
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL DEFAULT 'NULL',
  `default language` VARCHAR(50) NULL DEFAULT NULL,
  `isLoggedIn` Boolean NULL DEFAULT NULL,
  `password` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
-- ---
-- Table 'vocab'
--
-- ---
DROP TABLE IF EXISTS `vocab`;

CREATE TABLE `vocab` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `article_id` INTEGER NOT NULL,
  `interval` INTEGER NULL DEFAULT NULL,
  `currentInterval` INTEGER NULL DEFAULT NULL,
  `repetition` INTEGER NULL DEFAULT NULL,
  `efactor` INTEGER NULL DEFAULT NULL,
  `word` VARCHAR(50) NULL DEFAULT NULL,
  `language` VARCHAR(50) NULL DEFAULT NULL ,
  `definition` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
-- ---
-- Table 'sentences'
--
-- ---
DROP TABLE IF EXISTS `sentences`;

CREATE TABLE `sentences` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `sentence` VARCHAR(1000) NULL DEFAULT NULL,
  `vocab_id` INTEGER NOT NULL,
  `article_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);
-- ---
-- Table 'Articles'
--
-- ---
DROP TABLE IF EXISTS `Articles`;

CREATE TABLE `Articles` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(100) DEFAULT NULL,
  `user_id` INTEGER NOT NULL,
  `title` VARCHAR(50) DEFAULT NULL,
  `date_written` DATE NULL DEFAULT NULL,
  `date_uploaded` DATE NULL DEFAULT NULL,
  `public` Boolean NULL DEFAULT NULL,
  `publication` VARCHAR(50) NULL DEFAULT NULL,
  `text` TEXT NULL DEFAULT NULL,
  `userUploaded` Boolean NULL DEFAULT NULL,
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
-- INSERT INTO `Users` (`id`,`email*`,`default language`,`isLoggedIn (bool)`,`password (?)`) VALUES
-- ('','','','','');
-- INSERT INTO `vocab` (`id`,`user_id`,`article_id`,`interval`,`currentInterval`,`repetition `,`efactor (difficultyVal)`,`wordInEnglish`,`language`,`definition`,`audio?`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `sentences` (`id`,`sentence`,`vocab_id`,`article_id`) VALUES
-- ('','','','');
-- INSERT INTO `Articles` (`id`,`url`,`user_id`,`title`,`upvotes`,`author`,`date written`,`date uploaded`,`public (boolean)`,`articleId from API`,`publication`,`text`,`userUploaded (boolean)`) VALUES
-- ('','','','','','','','','','','','','');