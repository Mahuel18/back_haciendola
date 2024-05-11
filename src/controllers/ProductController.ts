import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Product } from '../entities/Product';

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Operaciones relacionadas con productos
 * 
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del producto
 *         handle:
 *           type: string
 *           description: Version corta del nombre del producto
 *         title:
 *           type: string
 *           description: Version Completa del nombre del producto
 *         description:
 *           type: string
 *           description: Descripcion del producto
 *         SKU:
 *           type: string
 *           description: SKU del producto
 *         grams:
 *           type: number
 *           description: Peso del producto en gramos
 *         stock:
 *           type: number
 *           description: Cantidad del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         comparePrice:
 *           type: number
 *           description: Precio de comparacion del producto
 *         barcode:
 *           type: string
 *           description: Codigo de barras del producto
 *       example:
 *         id: 1
 *         handle: Producto de ejemplo
 *         title: PRODUCTO DE EJEMPLO
 *         description: Ejemplo diseñado para presentar un Producto
 *         sku: 60870131002
 *         grams: 25
 *         stock: 14
 *         price: 35.00
 *         comparePrice: 34.99
 *         barcode: 7891253003689
 *
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Retorna todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
export const getAllProducts = async (req: Request, res: Response) => {
    try {
            const productRepository = AppDataSource.getRepository(Product);
            const products = await productRepository.find();
            res.json(products);
    } catch (error){
        console.error('Error al obtener todos los productos: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
};

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     description: Retorna un producto específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a obtener
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({ where: { id: parseInt(id, 10) } });

        if(!product){
            return res.status(400).json({ message: 'Producto no encontrado' });
        }

        res.json(product)

    } catch (error){
        console.error('Error al obtener el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
};

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: Crea un nuevo producto con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
export const createProduct = async (req: Request, res: Response) => {
    const newProduct = req.body;

    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = productRepository.create(newProduct);
        await productRepository.save(product);
        res.status(201).json(product);
    } catch (error){
        console.error('Error al crear el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
};

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Actualiza un producto por su ID
 *     description: Actualiza un producto existente basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedProductData = req.body;

    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({ where: { id: parseInt(id, 10) } });

        if (!product){
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        productRepository.merge(product, updatedProductData);
        await productRepository.save(product)
        res.json(product)
    } catch (error){
        console.error('Error al actualizar el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
};



/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     description: Elimina un producto existente basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 */
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({ where: { id: parseInt(id, 10) } });

        if (!product){
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        await productRepository.remove(product)

        res.json( {message: 'Producto eliminado correctamente' })
    } catch (error){
        console.error('Error al eliminar el producto: ', error);
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
};
