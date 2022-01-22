const { users, items, recipes, settings } = require('../models');
const { isAuthorized } = require('./token');

module.exports = {
    get: async (req, res) => {
        const accessToken = req.cookies.jwt

        if (!accessToken) {
            return res.status(404).send({ message: 'Not authorized' });
        }
        try {
            const verifyInfo = isAuthorized(req);
            // 회원 정보 변경 시 verifyInfo로 확인 할 수 없으므로 별도의 조회 과정 필요
            const userInfo = await users.findOne({
                where: {
                    email: verifyInfo.userInfo.email,
                },
            })
            res.status(200).json({ data: userInfo, message: 'Ok' });
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    put: async (req, res) => {
        const { name, password, image, desc } = req.body;
        const accessToken = req.cookies.jwt

        if (!name || !password || !image) {
            return res.status(400).json({ message: 'Insufficient parameters supplied' })
        }
        if (!accessToken) {
            return res.status(404).send({ message: 'Not authorized' });
        }
        try {
            const verifyInfo = isAuthorized(req);
            if (verifyInfo) {
                await users.update({
                    name: name,
                    password: password,
                    image: image,
                    desc, desc
                }, {
                    where: { email: verifyInfo.userInfo.email },
                })
                res.status(200).json({ message: 'Update succeed' })
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    delete: async (req, res) => {
        const accessToken = req.cookies.jwt;

        if (!accessToken) {
            return res.status(404).send({ message: 'Not authorized' });
        } else {
            try {
                const verifyInfo = isAuthorized(req);
                // recipes 테이블 삭제를 위해 items 테이블의 id 확인 필요
                const itemInfo = await items.findOne({
                    where: {
                        userId: verifyInfo.userInfo.id
                    }
                })
                if (verifyInfo) {
                    await users.destroy({
                        where: { email: verifyInfo.userInfo.email },
                    })
                    await items.destroy({
                        where: { userId: verifyInfo.userInfo.id },
                    })
                    await settings.destroy({
                        where: { userId: verifyInfo.userInfo.id },
                    })
                    await recipes.destroy({
                        attributes: ['itemId'],
                        where: { itemId: itemInfo.id },
                    })
                    // 테이블을 삭제해도 토큰이 존재하므로 쿠기 삭제 과정이 필요
                    res.clearCookie('jwt', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                    })
                    res.status(200).json({ mssage: 'Delete profile' });
                }
            } catch {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    },
};