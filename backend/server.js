const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))

let serverState = {
    itemsFirst: [], itemsSecond: [], itemsThird:[]
}

app.get('/items', (req, res) => {
    if (req.query.which === "first") {
        res.send(JSON.stringify(serverState.itemsFirst));
    }
    if(req.query.which === "second") {
        res.send(JSON.stringify(serverState.itemsSecond));
    }
    if(req.query.which === "third") {
        res.send(JSON.stringify(serverState.itemsThird));
    }
})

app.post('/addItem', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    let which = parsedBody.which;
    let item = parsedBody.item;
    // The following could be rewritten in a shorter way using push.
    // I'm trying to ween everyone off of push
    if (which === 'first') {
        serverState.itemsFirst = serverState.itemsFirst.concat(item)
        res.send(JSON.stringify(serverState.itemsFirst));
    }
    if (which === 'second') {
        serverState.itemsSecond = serverState.itemsSecond.concat(item)
        res.send(JSON.stringify(serverState.itemsSecond));
    }
    if (which === 'third') {
        serverState.itemsThird = serverState.itemsThird.concat(item)
        res.send(JSON.stringify(serverState.itemsThird));
    }
})

app.post('/reverse', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    let which = parsedBody.which;
    if (which === 'first') {
        serverState.itemsFirst = serverState.itemsFirst.reverse()
        res.send(JSON.stringify(serverState.itemsFirst));
    }
    if (which === 'second') {
        serverState.itemsSecond = serverState.itemsSecond.reverse()
        res.send(JSON.stringify(serverState.itemsSecond));
    }
    if (which === 'third') {
        serverState.itemsThird = serverState.itemsThird.reverse()
        res.send(JSON.stringify(serverState.itemsThird));
    }
})

app.post('/clearAll', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    let which = parsedBody.which;
    if (which === 'first') {
        serverState.itemsFirst = []
        res.send(JSON.stringify(serverState.itemsFirst));
    }
    if (which === 'second') {
        serverState.itemsSecond = []
        res.send(JSON.stringify(serverState.itemsSecond));
    }
    if (which === 'third') {
        serverState.itemsThird = []
        res.send(JSON.stringify(serverState.itemsThird));
    }
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))
