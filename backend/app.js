const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8080']
    }
});
const port = 3000

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`)
})

// ---------------------------------

let rooms = []

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`)
    socket.on('disconnect', (socket) => {
        console.log('[disconnect]')
    });

    socket.on('playerData', (player) => {
        console.log(`[playerData] ${player.username}`)
        let room = null

        if (!player.roomId) {
            room = createRoom(player)
            console.log(`[create room] - ${room.id} - ${player.username}`)
        }

    })
})

function createRoom(player) {
    const room = {
        id: createRoomId(),
        players: []
    }

    player.roomId = room.id
    room.players.push(player)
    rooms.push(room)

    return room
}

function createRoomId() {
    return Math.random().toString(36).substr(2, 9)
}