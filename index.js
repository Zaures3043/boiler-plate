const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser");

const config = require('./config/key');

const { user, User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
)  .then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


    app.get('/', (req, res) => res.send('Hello World~~ 안녕하세요~~!'))

    app.post('/register', (req, res) => {

        //회원 가일 할 때 필요한 정보들을 client에서 가져오면 
        //그것들을 데이터 베이스에 넣어준다.
     

        const user = new User(req.body)
        //req.body안에 json형식으로 아이디면 id:'hello' 패스워드면 password:'123'
        //이런식으로 정보가 들어있음, bodyParser를 이용해서 req.body로 client에서
        //보내는 정보를 받는다.  
        user.save((err, userInfo) => {
            if(err) return res.json({ success: false, err})
            return res.status(200).json({
                success: true
            })
        })
    })





app.listen(port, () => console.log(`Example app listening on port ${port}!`))