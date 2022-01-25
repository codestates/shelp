const { users } = require('../models');
const { generateAccessToken, sendAccessToken } = require('./token');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const appDir = path.dirname(require.main.filename);

module.exports = {
    signin: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Insufficient parameters supplied' })
        } else {
            try {
                const userInfo = await users.findOne({
                    where: {
                        email: email,
                    },
                });
                // 로그인 실패
                if (!userInfo) {
                    return res.status(404).json({ message: "Wrong information" });
                }
                else {
                    let passwordCheck = await bcrypt.compare(password, userInfo.password);
                    if (passwordCheck) {
                        const accessToken = generateAccessToken({ dataValues: { userInfo } });
                        sendAccessToken(res, accessToken, 200, { data: userInfo, message: 'Signin succeed' });
                    } else {
                        return res.json({ messgae: 'wrong password' })
                    }
                }
                // 로그인이 성공하면 토큰이 생성되고 쿠기로 전송된다.
            } catch (err) {
                res.status(500).json({ message: "Internal server error" });
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
            res.status(500).json({ message: "Internal server error" });
        }
    },

    signup: (req, res) => {
        const { name, email, password, image, desc } = req.body

        if (!name || !email || !password || !image) {
            return res.status(422).json({ message: 'Insufficient parameters supplied' })
        }
        users.findOrCreate({
            where: {
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 10),
                image: image,
                period: 1,
                desc: desc
            },
        })
            .then(([userInfo, created]) => {
                if (created) {
                    // 회원가입에 성공하면 토큰이 발행되므로 별로의 로그인 과정이 생략된다.
                    const accessToken = generateAccessToken({ dataValues: { userInfo } });
                    sendAccessToken(res, accessToken, 201, { data: userInfo, message: 'Create succeed' });
                }
                else {
                    return res.status(409).send('User exists');
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Internal server error" });
            });
    },

    // 회원가입 시 동일한 email을 사용할 수 없도록 확인할 수 있다.
    check: async (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Insufficient parameters supplied' })
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
            res.status(500).json({ message: "Internal server error" });
        }
    },

    mail: async (req, res) => {
        let authNum = Math.random().toString().substr(2, 6);
        let emailTemplete;
        ejs.renderFile(appDir + '/template/authMail.ejs', { authCode: authNum }, function (err, data) {
            if (err) { console.log(err) }
            emailTemplete = data;
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        const mailOptions = await transporter.sendMail({
            from: `sHELP`,
            to: req.body.email,
            subject: '[sHELP]인증 관련 이메일 입니다',
            html: emailTemplete,
        });
        // return res.send(mailOptions)
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            res.json({ certCode: authNum });
            transporter.close()
        });
    }
};