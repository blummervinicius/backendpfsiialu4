CREATE DATABASE sistema;

USE sistema;

CREATE TABLE cliente(
    cli_codigoC INT NOT NULL AUTO_INCREMENT,
    cli_nome VARCHAR(100) NOT NULL,
    cli_cpf VARCHAR(20) NOT NULL,
    CONSTRAINT pk_clientes PRIMARY KEY(cli_codigoC)

);

CREATE TABLE reservasC(
    res_codigoR INT NOT NULL AUTO_INCREMENT,
    res_periodoIn DATATIME NOT NULL,
    res_periodoFin DATATIME NOT NULL,
    res_carrosReservados VARCHAR(50) NOT NUL,
    cli_codigoC INT NOT NULL,
    CONSTRAINT pk_reservasC PRIMARY KEY(res_codigoR),
    CONSTRAINT fk_reservasC_cliente FOREIGN KEY(cli_codigoC) REFERENCES cliente (cli_codigoC)
);

