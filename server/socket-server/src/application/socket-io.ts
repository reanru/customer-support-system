import { web } from './web';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { prismaClient } from "../application/database";
const server = createServer(web);

const io = new Server(server, {
    cors : {
        origin: "*",
    }
});

// Event ketika klien terhubung ke server Socket.IO
io.on('connection', (socket) => {

    let availableAgents: string[] = []; // ['agentId']
    let availableRooms = []; // { room: 'visitorId', agent: 'agentId' }

    console.log(`User ${socket.id} connected`);

    socket.on('init-session', async (data) => {
        const checkSession = await prismaClient.session.findFirst({
            where: {
                visitorId: data
            }
        });

        if(!checkSession){
            await prismaClient.session.create({
                data: {
                    visitorId: data,
                    isActive: true,
                    assignedTo: availableAgents[0] ?? null
                },
            });

        }
        
        socket.join(data);
        // io.to(data).emit('receiveMessage', data);
    });

    // Menangani permintaan masuk room untuk visitor
    socket.on('joinRoomVisitor', (room) => {
        console.log(`Visitor ${socket.id} joined rooms: ${room}`);
    });

    // Menangani permintaan masuk room untuk agant
    socket.on('joinRoomAgent', (room) => {
        // socket.join(room);

        console.log(`Agent ${socket.id} joined rooms: ${room}`);
    });

    // Menangani pesan dari klien untuk kirim data ke orang lain
    socket.on('sendMessage', (data) => {
        // Mengirim pesan ke semua klien dalam room yang sama

        console.log(`User send to room : ${data.receiver}#${data.sender} - message : ${data.message}`);

        // io.to(`${data.receiver}#${data.sender}`).emit('receiveMessage', data);
    });
});

export default server;