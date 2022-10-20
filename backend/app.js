const app = require('express')();
const http = require('http').createServer(app);

// localhost

const frontendHost = 'http://localhost:8080'
const host = 'http://localhost'

// production

// const frontendHost = 'https://playground.rodolphe-cabotiau.com'
// const host = 'https://node.playground.rodolphe-cabotiau.com'

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

    socket.on('toServer_createOrJoinRoom', (data) => {
        let room = null

        if (!data.roomId) {
            room = createRoom(data)
        } else {
            room = rooms.find(r => r.id === data.roomId)

            if (room === undefined) return

            data.roomId = room.id
            room.players.push(data)
        }

        socket.join(room.id)

        io.emit('toClient_getRooms', rooms)
    })

    socket.on('toServer_leaveRoom', () => {
        destroyRoom(socket, rooms)
    })

    socket.on('toServer_getRooms', () => {
        io.emit('toClient_getRooms', rooms)
    })

    socket.on('toServer_playToMorpion', (data) => {
        socket.to(data.roomId).emit('toClient_playToMorpion', data)
    })

    socket.on('toServer_playToRockPaperScissors', (data) => {
        socket.to(data.roomId).emit('toClient_playToRockPaperScissors', data)
    })

    socket.on('toServer_playToConnect4', (data) => {
        socket.to(data.roomId).emit('toClient_playToConnect4', data)
    })

    socket.on('toServer_replay', (roomId) => {
        const room = rooms.find(r => r.id === roomId)

        if (room && room.players.length === room.numberOfPlayer) {
            socket.to(room.id).emit('toClient_replay')
        }
    })

    socket.on('disconnect', () => {
        destroyRoom(socket)

        console.log('ROOMS AVAILABLE : ', rooms)
        console.log(`[disconnect] ${socket.id}`)
    })
})

function createRoom(data) {
    const room = {
        id: createRoomId(),
        scoreToReach: data.scoreToReach,
        numberOfPlayer: data.numberOfPlayer,
        players: []
    }

    data.roomId = room.id
    room.players.push(data)
    rooms.push(room)

    console.log(`[create room] - ${room.id} - ${data.username}`)

    io.emit('toClient_getRooms', rooms)

    return room
}

function destroyRoom(socket) {
    let room = null

    rooms.forEach(r => {
        r.players.forEach(p => {
            if (p.socketId !== socket.id) return
            room = r;
            rooms = rooms.filter(r => r !== room);

            console.log(`[destroy room] - ${room.id}`);

            socket.leave(room.id);
        });
    })

    socket.broadcast.emit('toClient_getRooms', rooms)
}

function createRoomId() {
    return Math.random().toString(36).substr(2, 9)
}