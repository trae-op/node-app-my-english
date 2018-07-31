

'use strict';

const _ = require('lodash');
const config = require('config');
const Boom = require('boom');

const main = require('../lib/main');

class Translations {

  constructor(mongoose, connection) {
    this.Schema = mongoose.Schema;

    this.TranslationsSchema = new this.Schema({
      titleEn: String,
      titleRus: String,
      descriptionEn: String,
      descriptionRus: String,
      creator_email: String,
      created_at: String
    });

    this.model = connection.model('translation', this.TranslationsSchema);
  }



  list () {
    return new Promise( (resolve, reject) => {
      this.model.find({}, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.translations.errors.list')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  getById (id) {
    return new Promise( (resolve, reject) => {
      this.model.findById(id, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.translations.errors.get_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  deleteById (id) {
    return new Promise( (resolve, reject) => {
      this.model.findByIdAndRemove(id, (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.translations.errors.delete_by_id')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  add (body) {
    let newData = new this.model(body);
    return new Promise( (resolve, reject) => {
      newData.created_at = main.currentTime();
      newData.save( (err, doc) => {
        if (err) {
          reject(Boom.badRequest(config.get('messages.translations.errors.add')));
        } else {
          resolve(doc);
        }
      });
    });
  }
  update (body) {
    let id = body._id;
    return new Promise( (resolve, reject) => {
      this.getById(id)
        .then( docFind => {

          docFind.titleEn = body.titleEn;
          docFind.titleRus = body.titleRus;
          docFind.descriptionEn = body.descriptionEn;
          docFind.descriptionRus = body.descriptionRus;
          docFind.creator_email = body.creator_email;
          docFind.created_at = main.currentTime();

          docFind.save( (err, docUpdate) => {
            if (err) {
              reject(Boom.badRequest(config.get('messages.translations.errors.update')));
            } else {
              resolve(docUpdate);
            }
          });

        })
        .catch( (error) => {
          reject(error);
        });
    });
  }

}

module.exports = Translations;
