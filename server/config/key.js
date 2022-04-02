if(process.env.NODE_EVV === 'production') { //process.env.NODE_EVV -> 환경변수
    module.exports = require('./prod');
}else {
    module.exports = require('./dev'); 
}