const crypto = require('crypto');
var algorithm = 'aes-256-ctr';


var genRandomString = function (username) {
    var _username=username+"imnaz";
    var cipher = crypto.createCipher(algorithm, _username)
    var crypted = cipher.update(_username, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};


module.exports = {
    genRandomString: genRandomString
}