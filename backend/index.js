const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A new client connected');
    ws.on('message', (message) => {
        console.log('Received move:', message);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); 
            }
        });
    });

    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

console.log('WebSocket server is listening on ws://localhost:8080');
