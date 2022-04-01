const mongoose = require('mongoose');

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
        type: String
    }

})


const User = mongoose.model('User', userSchema)

module.exports = { User } //이 User를 다른 곳에서도 쓸 수 있게

// moudel은 schema를 감싸는 역할
// schema는 예를 들어 상품에 관련된 글을 작성하면 글을 작성한 사람이 누구인지 설정하고,
// 작성할때 포스트의 이름, 타입, 길이제한 등등을 설정할 수 있게하는 역할이다.