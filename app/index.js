const express = require('express')
    Blockchain = require('../classes/blockchain')
    bodyParser = require('body-parser')
    P2PServer = require('../classes/p2p-server')
    app = express()
    bc = new Blockchain()
    p2pserv = new P2PServer(bc)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/getAllBlocks', (req, res) => {
    console.log(bc.chain);
    
    res.send(bc.chain)
})

app.post('/mine', (req, res) => {
    if(!req.body.data) res.status(201).send("No data")
    else{
        nBlock = bc.addBlock(req.body.data)
        console.dir(nBlock)

        p2pserv.syncChains()
        res.redirect('/getAllBlocks')
    }
})



    
const PORT = process.env.PORT || 3031;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
    console.log('Shortcut : http://localhost:' + PORT);
});

p2pserv.listen()
