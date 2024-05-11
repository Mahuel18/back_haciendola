import express from 'express';
import { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import authRoutes from './routes/authRoutes'
import ProductRoutes from './routes/ProductRoutes';

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 4201;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

app.use((req: Request, res: Response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  });


  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Productos',
        version: '1.0.0',
        description: 'Una API para administrar productos',
      },
      servers: [
        {
          url: 'http://localhost:4201/api',
          description: 'Servidor de desarrollo',
        },
      ],
    },
    apis: ['src/routes/ProductRoutes.ts', 'src/controllers/ProductController.ts'],
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/api', ProductRoutes);


