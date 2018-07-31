
'use strict';

const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
//const renderJSON = require('../lib/renderJson');
const main = require('../lib/main');
const Users = require('../models/users');
const mongoConnection = require('../lib/mongoConnections');
const users = new Users(mongoose, mongoConnection.getConnectionApp());

const privateKey = config.get('jwt_private_key');

module.exports = {
    getUsers: () => {
        return users.list()
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    },
    getUserById: (request, h) => {
      let id = request.params.user_id;
        return users.getById(id)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    },
    addUser: (request, h) => {
      let body = request.payload;
        return users.add(body)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    },
    deleteUserById: (request, h) => {
        let id = request.params.user_id;
        return users.deleteById(id)
            .then( (doc) => {
              return { message: config.get("messages.deleted") };
            })
            .catch( (error) => {
                return error;
            });
    },
    login: (request, h) => {
        let credentials = request.payload;
        let email = credentials.email;
        let password = credentials.password;

        // if there isn't 'password' property when probably it's facebook or google
        if (!password) {
            let user = credentials;
            let token = jwt.sign(user, privateKey, {
                expiresIn: '1d'
            });
            return {user, token};

        } else {

            return users.findByEmail(email)
                .then( (doc) => {
                    return main.checkPassword(password, doc)
                        .then( () => {

                            let user = doc;
                            let token = jwt.sign(user._doc, privateKey, {
                                expiresIn: '1d'
                            });
                            return {user, token};
                        })
                        .catch( (error) => {
                            return error;
                        });
                })
                .catch( (error) => {
                    return error;
                });
        }

    },
    validateJwtToken: (decoded, request) => {
        let user = decoded;
        if (!user.password) {
            // if there isn't 'password' property when probably it's facebook or google
          return { isValid: true };
        } else {
            return users.getById(user._id)
                .then( (user) => {
                  return { isValid: true };
                })
                .catch( (error) => {
                    return {message: config.get('messages.users.errors.get_by_id')};
                });
        }
    }
};