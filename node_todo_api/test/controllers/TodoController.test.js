const supertest = require("supertest");
const assert = require("assert");

/* global sails it describe */
/* eslint no-undef: "error" */

let createdtodo;
require("../bootstrap.test");

describe("Todo Controller", () => {
  it("get /api/todo", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .get("/api/todo")
      .send()
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          result.body.length.should.be.aboveOrEqual(0);
          done();
        }
      });
  });

  it("get /api/todo/:id not found", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = `/api/todo/${1234}`;
    agent
      .get(todoUrl)
      .send()
      .expect(404, done);
  });

  it("get /api/todo/:id bad request", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = "/api/todo/test";
    agent
      .get(todoUrl)
      .send()
      .expect(400, done);
  });

  it("post /api/todo", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todo = {
      title: "Volkswagen Tiguan",
      description: "This is a dummy text",
      isCompleted: false,
    };
    agent
    .post("/api/todo")
    .send(todo)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        createdtodo = res.body;
        assert.equal(createdtodo.title, "Volkswagen Tiguan");
        done();
      }
    });
  });

  it("post /api/todo error", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);

    const todo = {
      description: "This is a dummy text",
      isCompleted: false,
    };
    agent
      .post("/api/todo")
      .send(todo)
      .expect(400, done);
  });

  it("get /api/todo/:id after todo creation", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = `/api/todo/${createdtodo.id}`;
    agent
      .get(todoUrl)
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          assert.equal(createdtodo.title, "Volkswagen Tiguan");
          done(err, res);
        }
      });
  });

  it("put /api/todo/:id", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = `/api/todo/${createdtodo.id}`;
    agent
      .put(todoUrl)
      .send({
        title: "Tata Nexon New",
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.body[0].title, "Tata Nexon New");
          done();
        }
      });
  });

  it("put /api/todo/:id bad request", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = "/api/todo/test";
    agent
      .put(todoUrl)
      .send({
        name: "Tata Nexon New",
      })
      .expect(400, done);
  });

  it("put /api/todo/:id not found", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = `/api/todo/${12345}`;
    agent
      .put(todoUrl)
      .send({
        name: "Tata Nexon New",
      })
      .expect(404, done);
  });

  it("delete /api/todo/:id", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = `/api/todo/${createdtodo.id}`;
    agent
      .delete(todoUrl)
      .send()
      .expect(200, done);
  });

  it("delete /api/todo/:id bad request", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = "/api/todo/test";
    agent
      .delete(todoUrl)
      .send()
      .expect(400, done);
  });

  it("delete /api/todo/:id not found", (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    const todoUrl = `/api/todo/${12345}`;
    agent
      .delete(todoUrl)
      .send()
      .expect(404, done);
  });
});
