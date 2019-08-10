const Item = require('../../models/item');
const User = require('../../models/user');
const { transformItem } = require('./logic');

module.exports = {
    items: async () => {
        try {
            const items = await Item.find()
            return items
                .map(item => {
                    return transformItem(item);
                })
        } catch (err) {
            throw err;
        };
    },
    createItem: async args => {
        const item = new Item({
            name: args.itemInput.name,
            serial: args.itemInput.serial,
            model: args.itemInput.model,
            description: args.itemInput.description,
            estValue: args.itemInput.estValue,
            image: args.itemInput.image,
            comment: args.itemInput.comment,
            creator: '5d464952db300d0e2c462df2'
        });
        let createdItem;
        try {
            const result = await item
                .save()
            createdItem = transformItem(result);
            const creator = await User.findById('5d464952db300d0e2c462df2')

            if (!creator) {
                throw new Error('User not found.')
            }
            creator.createdItems.push(item);
            await creator.save();

            return createdItem;
        } catch (err) {
            console.log(err);
            throw err;
        };
    },
    deleteItem: async args => {
        try {
            const removeItem = await Item.findById(args.itemId);
            const item = transformItem(removeItem);
            await Item.deleteOne({ _id: args.itemId });
            return item;
        } catch (err) {
            throw err;
        };
    }  
};