CREATE TABLE tab_refresh_token (
  id_token bigint(20) NOT NULL AUTO_INCREMENT,
  bloqueado bit(1) NOT NULL,
  expirado bit(1) NOT NULL,
  token varchar(1024) DEFAULT NULL,
  usuario_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id_token),
  FOREIGN KEY (usuario_id) REFERENCES tab_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;