CREATE TABLE tab_usuario (
  id_usuario bigint(20) NOT NULL AUTO_INCREMENT,
  ativo bit(1) NOT NULL,
  content_type varchar(50) DEFAULT NULL,
  data_vencimento date DEFAULT NULL,
  email varchar(100) NOT NULL,
  falha_login int(11) DEFAULT NULL,
  foto varchar(100) DEFAULT NULL,
  password varchar(100) NOT NULL,
  username varchar(100) NOT NULL,
  PRIMARY KEY (id_usuario)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;