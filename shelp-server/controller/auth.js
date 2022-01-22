const { users, settings } = require('../models');
const { generateAccessToken, sendAccessToken } = require('./token');

module.exports = {
    signin: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Insufficient parameters supplied' })
        } else {
            try {
                const userInfo = await users.findOne({
                    where: {
                        email,
                        password
                    },
                });
                // 로그인 실패
                if (!userInfo) {
                    return res.status(404).json({ message: "Wrong information" });
                }
                // 로그인이 성공하면 토큰이 생성되고 쿠기로 전송된다.
                const accessToken = generateAccessToken({ dataValues: { userInfo } });
                sendAccessToken(res, accessToken, 200, { data: userInfo, message: 'Signin succeed' });
            } catch (err) {
                return res.status(404).json({ message: "Not found" });
            }
        }
    },

    signout: (req, res) => {
        const accessToken = req.cookies.jwt

        try {
            if (!accessToken) {
                return res.status(404).send({ message: 'Not authorized' });
            } else {
                // 쿠키 삭제를 통해 로그아웃을 구현한다.
                res.clearCookie('jwt', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                })
                return res.status(200).send({ message: 'Signout succeed' });
            }
        } catch (err) {
            res.status(404).send({ message: 'Not found' });
        }
    },

    signup: (req, res) => {
        const { username, email, password, image, desc } = req.body

        if (!username || !email || !password || !image) {
            return res.status(422).json({ message: 'Insufficient parameters supplied' })
        }
        users.findOrCreate({
            where: {
                username, username,
                email: email,
                password: password,
                image: image,
                desc: desc
            },
        })
            .then(([userInfo, created]) => {
                if (created) {
                    // 회원가입에 성공하면 settings 테이블의 데이터도 생생한다.
                    settings.create({
                        userId: userInfo.id,
                        period: 1,
                    })
                    // 회원가입에 성공하면 토큰이 발행되므로 별로의 로그인 과정이 생략된다.
                    const accessToken = generateAccessToken({ dataValues: { userInfo } });
                    sendAccessToken(res, accessToken, 201, { data: userInfo, message: 'Create succeed' });
                }
                else {
                    return res.status(409).send('User exists');
                }
            })
            .catch((err) => {
                return res.status(404).json({ message: "Not found" });
            });
    },

    // 회원가입 시 동일한 email을 사용할 수 없도록 확인할 수 있다.
    check: async (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(404).json({ message: 'Insufficient parameters supplied' })
        }
        try {
            const userInfo = await users.findOne({
                where: {
                    email,
                },
            })
            // 사용할 수 있는 email
            if (!userInfo) {
                return res.status(200).json({ available: true });
            }
            // 사용할 수 없는 email
            res.status(200).json({ available: false });
        } catch {
            res.status(404).json({ message: "Not found" });
        }
    }
};