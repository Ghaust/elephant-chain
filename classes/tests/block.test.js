const Block = require('../block')
const { difficulty } = require('../../config')

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
            expect(currentBlock.hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty))
            console.dir(currentBlock);
            
        })
    });
   