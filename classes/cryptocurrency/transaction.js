const ChainUtil = require('./chain-util')

class Transaction {
    constructor(){
        this.id = ChainUtil.genID()
        this.input = null
        this.outputs = []
    }

    static newTransaction(senderWallet, recipient, amount){
        const transaction = new this()

        if (amount > senderWallet.balance){
            console.error(`Amount: ${amount} exceeds balance.`)
            return;  
        }

        transaction.outputs.push(...[
            {amount: senderWallet.balance - amount, address: senderWallet.publicKey},
            {amount, address: recipient}
        ])

        this.signTransaction(transaction, senderWallet)
        
        return transaction
    }

    static signTransaction(transaction, senderWallet){
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }
}

module.exports = Transaction