const { recipes } = require('../models')

module.exports = {
    get: async (req, res) => {
        try {
            const result = await recipes.findAll({ where: {} })
            res.status(200).json({ data: result, message: 'ok' });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });         
        }
    },
    getById: async (req, res) => {
        const id = req.params.id
        try {
            const result = await recipes.findAll({ where: { itemId: id } })
            res.status(200).json({ data: result, message: 'ok' });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });         
        }
    }
};