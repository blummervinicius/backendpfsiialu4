CREATE DATABASE sistema;

USE sistema;

CREATE TABLE cliente (

	cli_codigoC INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	cli_nome  VARCHAR(100) NOT NULL,
	cli_cpf VARCHAR(20) NOT NULL
);

CREATE TABLE reservasC (
		
	res_codigoR INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	res_periodoIn DATE NOT NULL, 
	res_periodoFin DATE NOT NULL,
	res_carroDescricao VARCHAR(100) NOT NULL,
	res_carrosReservados INT NOT NULL,
	res_valor DECIMAL (10,2) NOT NULL	

);

CREATE TABLE cliente_reserva (

	cli_codigoC INT,
	res_codigoR INT,
	FOREIGN KEY (cli_codigoC) REFERENCES cliente(cli_codigoC),
    FOREIGN KEY (res_codigoR) REFERENCES reservasC(res_codigoR),
    PRIMARY KEY (cli_codigoC, res_codigoR)

);