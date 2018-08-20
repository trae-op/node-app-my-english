
'use strict';

const mongoose = require('mongoose');
const config = require('config');
const Translations = require('../models/translations');
const mongoConnection = require('../lib/mongoConnections');
const translations = new Translations(mongoose, mongoConnection.getConnectionApp());


module.exports = {
    getTranslations: (request, h) => {
        return translations.list()
            .then( (doc) => {
              return doc;
            })
            .catch( (error) => {
              return error;
            });
    },
    getTranslationById: (request, h) => {
        let id = request.params.company_id;
        return translations.getById(id)
            .then( (doc) => {
              return doc;
            })
            .catch( (error) => {
              return error;
            });
    },
    addTranslation: (request, h) => {
        let body = request.payload;
        return translations.add(body)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    },
    updateTranslation: (request, h) => {
        let body = request.payload;
        return translations.update(body)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    },
    deleteTranslationById: (request, h) => {
        let id = request.params.translation_id;
        return translations.deleteById(id)
            .then( (doc) => {
                return doc;
            })
            .catch( (error) => {
                return error;
            });
    }
};