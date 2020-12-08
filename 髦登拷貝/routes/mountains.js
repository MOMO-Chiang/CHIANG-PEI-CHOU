var express = require('express');
var router = express.Router();
const conn = require('../dbconnect')


router.get('/', function (req, res, next) {
    conn.query('SELECT * FROM ( ( SELECT * FROM mountains WHERE mountain_id=?) as m1 JOIN (SELECT * FROM mountain_details WHERE mountain_id=?) as m2 ON m1.mountain_id=m2.mountain_id )JOIN (SELECT * FROM access WHERE mountain_id=?) as m3 on m1.mountain_id=m3.mountain_id;SELECT * FROM  ( SELECT * FROM mountains WHERE mountain_id=?) as m1 JOIN(SELECT * FROM wildlife WHERE mountain_id=?) as m2 ON m1.mountain_id=m2.mountain_id;SELECT member_name,member_msg,date_format(msg_time,"%Y-%m-%d %H:%i:%s") as msg_time,rec_score,member_img FROM members as m1 join messages as m2 on m1.member_id=m2.member_id WHERE mountain_id=? ORDER BY `m2`.`msg_time` DESC;SELECT * FROM `favorite_mountains` WHERE member_id=? AND mountain_id=?', [req.query.mid, req.query.mid, req.query.mid, req.query.mid, req.query.mid, req.query.mid, req.session.member_id, req.query.mid], function (err, rows) {
        if (err) {
            console.log(JSON.stringify(err));
            return;
        }
        var data = rows[0]
        var data2 = rows[1]
        var data3 = rows[2]
        var data4 = rows[3]
        //根據有無值判斷是否有加收藏有收藏愛心會是填滿的
        // console.log(data4[0]);
        if (data4[0] == undefined) {
            var favorite_img = "heart-regular.svg"
        } else {
            var favorite_img = "heart-fill.svg"
        }
        res.render('mountain_homepage', {
            data: data,
            data2: data2,
            data3: data3,
            favorite: favorite_img
        })
    })



})

router.post('/', function (req, res) {
    // console.log("ok")
    if (req.session.member_id == null) {
        res.send('請先登入會員')
    } else {
        conn.query("INSERT INTO messages set mountain_id= ?,member_id= ?,member_msg= ?,rec_score= ?", [req.body.mountain_id, req.session.member_id, req.body.member_msg, req.body.rec_score]);
        // console.log(req.body)
        res.redirect('/mountains')
    }

})
router.post('/fav', function (req, res) {
    if (req.session.member_id == null) {
        res.send('請先登入會員');
    } else {
        if (req.body.hearta == "img/heart-fill.svg") { conn.query("INSERT INTO favorite_mountains set member_id= ?,mountain_id= ?", [req.session.member_id, req.body.mountain_id]); }
        else {
            conn.query("DELETE from favorite_mountains where member_id= ? and mountain_id= ?", [req.session.member_id, req.body.mountain_id]);
            res.redirect('/mountains');
        }

    }
})

module.exports = router;