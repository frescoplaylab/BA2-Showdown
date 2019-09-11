/**
 * CarsController
 * @description :: Server-side logic for managing Carscontrollers
 */

/* eslint-disable consistent-return */
/* global Todo _ sails */
/* eslint no-undef: "error" */
/* eslint-disable radix */

module.exports = {

  fetch(req, res, next) {
    Todo.find()
    .exec((err, todo) => {
      /* istanbul ignore next */
      if (err) return next(err);
      return res.json(todo);
    });
  },

  create(req, res) {
    let params = {};
    params = _.merge({}, req.params.all(), req.body);
    Todo.create(params)
    .exec((err, todo) => {
      if (err) return res.badRequest(err);
      sails.log(`Todo with id ${todo.id} created`);
      return res.json(todo);
    });
  },

  findOne(req, res, next) {
    const id = parseInt(req.param("id"));
    if (!id) {
      return res.badRequest("Required param: id not provided.");
    }
    Todo.findOne({
      id,
    })
    .exec((err, todo) => {
      if (todo === undefined) {
        return res.notFound({
          error: "Todo not found.",
        });
      }
      /* istanbul ignore next */
      if (err) return next(err);
      return res.json(todo);
    });
  },

  update(req, res, next) {
    const id = parseInt(req.param("id"));
    if (!id) {
      return res.badRequest("Required param: id not provided.");
    }
    let params = {};
    params = _.merge({}, req.params.all(), req.body);
    Todo.update(id, params, (err, todo) => {
      if (todo.length === 0) {
        return res.notFound({
          error: "Record not found.",
        });
      }
      /* istanbul ignore next */
      if (err) return next(err);
      res.json(todo);
    });
  },

  delete(req, res, next) {
    const id = parseInt(req.param("id"));
    if (!id) {
      return res.badRequest({
        error: "ID should be an integer and is required",
      });
    }
    Todo.findOne({
      id,
    }).exec((err, result) => {
      /* istanbul ignore next */
      if (err) return res.serverError(err);
      if (!result) {
        return res.notFound({
          error: "Record not found.",
        });
      }
      Todo.destroy(id, (derr) => {
        /* istanbul ignore next */
        if (derr) return next(derr);
        return res.ok();
      });
    });
  },
};
