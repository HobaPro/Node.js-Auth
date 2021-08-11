const authModel = require('../models/auth.model');

exports.getSignIn = (req, res, next) => {
    res.render('signin')
}

exports.postSignIn = (req, res, next) => {
    authModel.logIn(req.body.email, req.body.password).then(data => {
        res.redirect('/' + "60ebb7e33b7f7010f0a7763a")
    }).catch(err => {console.log(err); res.redirect('signin')})
}

exports.getSignUp = (req, res, next) => {
    res.render('signup')
}

exports.postSignUp = (req, res, next) => {
    authModel.createNewUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password).then(() => {res.redirect('signin')}).catch(() => {res.redirect('signup')})
}

exports.getProfile = (req, res, next) => {
    let id = req.params.id
    authModel.getUserData(id).then(data => {
        //console.log(data);
        res.render('home', {
            //name: data.firstName,
            isLogged: true
        })
    }).catch((err) => {console.log(err); res.redirect('signin')})
}