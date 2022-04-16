module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: " Mikasa Ackerman"
        });
    },
    deleteNote: async (parent, { id }, { models }) => {
        try{
            await models.Note.findOneAndRemove({ _id: id});
            return true;
        } catch (err){
            return false;
        }
    }
    
}