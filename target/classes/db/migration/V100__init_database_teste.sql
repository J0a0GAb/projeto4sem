
set foreign_key_checks = 0;

delete from tab_role;
delete from tab_usuario;
delete from tab_usuario_role;
delete from tab_refresh_token;

set foreign_key_checks = 1;

alter table tab_role auto_increment = 1; 
alter table tab_usuario auto_increment = 1; 
alter table tab_refresh_token auto_increment = 1;

insert into tab_role (id_role, nome) values (1, 'Administrador');
insert into tab_role (id_role, nome) values (2, 'Vendedor');
insert into tab_role (id_role, nome) values (3, 'Usuario');

insert into tab_usuario (id_usuario, username, email, password, ativo  ) values 
(1,'Joao da Silva','joao@gmail.com.br','$2a$12$JNypkjjLWNQBhetZ26K2auLzBuyT.sapkv3pQTJhCPB8TIT4XsnRa',1);
insert into tab_usuario (id_usuario, username, email, password, ativo  ) values
(2,'Maria de Andrade','maria@gmail.com.br','$2a$12$JNypkjjLWNQBhetZ26K2auLzBuyT.sapkv3pQTJhCPB8TIT4XsnRa',1);
insert into tab_usuario (id_usuario, username, email, password, ativo  ) values
(3,'Katia de Oliveira','katia@gmail.com.br','$2a$12$JNypkjjLWNQBhetZ26K2auLzBuyT.sapkv3pQTJhCPB8TIT4XsnRa',1);

insert into tab_usuario_role (usuario_id, role_id ) values (1,1),(1,2),(1,3); 
insert into tab_usuario_role (usuario_id, role_id ) values (2,2),(2,3);
insert into tab_usuario_role (usuario_id, role_id ) values (3,1),(3,3);


