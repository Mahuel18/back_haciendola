"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreacionDB1715297953859 = void 0;
const typeorm_1 = require("typeorm");
class CreacionDB1715297953859 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "user",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true },
                    { name: "username", type: "varchar" },
                    { name: "email", type: "varchar" },
                    { name: "password", type: "varchar" }
                ]
            }), true);
            yield queryRunner.createTable(new typeorm_1.Table({
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
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("user", true);
            yield queryRunner.dropTable("product", true);
        });
    }
}
exports.CreacionDB1715297953859 = CreacionDB1715297953859;
