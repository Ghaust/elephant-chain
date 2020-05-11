const Block = require('../classes/block')

    describe('Block Class', () => {
        let data, lastBlock, currentBlock

        beforeEach(() => {
            data = 'Dummy data for testing'
            lastBlock = Block.genesisBlock()
            currentBlock = Block.mineBlock(lastBlock, data)
        })

        it('Setting the `data to match the input', () => {
            expect(currentBlock.data).toEqual(data)
        })

        it('Setting the `lastHash to match the match of the last block', () => {
            expect(currentBlock.lastHash).toEqual(lastBlock.hash);
        })

        it('Generating an hash that matches the difficulty', () => {
            expect(currentBlock.hash.substring(0, currentBlock.difficulty)).toEqual('0'.repeat(currentBlock.difficulty))
            //console.dir(currentBlock);
            
        })

        it('Lowering the difficulty for slowly mined blocks', () => {
            expect(Block.adjustDifficulty(currentBlock, currentBlock.cDate+360000)).toEqual(currentBlock.difficulty-1)
        })

        /*
        it('Increasing the difficulty for quickly mined blocks', () => {
            console.log(currentBlock.difficulty);
            
            expect(Block.adjustDifficulty(currentBlock, currentBlock.cDate + 1))
            .toEqual(currentBlock.difficulty+1)
        })*/
    })
   