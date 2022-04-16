const models = require("../models");

module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: " Mikasa Ackerman"
        });
    }
}