import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "user_task_management",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
