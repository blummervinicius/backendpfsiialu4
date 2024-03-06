CREATE DATABASE sistema;

USE sistema;

CREATE TABLE hospedes(
    hosp_codigoH INT NOT NULL AUTO_INCREMENT,
    hosp_nome VARCHAR(100) NOT NULL, 
    hosp_cpf VARCHAR(20) NOT NULL,
    CONSTRAINT pk_hospedes PRIMARY KEY(hosp_codigoH)
);


CREATE TABLE reservas(
    res_codigoRes INT NOT NULL AUTO_INCREMENT,
    res_periodoIn VARCHAR(100) NOT NULL,
    res_periodoFin  VARCHAR(100) NOT NULL,
    res_quartosReservados VARCHAR(100) NOT NULL, 
    hosp_codigoH INT NOT NULL,
    CONSTRAINT pk_reservas PRIMARY KEY(res_codigoRes),
);

