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

    socket.on('playerData', (player) => {
        console.log(`[player data received] ${player.username}`)
        let room = null

        if (!player.roomId) {
            room = createRoom(player)
            console.log(`[create room] - ${room.id} - ${player.username}`)

            socket.broadcast.emit('getRoomsList', rooms)
        }
        // else {
        //     room = rooms.find(r => r.id === player.roomId)

        //     if (room === undefined) return

        //     room.players.push(player)
        // }

        socket.join(room.id)
        io.to(socket.id).emit('join room', room.id)

        if (room.players.length === 2) {
            io.to(room.id).emit('start game', room.players)
        }

    })

    socket.on('roomsData', () => {
        io.emit('getRoomsList', rooms)
    })

    socket.on('disconnect', () => {
        console.log(`[disconnect] ${socket.id}`)
        let room = null

        rooms.forEach(r => {
            r.players.forEach(p => {
                if (p.socketId === socket.id && p.host) {
                    room = r
                    rooms = rooms.filter(r => r !== room)
                    socket.broadcast.emit('getRoomsList', rooms)
                }
            })
        })
    });
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