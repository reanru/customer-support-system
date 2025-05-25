import { web } from './web';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { prismaClient } from "../application/database";

import AvailableAgentManager from 'src/_class/AvailableAgentManagerClass';

const server = createServer(web);

const io = new Server(server, {
    cors : {
        origin: "*",
    }
});

type AvailableAgent = {
    client: string,
    agent: string
}

// let availableAgents: AvailableAgent[] = []; // ['agentId']
// let availableRooms = []; // { room: 'visitorId', agent: 'agentId' }

const manager = new AvailableAgentManager();

// Event ketika klien terhubung ke server Socket.IO
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('init-session', async (data) => {
        // console.log('Available agent ', manager.getAll().length, ' - ', manager.getAll().map(data => { return data.agent }).join(', '));

        const checkSession = await prismaClient.session.findFirst({
            where: {
                visitor_id: data
            }
        });

        if(!checkSession){
            await prismaClient.session.create({
                data: {
                    visitor_id: data,
                    status: 'WAITING',
                    assigned_to: manager.getAll()[0]?.agent ?? null
                },
            });

        }        

        socket.join(data);
        // io.to(data).emit('receiveMessage', data);
    });

    // Menangani permintaan masuk room untuk visitor
    socket.on('joinRoomVisitor', (room) => {
        // console.log(`Visitor ${socket.id} joined rooms: ${room}`);
    });

    // Menangani permintaan masuk room untuk agant
    socket.on('join-room-agent', (agentId) => {
        socket.join(agentId);

        // availableAgents.push({ client: socket.id, agent: agentId }); 
        manager.add(socket.id, agentId);
        // console.log(`Agent ${socket.id} joined rooms: ${agentId}`);
    });

    // Menangani pesan dari klien untuk kirim data ke orang lain
    socket.on('sendMessage', (data) => {
        // Mengirim pesan ke semua klien dalam room yang sama

        console.log(`User send to room : ${data.receiver}#${data.sender} - message : ${data.message}`);

        // io.to(`${data.receiver}#${data.sender}`).emit('receiveMessage', data);
    });

    // Event ketika klien terputus dari server
    socket.on('disconnect', () => {
        manager.remove(socket.id);
        console.log(`User ${socket.id} disconnected `, manager.getAll().map(data => { return data.agent }).join(', '));
    });
});

export default server;