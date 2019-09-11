const Sails = require("sails");
global.chai = require("chai");

global.should = global.chai.should();
// require("should");

/* global before after */
/* eslint no-undef: "error" */

before((done) => {
  Sails.lift({
    log: {
      level: "error",
    },
    models: {
      connection: "test",
      migrate: "drop",
    },
  }, (err) => {
    if (err) { return done(err); }
      return done();
  });
});

// Global after hook
after((done) => {
  Sails.lower(done);
  // return done();
});
