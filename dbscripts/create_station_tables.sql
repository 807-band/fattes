CREATE TABLE Station (
  sID INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(60) NOT NULL,
  description VARCHAR(300),
  maxFailed INT DEFAULT 0,
  level INT,
  class INT
);

CREATE TABLE StationGroup (
  groupID INT AUTO_INCREMENT PRIMARY KEY,
  stationID INT NOT NULL,
  title VARCHAR(60),
  level INT,

  FOREIGN KEY (stationID) REFERENCES Station (sID)
);

CREATE TABLE StationItem (
  itemID INT AUTO_INCREMENT PRIMARY KEY,
  groupID INT NOT NULL,
  item VARCHAR(90),
  level INT,
  required BOOLEAN,

  FOREIGN KEY (groupID) REFERENCES StationGroup (groupID)
);

CREATE TABLE StationPacket(
  packetID INT AUTO_INCREMENT PRIMARY KEY,
  stationID INT NOT NULL,
  role VARCHAR(20),
  info VARCHAR(20),
  content VARCHAR(4000),
  level INT,

  FOREIGN KEY (stationID) REFERENCES Station (sID)
);
