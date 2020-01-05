create table users (
id integer primary key,
username varchar(100) not null unique,
pwd varchar(20) not null);

GO

create table roles (
id integer primary key,
role varchar(100) not null unique);

GO

create table user_roles (
user_id integer not null,
role_id integer not null);

GO
        
insert into users values (1, 'admin', 'password');
insert into roles values (1, 'server-administrator');
insert into roles values (2, 'content-administrator');
insert into user_roles values (1, 1);
insert into user_roles values (1, 2);

GO

SELECT * FROM users;
GO

