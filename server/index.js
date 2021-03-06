const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { user, User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,git 
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
            return res.status(200).json({  //status(200) 성공했다는뜻
                success: true
            })
        })
    })

    app.post('/login', (req, res) => {

        //요청된 이메일을 데이터베이스에서 있는지 찾는다.
        User.findOne({ email: req.body.email }, (err, user) => {
            if(!user) {
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }
        

        //요청된 이메일을 데이터베이스에서 있다면 비밀번호가 맞는 비밀번호인지 확인.

        user.comparePassword(req.body.password  , (err, isMatch ) => {
            if(!isMatch)
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})


        //비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                 if(err) return res.status(400).send(err);

                //토근을 저장한다. 어디에? 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
        })
      })
   })
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))