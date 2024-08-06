// src/routes/protected.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ImageController, DownloadImageController, GetImageByIdController, GetImageByImageIdController, ListImageController, DeleteImageByIdController } from '../controllers/ImageController';

export async function protectedRoutes(app: FastifyInstance) {
    app.post("/upload", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ImageController().handle(request, reply);
    });

    app.get('/download/image/:id', async (request, reply) => {
        return new DownloadImageController().handle(request, reply);
    });

    app.get("/imagem/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetImageByIdController().handle(request, reply);
    });

    app.get("/imagem/all/:accountId", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetImageByImageIdController().handle(request, reply);
    });

    app.get("/imagem/all", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListImageController().handle(request, reply);
    });

    app.delete("/imagem/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteImageByIdController().handle(request, reply);
    });

    // Adicione outras rotas protegidas aqui
}
