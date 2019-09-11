module.exports.routes = {

  "GET     /": { view: "homepage" },

  "POST    /api/todo": "TodoController.create",
  "GET     /api/todo": "TodoController.fetch",
  "PUT     /api/todo/:id": "TodoController.update",
  "GET     /api/todo/:id": "TodoController.findOne",
  "DELETE  /api/todo/:id": "TodoController.delete",

};
