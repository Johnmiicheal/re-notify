module.exports = {
    // Resolves the list of notes for a user
    notes: async ( user, args, { models }) => {
        return await models.Note.find({ author: user._id }).sort({_id: -1});
    },
    // Resolves the list of favorite notes for a user
    favorites: async (user, args, { models }) => {
        return await models.Note.find({ favoritedBy: user._id }).sort({_id: -1});
    }
};