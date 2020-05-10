const Blockchain = require('../blockchain')
      Block = require('../block')

    describe('Blockchain Class', () => {
        let data, bc, sbc

        beforeEach(() => {
            bc = new Blockchain() 
            sbc = new Blockchain()    
        })

        it('Testing the block genesis', () => {
            expect(bc.chain[0]).toEqual(Block.genesisBlock())
        })

        it('Adding a new block to the chain', () => {
            data = 'Dummy'
            bc.addBlock(data)
            expect(bc.chain[bc.chain.length-1].data).toEqual(data);
        })

        it('Validating a valid chain', () => {
            sbc.addBlock('Dummy')
           
            expect(bc.isValid(sbc.chain)).toBe(true)
        })

        it('Invalidating a chain with a corrupt genesis block', () => {
            sbc.chain[0].data = "Wrong genesis"

            expect(bc.isValid(sbc.chain)).toBe(false)
        })

        it('Invalidating a corrupt chain', () => {
            sbc.addBlock('Dummy')
            sbc.chain[1].data = 'Nanotechtonic'

            expect(bc.isValid(sbc.chain)).toBe(false)

        })

        it('Replacing a chain', () => {
            sbc.addBlock('Space Cadet')
            bc.replaceChain(sbc.chain)

            expect(bc.chain).toEqual(sbc.chain)
        })

        it('Invalidating a replacement with smaller chain', () => {
            bc.addBlock('Spaceship')
            bc.replaceChain(sbc.chain)

            expect(bc.chain).not.toEqual(sbc.chain)
        });

    });
   