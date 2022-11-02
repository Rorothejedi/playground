const app = require('express')()
const http = require('http').createServer(app)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let frontendHost = 'https://playground.rodolphe-cabotiau.com'
let host = 'https://node.playground.rodolphe-cabotiau.com'

if (process.env.NODE_ENV !== 'production') {
    frontendHost = 'http://localhost:8080'
    host = 'http://localhost'
}

const port = 3000

const io = require('socket.io')(http, {
    cors: {
        origins: [frontendHost]
    }
});

http.listen(port, () => {
    console.log('\x1b[32m%s\x1b[0m', `Listening on ${host}:${port}/`)
})

// ---------------------------------

let rooms = []

io.on('connection', (socket) => {
    console.log(`[connection] - ${socket.id}`)

    socket.on('toServer_createOrJoinRoom', (data) => {
        let room = null

        if (!data.roomId) {
            room = createRoom(data)
        } else {
            room = rooms.find(r => r.id === data.roomId)

            if (room === undefined) return emitErrorTo(socket.id, 'room_noExist')
            if (room.game !== data.game) return emitErrorTo(socket.id)
            if (data.host) return emitErrorTo(socket.id)
            if (room.players.length === room.numberOfPlayer) return emitErrorTo(socket.id, 'room_full')

            data.roomId = room.id
            room.players.push(data)

            console.log('\x1b[36m%s\x1b[0m', `[join room] (id: ${room.id})`)
        }

        socket.join(room.id)

        io.emit('toClient_getRooms', rooms)
    })

    socket.on('toServer_leaveRoom', () => {
        leaveRoom(socket, rooms)
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
        leaveRoom(socket)

        console.log(`[disconnect] - ${socket.id}`)
    })
})

function createRoom(data) {
    const room = {
        id: createRoomId(),
        game: data.game,
        scoreToReach: data.scoreToReach,
        numberOfPlayer: data.numberOfPlayer,
        players: [],
    }

    data.roomId = room.id

    room.players.push(data)
    rooms.push(room)

    console.log('\x1b[36m%s\x1b[0m', `[create room] (id: ${room.id}) by ${data.username}`)

    return room
}

function leaveRoom(socket) {
    rooms.forEach((room, i) => {
        room.players.forEach(player => {
            if (player.socketId !== socket.id) return
            if (room.players.length === room.numberOfPlayer) return destroyRoom(socket, room)
            if (room.players.length === 1) return destroyRoom(socket, room)

            rooms[i].players = room.players.filter(p => p.socketId !== player.socketId)
            socket.leave(room.id)

            console.log('\x1b[33m%s\x1b[0m', `[leave room] (id: ${room.id})`)
        });
    })

    socket.broadcast.emit('toClient_getRooms', rooms)
}

function destroyRoom(socket, room) {
    rooms = rooms.filter(r => r.id !== room.id)

    socket.leave(room.id)

    console.log('\x1b[33m%s\x1b[0m', `[destroy room] (id: ${room.id})`)

    socket.broadcast.emit('toClient_getRooms', rooms)
}

function createRoomId() {
    return Math.random().toString(36).substr(2, 9)
}

function emitErrorTo(socketId, type = 'error') {
    console.log('\x1b[31m%s\x1b[0m', `[error] (type: ${type})`)
    if (type === 'error') io.to(socketId).emit('toClient_error')
    if (type === 'room_full') io.to(socketId).emit('toClient_error_room_full')
    if (type === 'room_noExist') io.to(socketId).emit('toClient_error_room_noExist')
}