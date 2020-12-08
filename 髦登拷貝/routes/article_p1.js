var express = require('express');
var router = express.Router();
const conn = require('../dbconnect');

router.get("/", function (req, res) {
    conn.query('SELECT article_id,category_id,title,content,date_format(add_date,"%Y-%m-%d") as add_date FROM articles where article_id =?;SELECT * FROM favorite_articles WHERE member_id=? AND article_id=?;SELECT * FROM `article_images` WHERE article_id=?;SELECT article_id,a.product_id,product_name,unitprice,product_img from article_recommend a inner join products b on a.product_id = b.product_id inner join (SELECT * from product_images group by product_id) c on a.product_id = c.product_id where article_id = ?', [req.query.aid, req.session.member_id, req.query.aid, req.query.aid,req.query.aid], function (err, result) {
        if (err) {
            console.log("錯誤");
        } else {
            var data = result[0];
            var data1 = result[1];
            var data10 = result[3];
            if (data1[0] == undefined) {
                var favorite_img = "heart-regular.svg"
            } else {
                var favorite_img = "heart-fill.svg"
            }
            var favorite = favorite_img;
            
            if (data10[0]== undefined) {
              var rdisplay = "none";
            } else {
               var rdisplay = "block"
            }
        }
        //文章圖片

        var data2 = result[2]
        var data3 = data2[0]
        var data4 = data2[1]
        var data5 = data2[2]

        console.log(data3);
        res.render("article_p1", { data, favorite, data3, data4, data5,rdisplay,data10})

    });
});

router.post('/fav', function (req, res) {
    if (req.session.member_id == null) {
        res.send('請先登入會員')
    } else {
        if (req.body.hearta == "img/heart-regular.svg") {
            conn.query("INSERT INTO favorite_articles set member_id= ?,article_id= ?", [req.session.member_id, req.body.aid]);
            res.redirect('/article_p1');
        } else {
            conn.query("DELETE from favorite_articles where member_id= ? and article_id= ?", [req.session.member_id, req.body.aid]);
            res.redirect('/article_p1');
        }
    }
})
module.exports = router;