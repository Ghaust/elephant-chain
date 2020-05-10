const Block = require('./block')

class Blockchain {
    constructor(){
        this.chain = [Block.genesisBlock()]
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], data)
        this.chain.push(block)
        
        return block
    }

    isValid(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock()))  return false

        for(let i=1; i<chain.length; i++){
            const currentBlock = chain[i]
            const lastBlock = chain[i-1]
            
            if(currentBlock.lastHash !== lastBlock.hash || currentBlock.hash !== Block.blockHash(currentBlock) )  
                return false
        }
        console.log("test passed");
        
        return true
    }

    replaceChain(nChain){
        if(nChain.length <= this.chain.length){
            console.log("Received chain is smaller than the current chain.")
            return
        } else if(!this.isValid(nChain)){
            console.log("Received chain is unvalid.")
            return
        } 

        console.log("Blockchain successfully replaced by the new chain")
        this.chain = nChain
    }

    overview(){
        console.table(this.chain);
    }

}

module.exports = Blockchain