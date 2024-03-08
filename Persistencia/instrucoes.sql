CREATE DATABASE sistema;

USE sistema;

CREATE TABLE cliente (
    cli_codigoC INT NOT NULL AUTO_INCREMENT,
    cli_nome VARCHAR(100) NOT NULL,
    cli_cpf VARCHAR(20) NOT NULL,
    PRIMARY KEY (cli_codigoC)
);

CREATE TABLE modeloC (
    mod_codigoM INT NOT NULL,
    cli_codigoC INT,
    mod_modelo VARCHAR(100) NOT NULL,
    mod_descricao VARCHAR(100) NOT NULL,
    mod_valorAlu DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (mod_codigoM), 
    FOREIGN KEY (cliente_cli_codigoC) REFERENCES cliente(cli_codigoC)
);

CREATE TABLE reservasC (
    res_codigoR INT NOT NULL,
    mod_codigoM INT NOT NULL,
    res_periodoIn DATE NOT NULL,
    res_periodoFin DATE NOT NULL,
    res_carrosReservados VARCHAR(50) NOT NULL,
    PRIMARY KEY (res_codigoR),
    CONSTRAINT fk_modeloC FOREIGN KEY (mod_codigoM) REFERENCES modeloC (mod_codigoM),
);