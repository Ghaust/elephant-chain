var crypto = require('crypto-js');

class Block{
    constructor(creationDate, lastHash, hash, data){
        this.creationDate = creationDate
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    static genesisBlock(){
        return new this('Ocarina of Time', '------', 'f1r57-h45h', [])
    }

    static mineBlock(lastBlock, data){
        const cDate = Date.now()

        return new this(cDate, lastBlock.hash, this.hash(cDate, lastBlock.hash, data), data)
    }

    static hash(creationDate, lastHash, data){
        return crypto.SHA256(`${creationDate}${lastHash}${data}`).toString()
    }
}


module.exports = Block