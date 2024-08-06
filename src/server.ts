import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';
import { routes } from './routes/routes';
import fastifyMultipart from '@fastify/multipart';
import fastifyJwt from '@fastify/jwt';

dotenv.config();
const port = parseInt(process.env.PORT || '3000', 10);


const app = fastify({ logger: true });

const start = async () => {
    await app.register(cors);
    await app.register(fastifyCookie);
    await app.register(fastifyMultipart);
    await app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET!,
    });

    await app.register(routes);

    // Middleware de autenticação para proteger rotas
    // app.addHook('onRequest', async (request, reply) => {
    //     if (request.routerPath !== '/login' && request.routerPath !== '/refresh') {
    //         try {
    //             await request.jwtVerify();
    //         } catch (err) {
    //             reply.send(err);
    //         }
    //     }
    // });

    try {
        await app.listen({ port, host: '0.0.0.0' });
        console.log(`Server is running on http://localhost:${port}`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
