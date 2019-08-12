const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
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
        };
    },
    login: async ({ userName, password }) => {
        const user = await User.findOne({ userName: userName });
        if (!user) {
            throw new Error('Bad Username');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Bad Password');
        }
        const token = jwt.sign({ userId: user.id, userName: user.userName }, '1127197812041978', {
            expiresIn: '1h'
        });
        return { userId: user.id, token: token, tokenExpiration: 1 }
    }
};