const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '15f3b335523945258421ac9a26b3a6d3'
});

const handleAPICall = (req, res) =>{
    app.models
    .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to parse image model'));
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('userid', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('some kind of error...'));
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}