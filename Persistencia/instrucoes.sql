CREATE DATABASE sistema;

USE sistema;


CREATE TABLE cliente (
    cli_codigoC INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cli_nome VARCHAR(100) NOT NULL,
    cli_cpf VARCHAR(20) NOT NULL,
    cli_telefone VARCHAR(20)
);

CREATE TABLE reservasC (
    res_codigoR INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    res_periodoIn DATE NOT NULL, 
    res_periodoFin DATE NOT NULL,
    res_quantidade INT NOT NULL,							
    res_valor DECIMAL(10, 2) NOT NULL,
    cli_codigoC INT,
    FOREIGN KEY (cli_codigoC) REFERENCES cliente(cli_codigoC)
);

CREATE TABLE veiculo (
    vei_codigoV INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vei_modelo VARCHAR(100) NOT NULL,
    vei_ano INT NOT NULL,
    vei_placa VARCHAR(20) NOT NULL,
);

CREATE TABLE reservas_veiculos (
    res_codigoR INT,
    vei_codigoV INT,
    PRIMARY KEY (res_codigoR, vei_codigoV),
    FOREIGN KEY (res_codigoR) REFERENCES reservasC(res_codigoR),
    FOREIGN KEY (vei_codigoV) REFERENCES veiculo(vei_codigoV)
);




//

-- CREATE TABLE cliente (
--     cli_codigoC INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     cli_nome VARCHAR(100) NOT NULL,
--     cli_cpf VARCHAR(20) NOT NULL,
--     cli_telefone VARCHAR(20),
-- 	cli_reservas INT NOT NULL DEFAULT 0
-- );

-- CREATE TABLE reservasC (
--     res_codigoR INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     res_periodoIn DATE NOT NULL, 
--     res_periodoFin DATE NOT NULL,
--     res_carroDescricao VARCHAR(100) NOT NULL,
--     res_carrosReservados INT NOT NULL,
--     res_valor DECIMAL(10, 2) NOT NULL,
--     cli_codigoC INT,
--     FOREIGN KEY (cli_codigoC) REFERENCES cliente(cli_codigoC)
-- );







//

-- CREATE TABLE cliente (

-- 	cli_codigoC INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	cli_nome  VARCHAR(100) NOT NULL,
-- 	cli_cpf VARCHAR(20) NOT NULL
-- );

-- CREATE TABLE reservasC (
		
-- 	res_codigoR INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	res_periodoIn DATE NOT NULL, 
-- 	res_periodoFin DATE NOT NULL,
-- 	res_carroDescricao VARCHAR(100) NOT NULL,
-- 	res_carrosReservados INT NOT NULL,
-- 	res_valor DECIMAL (10,2) NOT NULL	

-- );

-- CREATE TABLE cliente_reserva (

-- 	cli_codigoC INT,
-- 	res_codigoR INT,
-- 	FOREIGN KEY (cli_codigoC) REFERENCES cliente(cli_codigoC),
--     FOREIGN KEY (res_codigoR) REFERENCES reservasC(res_codigoR),
--     PRIMARY KEY (cli_codigoC, res_codigoR)

-- );