drop table if exists Charities;
drop table if exists Cities;
drop table if exists Users;
drop table if exists Zones;
drop table if exists ZoneCharities;
drop table if exists ZoneScores;

create table Charities (
	Id int not null,
	Name varchar(128) not null,
	Description varchar(2048) not null,
	Url varchar(2048),
	LogoUrl varchar(2048),
	JustGivingUrl varchar(2048),
	primary key (Id)
);

create table Cities {
	Id int not null auto_increment,
	Name varchar(64) not null unique,
	primary key (Id)
};

create table Users (
	Username varchar(32) not null,
	Email varchar(64) not null unique,
	Password varchar(32) not null,
	Token char(128),
	CityId varchar(64),
	primary key (Username)
);

create table Zones (
	Id int not null auto_increment,
	X int not null,
	Y int not null,
	primary key (Id)
);

create table ZoneCharities {
	ZoneId int not null,
	CharityId int not null,
	primary key (ZoneId, CharityId),
	foreign key (CharityId) references Charities(Id),
	foreign key (ZoneId) references Zones(Id)
};

create table ZoneScores {
	Username varchar(32) not null,
	ZoneId int not null,
	Score int not null default 0,
	primary key (Username, ZoneId),
	foreign key (Username) references Users(Username),
	foreign key (ZoneId) references Zones(Id)
};