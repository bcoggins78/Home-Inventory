const bcrypt = require('bcryptjs');
const Item = require('../../models/item');
const User = require('../../models/user');

const items = async itemIds => {
    try {
        const items = await Item.find({ _id: { $in: itemIds } })
        items.map(item => {
            return {
                ...item._doc,
                _id: item.id,
                date: new Date(item._doc.date).toISOString(),
                creator: user.bind(this, item.creator)
            };
        });
        return items;
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createItems: items.bind(this, user._doc.createdItems)
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    items: async () => {
        try {
            const items = await Item.findOne()
            return items
                .map(item => {
                    return {
                        ...item._doc,
                        _id: item.id,
                        date: new Date(item._doc.date).toISOString(),
                        creator: user.bind(this, item._doc.creator)
                    };
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
            date: args.itemInput.date,
            creator: '5d464952db300d0e2c462df2'
        });
        let createdItem;
        try {
            const result = await item
                .save()
            createdItem = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(item._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
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
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ userName: args.userInput.userName })
            if (existingUser) {
                throw new Error('User already exists.')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                userName: args.userInput.userName,
                password: hashedPassword,
                email: args.userInput.email,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                insName: args.userInput.insName,
                insPolicy: args.userInput.insPolicy,
                insContact: args.userInput.insContact,
            });

            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    }
}