CREATE USER IF NOT EXISTS 'rewt'@'%' IDENTIFIED BY 'p4ssw0rd';
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user WHERE Host <> 'localhost';

show grants;

/*GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'  WITH GRANT OPTION;*/
/*GRANT ALL PRIVILEGES ON *.* TO 'rewt'@'%'  WITH GRANT OPTION;*/
/*GRANT ALL PRIVILEGES ON *.* TO 'coder'@'%'  WITH GRANT OPTION;*/

