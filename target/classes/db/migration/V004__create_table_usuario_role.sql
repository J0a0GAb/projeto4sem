CREATE TABLE tab_usuario_role (
  usuario_id bigint(20) NOT NULL,
  role_id bigint(20) NOT NULL,
  PRIMARY KEY (usuario_id,role_id),
  FOREIGN KEY (usuario_id) REFERENCES tab_usuario (id_usuario),
  FOREIGN KEY (role_id) REFERENCES tab_role (id_role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;