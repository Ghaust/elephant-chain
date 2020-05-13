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

    it('Inputing the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance)
    })

    it('Validating a transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true)
    })

    it('Invalidating a transaction', () => {
        transaction.outputs[0].amount = 10000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false)
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

    describe('Updating a transaction', () => {
        let next_amount, next_recipient

        beforeEach(() => {
            next_amount = 20
            next_recipient = 'n3xt-4ddr355'
            transaction = transaction.updateTransaction(wallet, next_recipient, next_amount)
        })

        it('Substracting the next amount from the sender\'s output', () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount - next_amount)
        })

        it('Outputing an amount for the next recipient', () => {
            expect(transaction.outputs.find(output => output.address === next_recipient).amount).toEqual(next_amount)
        })
    })
    
})
