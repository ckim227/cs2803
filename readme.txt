Note that the files in the example require a table called registeredUsers within the database CS2803

Use the following queries:

drop database if exists CS2803;
create database CS2803;
use CS2803;

drop table if exists registeredUsers;
create table registeredUsers(
    username varchar(60) primary key,
    password varchar(60) not null
);
drop table if exists savedRecipies;
create table savedRecipies(
    user varchar(60),
    recipeName varchar (100),
    recipeIngredients varchar (5000),
    recipeInstructions varchar (5000),
    accessDate date,
    comment varchar(500),
    primary key (user),
	foreign key (user) references registeredusers(username)
);

drop table if exists linkedRecipies;
create table linkedRecipes(
    user varchar(60),
    recipeName varchar(100),
    link varchar(500),
    accessDate date,
    comment varchar(500),
    primary key (user),
    foreign key (user) references registeredusers(username)
);

Don't forget to use npm install to install all dependencies