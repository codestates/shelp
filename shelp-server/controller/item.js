const { items } = require('../models');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./token');
module.exports = {
    get: async (req, res) => {
        const userId = isAuthorized(req).userInfo.id;
        const itemInfo = await items.findAll({ where: { userId: userId } });
        res.status(200).json({ data: itemInfo, message: 'ok' });
    },

    post: async (req, res) => {
        const itemInfo = req.body;
        const result = await items.create(
            {
                userId: itemInfo.userId,
                name: itemInfo.name,
                desc: itemInfo.desc,
                quantity: itemInfo.quantity,
                expiration: itemInfo.expiration,
                storage: itemInfo.storage,
            });
        console.log(result)
        res.status(201).json({ message: 'ok' });
    },

    put: async (req, res) => {
        const itemId = req.body.itemId;
        const itemInfo = {
            userId: req.body.userId,
            name: req.body.name,
            quantity: req.body.quantity,
            desc: req.body.desc,
            expiration: req.body.expiration,
            storage: req.body.storage,
        }
        const result = await items.update(itemInfo, { where: { id: itemId } });
        // result 0 or 1
        if (!result) {
            res.status(400).json({ message: 'invalid id' });
        } else {
            res.status(200).json({ data: result, message: 'ok' });
        }
    },

    getById: async (req, res) => {
        const itemId = req.params.id;
        const itemInfo = await items.findOne({ where: { id: itemId } });
        if (!itemInfo) {
            res.status(400).json({ message: 'invalid id' });
        } else {
            res.status(200).json({ data: itemInfo, message: 'ok' });
        }
    },

    delete: async (req, res) => {
        const itemId = req.params.id;
        const result = await items.destroy({ where: { id: itemId } });
        // result가 0 과 1로 나옴
        if (!result) {
            res.status(400).json({ message: 'invalid id' });
        } else {
            res.status(200).json({ data: result, message: 'ok' });
        }
    }
};