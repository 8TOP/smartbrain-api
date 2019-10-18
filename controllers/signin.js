const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json('invalid input');
    }else{
        db.select('*').from('login').where('email', '=', email)
        .then(login => {
            if(bcrypt.compareSync(password, login[0].hash)){
                return db.select('*').from('users').where({
                    email: email
                }).then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json(err));
            }else{
                res.status(400).json("sorry, yo, that didn't work");
            }
        })
        .catch(err => res.status(400).json("sorry, that didn't work"));
    }
}

module.exports = {
    handleSignin: handleSignin
}