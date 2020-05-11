const EC = require('elliptic').ec
    crypto = require('crypto-js');
    uuidv1 = require('uuid/v1')
    ec = new EC('secp256k1') //system used by Bitcoin

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair()
    }

    static genID(){
        return uuidv1()
    }
    static hash(data){
        return crypto.SHA256(JSON.stringify(data)).toString()
    }
}

module.exports = ChainUtil