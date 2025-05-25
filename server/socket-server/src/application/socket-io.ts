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

const AGENT_ROOM = 'AGENT-ROOM';

// Event ketika klien terhubung ke server Socket.IO
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.join(AGENT_ROOM);

    // Menangani permintaan masuk room untuk visitor
    socket.on('join-room-visitor', async (visitorId) => {
        // console.log('Available agent ', manager.getAll().length, ' - ', manager.getAll().map(data => { return data.agent }).join(', '));

        const checkSession = await prismaClient.session.findFirst({
            where: {
                visitor_id: visitorId
            }
        });

        if(!checkSession){
            const session = await prismaClient.session.create({
                data: {
                    visitor_id: visitorId,
                    status: 'WAITING',
                    assigned_to: manager.getAll()[0]?.agent ?? null
                },
            });

            io.to(AGENT_ROOM).emit('init-session', session);
        }

        socket.join(visitorId);
        // console.log('visitor init-session ', socket.id);
        console.log(`Visitor ${socket.id} joined rooms: ${visitorId} `, manager.getAll().map(data => { return data.agent }).join(', '));
        // io.to(data).emit('receiveMessage', data);
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