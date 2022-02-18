const User = require('../models/user');

module.exports = basicAuth;

function basicAuth(req, res, next) {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    authenticate({ username, password }).then(function(user){
        //remove user password to add user to request
        user.removeUserPassword();
        req.user = user;
        next();
    }).catch(function(){
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    });    
}

function authenticate({ username, password }) {  
    return new Promise(function(resolve, reject){
        User.findOne({'username': username}).then(function (user){  
            if (user && user.verifyPassword(password)) resolve(user);    
            else reject();        
        });          
    });
}