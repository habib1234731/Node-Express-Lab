// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/', function(req, res) {
    res.json({api: 'Running...'});
})

server.get('/api/posts', (req,res) => {
    //get the data
    db
    .find()
    .then(posts => {
        //send it to the browser
        res.json(posts);
        //or res.send(posts) to send it to the browser
    })
    .catch(error => {
        //handle it
        res.status(500).json(error);
    });
    //send the data
    //semd the error if any
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    //get the data
    db
    .findById(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(404).json(error);
    })
})

server.post('/api/posts', (req, res) => {
    const post = {
        title: 'title',
        contents: 'wubba lubba dub dub'
    };
    db
    .insert(post)
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(400).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log('Api running on port 5000'));
