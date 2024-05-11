import { DataSource } from "typeorm"

 export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/.ts"],
    });
    
AppDataSource.initialize()
.then(() =>{
    console.log("Data Source has been started")
})
.catch((err) => {
    console.error("Error during Data source initialization: ", err)
})