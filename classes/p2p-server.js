const WSocket = require('ws')
    P2P_PORT = process.env.P2P_PORT || 5001
    peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2PServer {
    constructor(blockchain){
        this.blockchain = blockchain
        this.sockets = []
    }

    listen(){
        const server = new WSocket.Server({ port: P2P_PORT})
        server.on('connection', socket => this.connectSocket(socket))
        
        this.connectToPeers()
        
        console.log(`Listening on peer-to-peer connections on: ${P2P_PORT}`);
        
    }

    connectSocket(socket){
        this.sockets.push(socket)
        console.log("Socket connected")
        //console.table(this.sockets)

        this.msgHandler(socket)
        this.sendChain(socket)
    }

    connectToPeers(){
        peers.forEach(peer => {
            const socket = new WSocket(peer)

            socket.on('open', () => this.connectSocket(socket))
        })
    }

    msgHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message)


            this.blockchain.replaceChain(data)
        })
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain))
    }
    syncChains(){
        this.sockets.forEach(socket => {
            this.sendChain(socket)
        })
    }
}

module.exports = P2PServer