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

    // Menangani saat agent online
    socket.on('available-agent', (agentId) => {
        manager.add(socket.id, agentId);
    });

    // Menangani permintaan masuk room untuk agent -> menggunakan visitorId sebagai room
    socket.on('join-room-agent', (rooms) => {
        rooms.forEach((visId: string) => {
            socket.join(visId);
            console.log(`Agent ${socket.id} joined rooms: ${visId}`);
        });

    });

    // Menangani pesan dari agent/visitor untuk kirim lawan bicara
    socket.on('send-message', async (data) => {
        // console.log(`User send to room : ${data.receiver}#${data.sender} - message : ${data.message}`);

        const { session_id, sender_id, content, sender_type, room } = data;

        // 1. Validasi sesi dan identitas pengirim
        const session = await prismaClient.session.findUnique({where: {id: session_id}});
        // if (!session) return socket.emit('error', { message: 'Invalid session' });

        console.log('check session_id ', session_id);
        

        // 2. Simpan ke database
        const message = await prismaClient.message.create({
            data: {
                session_id: session_id,
                sender_id: sender_id,
                sender_type: sender_type,
                content: content
            }
        });

        // 3. Kirim ke lawan bicara melalui room session
        socket.to(room).emit('receive-message', message);

        // io.to(`${data.receiver}#${data.sender}`).emit('receiveMessage', data);
    });

    // Event ketika klien terputus dari server
    socket.on('disconnect', () => {
        manager.remove(socket.id);
        console.log(`User ${socket.id} disconnected `, manager.getAll().map(data => { return data.agent }).join(', '));
    });
});

export default server;