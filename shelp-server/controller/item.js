const { items } = require('../models');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./token');
module.exports = {
    get: async (req, res) => {
        const userId = isAuthorized(req).userInfo.id;
        try {
            const itemInfo = await items.findAll({ where: { userId: userId } });
            res.status(200).json({ data: itemInfo, message: 'ok' });          
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });         
        }
    },

    post: async (req, res) => {
        const itemInfo = req.body;
        try {
            const result = await items.create(
                {
                    userId: itemInfo.userId,
                    name: itemInfo.name,
                    desc: itemInfo.desc,
                    quantity: itemInfo.quantity,
                    expiration: itemInfo.expiration,
                    storage: itemInfo.storage,
                });
            res.status(201).json({ message: 'ok' });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });         
        }
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
        try {
            const result = await items.update(itemInfo, { where: { id: itemId } });
            // result 0 or 1
            if (!result) {
                res.status(400).json({ message: 'Insufficient parameters supplied' });
            } else {
                res.status(200).json({ message: 'ok' });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });         
        }
    },

    getById: async (req, res) => {
        const itemId = req.params.id;
        try {
            const itemInfo = await items.findOne({ where: { id: itemId } });
            if (!itemInfo) {
                res.status(400).json({ message: 'Invalid id' });
            } else {
                res.status(200).json({ data: itemInfo, message: 'ok' });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });         
        }
    },

    delete: async (req, res) => {
        const itemId = req.params.id;
        try {
            const result = await items.destroy({ where : { id: itemId }});
            // result 0 or 1
            if(!result) {
                res.status(400).json({ message: 'Invalid id'});
            } else {
                res.status(200).json({ message: 'ok'});
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });         
        }
    }
};