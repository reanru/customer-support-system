import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

io.on('connection', (socket) => {
    console.log('user connected:', socket.id);
});

server.listen(3001, () => console.log('Socket server running on http://localhost:3001'));