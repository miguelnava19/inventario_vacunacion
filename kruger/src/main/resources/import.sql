INSERT INTO usuarios (username, password, nombre, apellido, email) VALUES ('mnava','$2a$10$MOncLHvolXejFS7kLN44c.2IFGOPA1wbuNq/lfA0Xg0pKLasZAFZC', 'Miguel', 'Nava','mnava@gmail.com');
INSERT INTO usuarios (username, password, nombre, apellido, email) VALUES ('admin','$2a$10$HvpP9YHalfk/hnU0qSh/iek1zAu5iS8gIWvvVzou2XCJQxYm4Wjm2', 'John', 'Doe','jonh@gmail.com');

INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1, 1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2, 2);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2, 1);