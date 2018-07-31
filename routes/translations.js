
'use strict';

const translations = require('../handlers/translations');

module.exports = [
    {
        path: '/api/translations',
        method: 'GET',
        config: {
            auth: false
        },
        handler: translations.getTranslations
    },
    {
        path: '/api/translations/{translation_id}',
        method: 'GET',
      config: {
        auth: false
      },
      handler: translations.getTranslationById

    },
    {
        path: '/api/translations',
        method: 'POST',
        config: {
          auth: 'jwt'
        },
      handler: translations.addTranslation
    },
    {
        path: '/api/translations/{translation_id}',
        method: 'DELETE',
      config: {
        auth: 'jwt'
      },
      handler: translations.deleteTranslationById
    },
    {
        path: '/api/translations',
        method: 'PUT',
      config: {
        auth: 'jwt'
      },
      handler: translations.updateTranslation
    }
];
