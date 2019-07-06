var express = require('express');
var router = express.Router();
var db = require('../models/sql');

/* 获取热销商品 */
router.get('/hot', function(req, res, next) {
    let sql = `select * from goods where hot = 1`

    db(sql, [], function(err, data) {
        if (err) {
            console.log(err)
            return res.json({
                err: err,
                msg: 'Query error!'
            })
        }

        res.json({
            data: data
        })
    })
})


/* 获取详细信息 */
router.get('/one', function(req, res, next) {
    let goods_id = req.query.goods_id

    let sql = `select * from goods where goods_id=?`

    db(sql, [goods_id], function(err, data) {
        if (err) {
            console.log(err)
            return res.json({
                err: err,
                msg: 'Query error!'
            })
        }

        res.json({
            data: data[0]
        })
    })
})


router.get('/category', function(req, res, next) {
    let sql = `select * from goods`

    db(sql, [], function(err, data) {
        if (err) {
            return res.json({
                err: err,
                msg: 'Query error!'
            })
        }

        res.json({
            data: data
        })
    })
})

router.get('/findmore', function(req, res, next) {
    let sql = `select * from goods where goods_id <= 8`

    db(sql, [], function(err, data) {
        if (err) {
            return res.json({
                err: err,
                msg: 'Query error!'
            })
        }

        res.json({
            data: data
        })
    })
})
module.exports = router;
