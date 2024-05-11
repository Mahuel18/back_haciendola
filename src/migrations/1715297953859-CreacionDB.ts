import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";

export class CreacionDB1715297953859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "username", type: "varchar" },
                { name: "email", type: "varchar" },
                { name: "password", type: "varchar" }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "product",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "handle", type: "varchar" },
                { name: "title", type: "varchar" },
                { name: "description", type: "text" },
                { name: "sku", type: "varchar" },
                { name: "grams", type: "double precision" },
                { name: "stock", type: "int" },
                { name: "price", type: "double precision" },
                { name: "compare_price", type: "double precision" },
                { name: "barcode", type: "varchar" }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user", true);
        await queryRunner.dropTable("product", true);
    }


}
