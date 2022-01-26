require('dotenv').config();
const { generateAccessToken, sendAccessToken } = require('./token');
const { users } = require('../models')
const bcrypt = require('bcrypt');
const axios = require('axios');
const qs = require('qs');
const kakao = {
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectUri: process.env.KAKAO_REDIRECT_URL
}

module.exports = {
    get: async (req, res) => {
        const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_nickname,account_email`;
        res.redirect(kakaoAuthURL);
    },

    callback: async (req, res) => {
        // access 토큰을 요청
        try {
            token = await axios({
                method: 'POST',
                url: 'https://kauth.kakao.com/oauth/token',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    grant_type: 'authorization_code',
                    client_id: kakao.clientID,
                    client_secret: kakao.clientSecret,
                    redirectUri: kakao.redirectUri,
                    code: req.query.code,
                })
            })
        } catch (err) {
            res.json(err.data);
        }
        // 전달받은 access토큰을 이용하여 사용자 정보 조회
        let user;
        try {
            user = await axios({
                method: 'get',
                url: 'https://kapi.kakao.com/v2/user/me',
                headers: {
                    Authorization: `Bearer ${token.data.access_token}`
                }//헤더에 내용을 보고 보내주겠다.
            })
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }

        req.session.kakao = user.data;

        // 소셜로그인(카카오) 회원 정보 DB 저장
        try {
            const { nickname, thumbnail_image_url } = user.data.kakao_account.profile;
            const { email } = user.data.kakao_account;

            // return res.json(email)
            if (!nickname || !email || !thumbnail_image_url) {
                return res.status(422).json({ message: 'Insufficient parameters supplied' })
            }
            const searchUser = await users.findOne({
                where: { email }
            })

            if (!searchUser) {
                await users.create({
                    name: nickname,
                    email: email,
                    password: bcrypt.hashSync(process.env.KAKAO_USER_PASSWORD, 10),
                    image: thumbnail_image_url,
                    period: 1,
                    desc: ''
                })
                    .then((userInfo) => {
                        const accessToken = generateAccessToken({ dataValues: { userInfo } });
                        sendAccessToken(res, accessToken, 201, { data: userInfo, message: 'Create succeed' });
                    })
            } else {
                const accessToken = generateAccessToken({ dataValues: { searchUser } });
                sendAccessToken(res, accessToken, 200, { data: searchUser, message: 'Signin succeed' });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
};