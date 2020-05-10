const Blockchain = require('./classes/blockchain')
      Block = require('./classes/block')

    bc = new Blockchain()

for(let i=0; i<10; i++){
    console.log(bc.addBlock(`foo ${i}`).toString());
    
}
