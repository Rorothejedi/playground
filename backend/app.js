const app = require('express')();
const http = require('http').createServer(app);

// localhost

// const frontendHost = 'http://localhost:8080'
// const host = 'http://localhost'

// production

const frontendHost = 'http://playground.rodolphe-cabotiau.com'
const host = 'http://node.playground.rodolphe-cabotiau.com'

const port = 3000

const io = require('socket.io')(http, {
    cors: {
        origins: [frontendHost]
    }
});

http.listen(port, () => {
    console.log(`Listening on ${host}:${port}/`)
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
        } else {
            room = rooms.find(r => r.id === player.roomId)

            if (room === undefined) return

            player.roomId = room.id;
            room.players.push(player)
        }

        socket.join(room.id)
        io.to(socket.id).emit('joinRoom', room.id)
        console.log(`[join room] ${room.id}`)

        if (room.players.length === 2) {
            io.to(room.id).emit('startGame', room.players)
            io.emit('allRooms', rooms)
            console.log(`[start game] ${room.id}`)
        }
    })

    socket.on('leaveGame', (room) => {
        console.log('leaveGame', socket.id)
        destroyRoom(socket, rooms)
        io.to(room.id).emit('leaveRoom', room.players)
    })

    socket.on('roomsData', () => {
        io.emit('allRooms', rooms)
    })

    socket.on('play', (player) => {
        delete player.enemyPlayer

        console.log(`[play] ${player}`)
        io.to(player.roomId).emit('play', player)
    })

    socket.on('playRockPaperScissors', (data) => {
        socket.to(data.roomId).emit('playRockPaperScissors', data)
    })

    socket.on('replay', (roomId) => {
        const room = rooms.find(r => r.id === roomId)

        if (room && room.players.length === 2) {
            console.log(`[replay] ${roomId}`)
            io.to(room.id).emit('replay')
        }
    })

    socket.on('disconnect', () => {
        destroyRoom(socket)

        console.log('rooms : ', rooms)
        console.log(`[disconnect] ${socket.id}`)
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

    console.log(`[create room] - ${room.id} - ${player.username}`)

    io.emit('allRooms', rooms)

    return room
}

function destroyRoom(socket) {
    let room = null

    rooms.forEach(r => {
        r.players.forEach(p => {
            if (p.socketId === socket.id) {
                room = r
                rooms = rooms.filter(r => r !== room)

                console.log(`[destroy room] - ${room.id} - ${p.username}`)

                socket.leave(room.id)
            }
        })
    })

    socket.broadcast.emit('allRooms', rooms)
}

function createRoomId() {
    return Math.random().toString(36).substr(2, 9)
}