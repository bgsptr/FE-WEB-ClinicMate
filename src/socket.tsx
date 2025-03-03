import { io } from 'socket.io-client';

const url = `ws://localhost:3001/chat`

export const socket = io(url, {
    transports: ["websocket"]
});