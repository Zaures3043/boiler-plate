if(process.env.NODE_EVV === 'production') {
    module.exports = require('./prod');
}else {
    module.exports = require('./dev'); 
}