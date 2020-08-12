CREATE TABLE Station (
  sID INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(60) NOT NULL,
  description VARCHAR(300),
  maxFailed INT DEFAULT 0,
  `order` INT,
  `rank` INT
);

CREATE TABLE StationGroup (
  groupID INT AUTO_INCREMENT PRIMARY KEY,
  stationID INT NOT NULL,
  title VARCHAR(60),
  `order` INT,

  FOREIGN KEY (stationID) REFERENCES Station (sID)
);

CREATE TABLE StationItem (
  itemID INT AUTO_INCREMENT PRIMARY KEY,
  groupID INT NOT NULL,
  item VARCHAR(90),
  `order` INT,
  required BOOLEAN,

  FOREIGN KEY (groupID) REFERENCES StationGroup (groupID)
);

CREATE TABLE StationPacket(
  packetID INT AUTO_INCREMENT PRIMARY KEY,
  stationID INT NOT NULL,
  role VARCHAR(20),
  info VARCHAR(20),
  `text` VARCHAR(4000),
  `order` INT,

  FOREIGN KEY (stationID) REFERENCES Station (sID)
);

DELIMITER $$
CREATE TRIGGER station_level BEFORE INSERT ON Station
FOR EACH ROW
BEGIN
  SET NEW.level = (SELECT COUNT(sID) FROM Station WHERE `class`=NEW.class);
END $$
DELIMITER ;
