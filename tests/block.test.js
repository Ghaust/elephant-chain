const Block = require('../classes/block')

    describe('Block Class', () => {
        let data, lastBock, currentBlock

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
    });
   