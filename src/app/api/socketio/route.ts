

import { Server } from 'socket.io';
import { NextApiResponse } from 'next';
import { Server as HTTPServer } from 'http';
import { NextRequest } from 'next/server';

interface ExtendedServer extends HTTPServer {
  io?: Server;
}

export async function GET(req: NextRequest, res: any) {
  const socket = res.socket;

  if (!socket || !socket.server) {
    return new Response('Socket server not available.', { status: 500 });
  }

  const server: ExtendedServer = socket.server;

  if (server.io) {
    console.log('Socket.IO already initialized.');
    return new Response('Socket.IO server already running.', { status: 200 });
  }

  console.log('Initializing Socket.IO');

  const io = new Server(server, {
    path: '/api/socketio', // Ensure this matches the client path
    cors: {
      origin: '*', // Adjust for production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (clientSocket) => {
    console.log('New client connected:', clientSocket.id);

    clientSocket.on('customer-message', (message) => {
      console.log('Customer message:', message);
      io.emit('admin-message', message);
    });

    clientSocket.on('admin-message', (message) => {
      console.log('Admin message:', message);
      io.emit('customer-message', message);
    });

    clientSocket.on('disconnect', () => {
      console.log('Client disconnected:', clientSocket.id);
    });
  });

  server.io = io;

  return new Response('Socket.IO server initialized.', { status: 200 });
}