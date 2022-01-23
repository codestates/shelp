const { recipes } = require('../models')

module.exports = {
    get: async (req, res) => {
        const result = await recipes.findAll({ where: {} })
        res.status(200).json({ data: result, message: 'ok' });
    },

    getById: async (req, res) => {
        const id = req.params.id
        const result = await recipes.findAll({ where: { itemId: id } })
        res.status(200).json({ data: result, message: 'ok' });
    },
};