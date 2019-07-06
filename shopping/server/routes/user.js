var express = require('express');
var router = express.Router();
var db = require('../models/sql');


router.post('/login', function (req, res, next) {


    let { username, userpass } = req.body

    let sql = `select * from users where username=?`

    db(sql, [username], function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                state: 0,
                err: err,
                msg: 'Query error!'
            })
        }

        // 判断用户是否存在
        if (data.length === 0) {
            res.json({
                state: 1,
                msg: '账号或密码错误'
            })
        } else {
            if (data[0].userpass != userpass) {
                res.json({
                    state: 2,
                    msg: '账号或密码错误'
                })
            } else {
                res.json({
                    state: 3,
                    msg: 'login success',
                    token: 'token'
                })
            }
        }

    })
})

router.post('/register', function (req, res, next) {

});

module.exports = router;
