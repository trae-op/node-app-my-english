
'use strict';

const users = require('../handlers/users');

module.exports = [
    {
        path: '/api/users',
        method: 'GET',
        config: {
            auth: false
        },
        handler: users.getUsers
    },
    {
        path: '/api/users/{user_id}',
        method: 'GET',
        config: {
            auth: false
        },
        handler: users.getUserById
    },
    {
        path: '/api/users',
        method: 'POST',
        config: {
          auth: false
        },
        handler: users.addUser
    },
    {
        path: '/api/users/{user_id}',
        method: 'DELETE',
        config: {
          auth: 'jwt'
        },
        handler: users.deleteUserById
    },
    {
        path: '/api/users/login',
        method: 'POST',
        config: {
            auth: false
        },
        handler: users.login
    }
];
9