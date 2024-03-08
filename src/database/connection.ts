import { DataSource } from "typeorm";
import { Client } from "../app/entity/Client";
import { User } from "../app/entity/User";

export const Connection = new DataSource({
    type: "mssql",
    host: "xxxx",
    port: 1111,
    username: "xxxx",
    password: "xxxx",
    database: "xxxx",
    options: { encrypt: false },
    entities: [
        Client,
        User
    ]
});

Connection.initialize()
.then(() => {
    console.log(">>> Banco conectado");
}).catch((error: any) => {
    console.log(error)
    throw new Error(">>> Não foi possível conectar com o banco de dados")
});
