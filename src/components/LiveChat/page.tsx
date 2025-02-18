
// 'use client';
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// interface LiveChatProps {
//   role: 'admin' | 'user';
//   username: string;
// }

// // Use the same path as the server
// const socket = io({ path: '/api/socketio' });

// const LiveChat: React.FC<LiveChatProps> = ({ role, username }) => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     if (role === 'user') {
//       socket.on('admin-message', (message: string) => {
//         setMessages((prev) => [...prev, `Admin: ${message}`]);
//       });
//     } else if (role === 'admin') {
//       socket.on('customer-message', (message: string) => {
//         setMessages((prev) => [...prev, `Customer: ${message}`]);
//       });
//     }

//     return () => {
//       socket.off('admin-message');
//       socket.off('customer-message');
//     };
//   }, [role]);

//   const sendMessage = () => {
//     if (input.trim()) {
//       if (role === 'user') {
//         socket.emit('customer-message', input);
//       } else if (role === 'admin') {
//         socket.emit('admin-message', input);
//       }
//       setMessages((prev) => [...prev, `${username}: ${input}`]);
//       setInput('');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
//       <h2 className="text-lg font-bold mb-4">
//         {role === 'admin' ? 'Admin Panel - Live Chat' : 'Live Chat'}
//       </h2>
//       <div className="overflow-y-auto h-64 border rounded p-2 mb-4 bg-gray-50">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="text-sm p-2 mb-2 rounded bg-gray-100 text-gray-800">
//             {msg}
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LiveChat;

