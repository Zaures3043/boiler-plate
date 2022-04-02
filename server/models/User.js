const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,   //spacebar 없애주는 역할
        unique: 1     //똑같은 이메일 쓰지 못하게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {           //관리자가 일반 유저를 관리할 수 있게
        type: Number,
        default: 0
    },
    image: String,
    token: {          // 유효성 관리할 수 있게
        type: String
    },
    tokenExp: {
        type: Number
    }

})


userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {

        //plainPassword chlwodn3043@@ 암호화된 비밀번호 $2b$10$eOQrYZ/grZe8sogprfrWt.AFFHVkb8f/AzSheoxwblvQf92p14/hW 
        bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
            if(err) return cb(err),
            cb(null, isMatch)
        })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    // jsonwebtoken을 이용해서 

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}



const User = mongoose.model('User', userSchema)

module.exports = { User } //이 User를 다른 곳에서도 쓸 수 있게

// moudel은 schema를 감싸는 역할
// schema는 예를 들어 상품에 관련된 글을 작성하면 글을 작성한 사람이 누구인지 설정하고,
// 작성할때 포스트의 이름, 타입, 길이제한 등등을 설정할 수 있게하는 역할이다.