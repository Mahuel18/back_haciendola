import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController'
import swaggerJSDoc from 'swagger-jsdoc';
import { authenticateToken } from '../utils/authenticate';

const api = express.Router();

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
api.get('/', authenticateToken, getAllProducts)


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
api.get('/:id', authenticateToken, getProductById);

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
api.post('/', authenticateToken, createProduct);

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
api.put('/:id', authenticateToken, updateProduct);

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
api.delete('/:id', authenticateToken, deleteProduct);

export default api;