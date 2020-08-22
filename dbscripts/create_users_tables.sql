CREATE TABLE Users (
  userID INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL,
  password VARCHAR(60) NOT NULL,
  name VARCHAR(40)
);

CREATE TABLE Permissions (
  userID INT NOT NULL,
  permission VARCHAR(40) NOT NULL,

  PRIMARY KEY (userID, permission),

  FOREIGN KEY (userID) REFERENCES Users (userID) ON DELETE CASCADE
);

CREATE TABLE BandGroups (
  groupID INT PRIMARY KEY AUTO_INCREMENT,
  groupType VARCHAR(30) NOT NULL,
  groupName VARCHAR(40) NOT NULL,

  UNIQUE (groupType, groupName)
);

CREATE TABLE UserGroups (
  userID INT NOT NULL,
  groupID INT NOT NULL,

  PRIMARY KEY (userID, groupID),

  FOREIGN KEY (userID) REFERENCES Users (userID) ON DELETE CASCADE,
  FOREIGN KEY (groupID) REFERENCES BandGroups (groupID) ON DELETE CASCADE
);

CREATE TABLE LeadershipRoles (
  roleID INT PRIMARY KEY AUTO_INCREMENT,
  role VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE Leadership (
  userID INT NOT NULL,
  roleID INT NOT NULL,

  PRIMARY KEY (userID, roleID),

  FOREIGN KEY (userID) REFERENCES Users (userID) ON DELETE CASCADE,
  FOREIGN KEY (roleID) REFERENCES LeadershipRoles (roleID) ON DELETE CASCADE
);

CREATE TABLE Sections (
  sectionID INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE SectionMembers (
  userID INT NOT NULL,
  sectionID INT NOT NULL,

  PRIMARY KEY (userID, sectionID),

  FOREIGN KEY (userID) REFERENCES Users (userID) ON DELETE CASCADE,
  FOREIGN KEY (sectionID) REFERENCES Sections (sectionID) ON DELETE CASCADE
);
