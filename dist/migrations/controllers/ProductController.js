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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("../entities/Product");
// Obtener todos los productos 
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = (0, typeorm_1.getRepository)(Product_1.Product);
        const products = yield productRepository.find();
        res.json(products);
    }
    catch (error) {
        console.error('Error al obtener todos los productos: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.getAllProducts = getAllProducts;
// Obtener un producto por id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productRepository = (0, typeorm_1.getRepository)(Product_1.Product);
        const product = yield productRepository.findOne(id);
        if (!product) {
            return res.status(400).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    }
    catch (error) {
        console.error('Error al obtener el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.getProductById = getProductById;
//Crear producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = req.body;
    try {
        const productRepository = (0, typeorm_1.getRepository)(Product_1.Product);
        const product = productRepository.create(newProduct);
        yield productRepository.save(product);
        res.status(201).json(product);
    }
    catch (error) {
        console.error('Error al crear el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.createProduct = createProduct;
// Editar un producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedProductData = req.body;
    try {
        const productRepository = (0, typeorm_1.getRepository)(Product_1.Product);
        const product = yield productRepository.findOne(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        productRepository.merge(product, updatedProductData);
        yield productRepository.save(product);
        res.json(product);
    }
    catch (error) {
        console.error('Error al actualizar el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.updateProduct = updateProduct;
// Eliminar Producto
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productRepository = (0, typeorm_1.getRepository)(Product_1.Product);
        const product = yield productRepository.findOne(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        yield productRepository.remove(product);
        res.json({ message: 'Producto eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
});
exports.deleteProduct = deleteProduct;
