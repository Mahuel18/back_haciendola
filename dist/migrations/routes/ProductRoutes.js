"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const api = express_1.default.Router();
api.get('/', ProductController_1.getAllProducts);
api.get('/:id', ProductController_1.getProductById);
api.post('/', ProductController_1.createProduct);
api.put('/:id', ProductController_1.updateProduct);
api.delete('/:id', ProductController_1.deleteProduct);
exports.default = api;
