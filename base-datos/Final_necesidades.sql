-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema portal-de-necesidades
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `portal-de-necesidades` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
-- -----------------------------------------------------

-- -----------------------------------------------------

USE `portal-de-necesidades` ;

-- -----------------------------------------------------
-- Table `portal-de-necesidades`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portal-de-necesidades`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `biografia` TINYTEXT NULL DEFAULT NULL,
  `avatar` VARCHAR(45) NULL DEFAULT NULL,
  `pwd` VARCHAR(200) NOT NULL,
  `active` TINYINT NOT NULL DEFAULT '0',
  `role` VARCHAR(45) NULL DEFAULT 'user',
  `create_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted` TINYINT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portal-de-necesidades`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portal-de-necesidades`.`servicios` (
  `idservicios` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `descripcion` TINYTEXT NOT NULL,
  `fichero` VARCHAR(45) NULL DEFAULT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  `finalizado` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`idservicios`),
  UNIQUE INDEX `idservicios_UNIQUE` (`idservicios` ASC) VISIBLE,
  INDEX `fk_servicios_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_servicios_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `portal-de-necesidades`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portal-de-necesidades`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portal-de-necesidades`.`comentarios` (
  `idcomentarios` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `comentario` TINYTEXT NOT NULL,
  `fichero_comentario` VARCHAR(45) NULL DEFAULT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  `servicios_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idcomentarios`),
  UNIQUE INDEX `idcomentarios_UNIQUE` (`idcomentarios` ASC) VISIBLE,
  INDEX `fk_comentarios_users_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_comentarios_servicios1_idx` (`servicios_id` ASC) VISIBLE,
  CONSTRAINT `fk_comentarios_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `portal-de-necesidades`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentarios_servicios1`
    FOREIGN KEY (`servicios_id`)
    REFERENCES `portal-de-necesidades`.`servicios` (`idservicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `portal-de-necesidades`.`likes_servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portal-de-necesidades`.`likes_servicios` (
  `idlikes` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `like` INT NULL,
  `servicios_id` INT UNSIGNED NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idlikes`),
  INDEX `fk_likes_servicios_servicios1_idx` (`servicios_id` ASC) VISIBLE,
  INDEX `fk_likes_servicios_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_likes_servicios_servicios1`
    FOREIGN KEY (`servicios_id`)
    REFERENCES `portal-de-necesidades`.`servicios` (`idservicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_likes_servicios_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `portal-de-necesidades`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portal-de-necesidades`.`likes_comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portal-de-necesidades`.`likes_comentarios` (
  `idlikes` INT NOT NULL AUTO_INCREMENT,
  `like` INT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  `comentarios_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idlikes`),
  INDEX `fk_likes_comentarios_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_likes_comentarios_comentarios1_idx` (`comentarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_likes_comentarios_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `portal-de-necesidades`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_likes_comentarios_comentarios1`
    FOREIGN KEY (`comentarios_id`)
    REFERENCES `portal-de-necesidades`.`comentarios` (`idcomentarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
