import { web } from './web';
import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer(web);

const io = new Server(server, {
    cors : {
        origin: "*",
    }
});

export default server;