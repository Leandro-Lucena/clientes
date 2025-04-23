import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Client } from "./entity/Client";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "clientes_db",
  synchronize: true,
  logging: true,
  entities: [User, Client],
  migrations: [],
  subscribers: [],
});
