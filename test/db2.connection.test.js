/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';
require('./init.js');
var assert = require('assert');
var DataSource = require('loopback-datasource-juggler').DataSource;

var config;

before(function() {
  config = global.config;
});

describe('testConnection', function() {
  it('should pass with valid settings', function(done) {
    var db = new DataSource(require('../'), config);
    db.ping(function(err) {
      assert(!err, 'Should connect without err.');
      done(err);
    });
  });

  it('should pass when valid DSN overrides invalid settings', function(done) {
    var dsn = generateDSN(config);
    var dbConfig = {
      dsn: dsn,
      host: 'invalid-hostname',
      port: 80,
      database: 'invalid-database',
      username: 'invalid-username',
      password: 'invalid-password',
    };

    var db = new DataSource(require('../'), dbConfig);
    db.ping(function(err) {
      assert(!err, 'Should connect without err.');
      done(err);
    });
  });
});

function generateDSN(config) {
  var dsn =
    'DRIVER={DB2}' +
    ';DATABASE=' + config.database +
    ';HOSTNAME=' + config.hostname +
    ';UID=' + config.username +
    ';PWD=' + config.password +
    ';PORT=' + config.port +
    ';PROTOCOL=TCPIP' +
    ';CurrentSchema=' + config.schema;
  return dsn;
}