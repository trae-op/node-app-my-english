
const datetime = require('node-datetime');
const Bcrypt = require('bcrypt');
const config = require('config');

module.exports = {
    currentTime: () => {
        return datetime.create().format('d.m.Y H:M');
    },
    checkPassword: (password, doc) => {
      return new Promise( (resolve, reject) => {
          Bcrypt.compare(password, doc.password).then( isValid => {
              if (!isValid) {
                  reject(Boom.badRequest(config.get('messages.password')));
              } else {
                  resolve(isValid);
              }
          });
      });
    },
    checkRole: (newData) => {
      return (newData.email === 'traeopwork@gmail.com') ? 'Admin' : 'User';
    }
};