const Item = require('../../models/item');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date')

const transformItem = item => {
    return {
        ...item._doc,
        _id: item.id,
        user: user.bind(this, item._doc.user),
        createdAt: dateToString(item._doc.createdAt),
        updatedAt: dateToString(item._doc.updatedAt),
        creator: user.bind(this, item.creator)
    };
};

const items = async itemIds => {
    try {
        const items = await Item.find({ _id: { $in: itemIds } })
        return items.map(item => {
            return transformItem(item);
        });
    } catch (err) {
        throw err;
    };
};

const singleItem = async itemId => {
    try {
        const item = await Item.findById(itemId);
        return transformItem(item);
    } catch (err) {
        throw err;
    };
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
    };
};

exports.transformItem = transformItem;