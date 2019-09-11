module.exports = {
  attributes: {
    id: {
      type: "integer",
      autoIncrement: true,
    },
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    isCompleted: {
      type: "boolean",
      default: false,
    },

  },
};
