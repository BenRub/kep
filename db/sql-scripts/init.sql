CREATE TABLE mydb.currencies (
  `id` INT NOT NULL AUTO_INCREMENT,
  `currency` VARCHAR(100) NULL,
  `exchange` VARCHAR(100) NULL,
  `volume` INT NULL,
  `value` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `dc_ex` (`currency` ASC, `exchange` ASC));