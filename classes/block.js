const crypto = require('crypto-js');
const   { DIFFICULTY, mine_rate} = require('../config')
    
class Block{
    constructor(creationDate, lastHash, hash, data, nonce, difficulty){
        this.creationDate = creationDate
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFFICULTY

    }

    static genesisBlock(){
        return new this('Ocarina of Time', '------', 'f1r57-h45h', [], 0, DIFFICULTY)
    }

    static mineBlock(lastBlock, data){
        let nonce = 0, hash, cDate
        let { difficulty } = lastBlock
        do {
            nonce++
            cDate = Date.now()
            difficulty = this.adjustDifficulty(lastBlock, cDate)
            hash = this.hash(cDate, lastBlock.hash, data, nonce, difficulty)
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(cDate, lastBlock.hash, hash, data, nonce, difficulty)
    }

    static hash(creationDate, lastHash, data, nonce, difficulty){
        return crypto.SHA256(`${creationDate}${lastHash}${data}${nonce}${difficulty}`).toString()
    }

    static blockHash(block){
        return this.hash(block.creationDate, block.lastHash, block.data, block.nonce, block.difficulty)
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock
        difficulty = lastBlock.cDate + mine_rate > currentTime ? difficulty + 1 : difficulty - 1

        return difficulty
    }
}


module.exports = Block