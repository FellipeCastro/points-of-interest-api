import mysql from "mysql2";
import mysqlPromise from "mysql2/promise";
import "dotenv/config";

const isTest = process.env.NODE_ENV === "test";

let connection = null;

if (isTest) {
    console.log(
        "NODE_ENV=test -> using short-lived connections for consult (tests/manage DB externally)"
    );
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    // Conectando com tratamento de erros
    connection.connect((error) => {
        if (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            process.exit(1); // Finaliza o processo caso a conexão falhe
        }
        console.log("Conectado ao banco de dados com sucesso!");
    });

    // Tratamento para quedas de conexão
    connection.on("error", (error) => {
        console.error("Erro na conexão com o banco de dados:", error.message);
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
            console.warn("Reconectando ao banco de dados...");
            setTimeout(() => {
                connection.connect();
            }, 2000);
        } else {
            throw error;
        }
    });
}

export const consult = isTest
    ? async (command, params = []) => {
          const conn = await mysqlPromise.createConnection({
              host: process.env.DB_HOST,
              port: process.env.DB_PORT,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
          });

          try {
              const [rows] = await conn.execute(command, params);
              await conn.end();
              return JSON.parse(JSON.stringify(rows));
          } catch (error) {
              console.error(
                  "Erro ao executar a consulta (test env):",
                  error.message
              );
              await conn.end();
              throw new Error("Falha ao consultar o banco de dados.");
          }
      }
    : (command, params = []) => {
          return new Promise((resolve, reject) => {
              connection.query(command, params, (error, result) => {
                  if (error) {
                      console.error(
                          "Erro ao executar a consulta:",
                          error.message
                      );
                      return reject(
                          new Error("Falha ao consultar o banco de dados.")
                      );
                  }
                  return resolve(JSON.parse(JSON.stringify(result)));
              });
          });
      };

export default connection;
