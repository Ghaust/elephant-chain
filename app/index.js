const express = require('express')
    Blockchain = require('../classes/blockchain')
    bodyParser = require('body-parser')
    app = express()
    bc = new Blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/getAllBlocks', (req, res) => {
    res.send(bc.chain)
})

app.post('/mine', (req, res) => {
    if(!req.body.data) res.status(201).send("No data")
    else{
        nBlock = bc.addBlock(req.body.data)
        console.dir(nBlock)
        res.redirect('/getAllBlocks')
    }
})



    
const PORT = process.env.PORT || 3031;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
    console.log('Shortcut : http://localhost:' + PORT);
});

