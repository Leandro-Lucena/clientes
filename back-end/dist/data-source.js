"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Client_1 = require("./entity/Client");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "clientes_db",
    synchronize: true,
    logging: true,
    entities: [User_1.User, Client_1.Client],
    migrations: [],
    subscribers: [],
});
