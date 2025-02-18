
// import { Server } from 'socket.io';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Server as HTTPServer } from 'http';
// import { Socket } from 'net';

// // Extend the socket type to include `server.io`
// interface ExtendedSocket extends Socket {
//   server: HTTPServer & { io?: Server };
// }

// const socketHandler = (req: NextApiRequest, res: NextApiResponse) => {
//   if (!res.socket) {
//     res.end();
//     return;
//   }

//   const socket = res.socket as ExtendedSocket;

//   // Check if Socket.IO is already initialized
//   if (socket.server.io) {
//     console.log('Socket.IO already running');
//     res.end();
//     return;
//   }

//   console.log('Initializing Socket.IO');

//   // Create a new instance of Socket.IO server
//   const io = new Server(socket.server, {
//     path: '/api/socketio',
//     cors: {
//       origin: '*', // Adjust to your frontend domain for production
//       methods: ['GET', 'POST'],
//     },
//   });

//   // Listen for connections
//   io.on('connection', (clientSocket) => {
//     console.log('New client connected', clientSocket.id);

//     // When a customer sends a message, emit it to the admin
//     clientSocket.on('customer-message', (message) => {
//       console.log('Customer message:', message);
//       io.emit('admin-message', message);
//     });

//     // When an admin sends a reply, emit it to the customer
//     clientSocket.on('admin-message', (message) => {
//       console.log('Admin message:', message);
//       io.emit('customer-message', message);
//     });

//     // Handle client disconnect
//     clientSocket.on('disconnect', () => {
//       console.log('Client disconnected', clientSocket.id);
//     });
//   });

//   // Attach the instance to the server
//   socket.server.io = io;

//   res.end();
// };

// export default socketHandler;
