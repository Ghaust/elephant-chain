const Transaction = require('../classes/cryptocurrency/transaction')
    Wallet = require('../classes/cryptocurrency/wallet')


describe('Transaction', () => {
    let transaction, wallet, recipient, amount

    beforeEach(() => {
        wallet = new Wallet()
        amount = 50
        recipient = 'r3c1p13nt'
        transaction = Transaction.newTransaction(wallet, recipient, amount)
    })

    it('Outputing the `amount` substracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount)
    })

    it('Outputing the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
        .toEqual(amount)
    })

    describe('Transacting with an amount that exceeds the balance', () => {
        beforeEach(() => {
            amount = 5000
            transaction = Transaction.newTransaction(wallet, recipient, amount)

        })

        it('Does not create the transaction', () => {
            expect(transaction).toEqual(undefined)
        })

    })
    
})
