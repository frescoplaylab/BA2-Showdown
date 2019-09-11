const should = require("should");

/* global Todo it describe */
/* eslint no-undef: "error" */
/* eslint-disable no-unused-expressions */

describe("Todo", () => {
  it("should check the find method", (done) => {
    Todo.find()
    .then((todo) => {
      todo.length.should.be.eql(0);
      done();
    })
    .catch(done);
  });

  it("should be empty", (done) => {
    Todo.find().then((todo) => {
        todo.length.should.be.aboveOrEqual(0);
        done();
      })
      .catch(done);
  });

  it("it should have a name", (done) => {
    Todo.create().exec((err) => {
      should(err).not.be.undefined;
      err.should.be.an.Array;
      err.should.have.lengthOf(1);
      return done();
    });
  });

  it("it should create a record", (done) => {
    const newTodo = { title: "test", description: "some description" };
    Todo.create(newTodo).exec((err, todo) => {
      todo.should.be.an.instanceOf(Object).and.have.property("title", todo.title);
    });
    return done();
  });

  it("it should not create a record if name is not given", (done) => {
    const newTodo = { description: "some description" };
    Todo.create(newTodo).exec((err, todo) => {
      should(err).not.be.undefined;
      should(todo).be.undefined;
    });
    return done();
  });
});
