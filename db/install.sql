-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `restaurang` DEFAULT CHARACTER SET utf8 ;
USE `restaurang` ;

-- -----------------------------------------------------
-- Table `restaurang`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurang`.`customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `restaurang`.`bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurang`.`bookings` (
  `bookings_id` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  `amount_of_people` VARCHAR(1) NOT NULL,
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`bookings_id`),
  INDEX `fk_customer_id_idx` (`customer_id` ASC),
  CONSTRAINT `fk_customer_id`
    FOREIGN KEY (`customer_id`)
    REFERENCES `restaurang`.`customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
