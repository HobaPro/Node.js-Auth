const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DB_URL = "mongodb://localhost:27017/DataPro";

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
})

const User = mongoose.model('user', userSchema);

exports.createNewUser = (firstName, lastName, email, password) => {

    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return User.findOne({email: email})
            })
            .then(user => {
                if(user) {
                    mongoose.disconnect();
                    reject()
                }else{
                    return bcrypt.hash(password, 10);
                }
            }).then(hashedPassword => {
                let user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword
                })
                return user.save();
            }).then(() => {
                mongoose.disconnect()
                resolve();
            }).catch(err => {
                console.log(err)
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.logIn = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL).then(() => {
                return User.findOne({email: email})
            })
            .then(user => {
                if(!user){
                    mongoose.disconnect();
                    reject("Invalid Email")
                }else{
                    return bcrypt.compare(password, user.password).then(samePassword => {
                        if(!samePassword){
                            mongoose.disconnect();
                            reject("Password Incorrect")
                        }else{
                            mongoose.disconnect();
                            resolve("Email and Password Correct")
                        }
                    })
                }
            }).catch(err => {console.log(err)})
    })
}

exports.getUserData = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            User.findById(id);
        }).then(data => {
            console.log(data);
            mongoose.disconnect();
            resolve()
        }).catch(() => {
            mongoose.disconnect();
            reject()
        })
    })
}
