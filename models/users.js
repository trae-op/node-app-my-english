

'use strict';

const _ = require('lodash');
const config = require('config');
const Bcrypt = require('bcrypt');
const Boom = require('boom');

const main = require('../lib/main');

class Users {

    constructor(mongoose, connection) {
      this.Schema = mongoose.Schema;
      this.UsersSchema = new this.Schema({
        name: String,
        email: String,
        password: String,
        confirm_password: String,
        created_at: String,
        role: String
      });

      this.model = connection.model('user', this.UsersSchema);
  }

  list() {
    return new Promise((resolve, reject) => {
      this.model.find({}, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.users.errors.list')));
        } else {
          resolve(doc);
        }
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.model.findById(id, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.users.errors.get_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }

  deleteById(id) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndRemove(id, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.users.errors.delete_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.model.find({email: email}, (err, doc) => {

        if (err) {
          reject(Boom.badRequest(config.get('messages.users.errors.find_by_id')));
        } else {
          if (doc.length) {
            resolve(doc[0]);
          } else {
            reject(Boom.badRequest(config.get('messages.users.errors.not_exit_email')));
          }
        }
      });
    });
  }

  add(body) {
    let newData = new this.model(body);


    return new Promise((resolve, reject) => {

      this.findByEmail(newData.email)
        .then(() => {
          reject(Boom.badRequest("This email \"" + newData.email + "\" is already existing!"));
        })
        .catch(() => {
          newData.role = main.checkRole(newData);
          newData.created_at = main.currentTime();

          if (!main.fieldsValidRegister(newData)) {
            reject(Boom.badRequest(config.get('messages.fields_valid_register')));
            return;
          }

          Bcrypt.genSalt(10,(err, salt) => {
            if (err) {
              reject(Boom.badRequest(config.get('messages.users.errors.generating_of_password')));
            }

            Bcrypt.hash(body.password, salt, (err, hash) => {
              newData.password = hash;
              newData.save((err, doc) => {
                if (err) {
                  reject(Boom.badRequest(config.get('messages.users.errors.add')));
                } else {
                  resolve(doc);
                }
              });
            });
          });
        });


    });
  }


}

module.exports = Users;
