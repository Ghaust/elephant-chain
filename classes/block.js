const ChainUtil = require('./cryptocurrency/chain-util')
const   { DIFFICULTY, MINE_RATE} = require('../config')
    
class Block{
    constructor(creationDate, lastHash, hash, data, nonce, difficulty){
        this.creationDate = creationDate
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFFICULTY
        
    }

    toString() {
        return `Block -
          Timestamp : ${this.timestamp}
          Last Hash : ${this.lastHash.substring(0, 10)}
          Hash      : ${this.hash.substring(0, 10)}
          Nonce     : ${this.nonce}
          Difficulty: ${this.difficulty}
          Data      : ${this.data}`;
      }
      
    static genesisBlock(){
        return new this('Ocarina of Time', '------', 'f1r57-h45h', [], 0, DIFFICULTY)
    }

    static mineBlock(lastBlock, data){
        let nonce = 0, hash, cDate, lastHash = lastBlock.hash
        let { difficulty } = lastBlock

        do {
            nonce++
            cDate = Date.now()
            difficulty = this.adjustDifficulty(lastBlock, cDate)
            hash = this.hash(cDate, lastHash, data, nonce, difficulty)

        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(cDate, lastHash, hash, data, nonce, difficulty)
    }

    static hash(creationDate, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${creationDate}${lastHash}${data}${nonce}${difficulty}`).toString()
    }

    static blockHash(block){
        return this.hash(block.creationDate, block.lastHash, block.data, block.nonce, block.difficulty)
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock
        difficulty = lastBlock.cDate + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1

        return difficulty
    }
}


module.exports = Block