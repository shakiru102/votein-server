import { Socket } from "socket.io"

// @ts-ignore
export default io => {
    io.on('connection', (socket: Socket) => {
        console.log('running')
    })
} 