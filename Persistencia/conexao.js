import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost', //129.146.68.51
            user: 'root', //process.env.USUARIO_BD
            password: '', //process.env.SENHA_BD  
            database: 'fsiialu4',//'backendaluno4pfsii',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, 
            idleTimeout: 60000, 
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
          });

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}