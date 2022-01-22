const { settings } = require('../models');
const { isAuthorized } = require('./token');

module.exports = {
    put: async (req, res) => {
        const accessToken = req.cookies.jwt;

        if (!accessToken) {
            return res.status(404).send({ message: 'Not authorized' });
        }
        try {
            const { period } = req.body
            const verifyInfo = isAuthorized(req);
            const settingInfo = await settings.findOne({
                attributes: ['userId'],
                where: { userId: verifyInfo.userInfo.id }
            })
            if (settingInfo) {
                await settings.update({
                    period: period
                }, {
                    where: { userId: verifyInfo.userInfo.id }
                })
                res.status(200).json({ message: 'Update period' })

            }
        } catch (err) {
            res.status(404).send({ message: 'Not found' });
        }
    },
};