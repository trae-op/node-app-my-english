
const mongoose = require('mongoose');
const merge    = require('mongoose-merge-plugin');
const config   = require('config');

mongoose.plugin(merge);
mongoose.set('debug', true);

// db local
const AppConnection = mongoose.createConnection(config.get('connection.db'));
// db prod
//const AppConnection = mongoose.createConnection(config.get('connection.db_production'));
AppConnection.on('error', err => console.log(['error'], '"myenglish" moungodb connect error: ' + err));
AppConnection.on('connected', () => console.log(config.get('messages.after_connected')));

exports.getConnectionApp = () => AppConnection;
