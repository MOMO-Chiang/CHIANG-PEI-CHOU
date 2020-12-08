const { query } = require('express');
var express = require('express');
var router = express.Router();
const multer = require('multer');
// const h2convas = require("html2canvas");
const conn = require('../dbconnect');

var data6 = []

router.get('/', function (req, res, next) {

    conn.query('select * from  members where member_id=?;SELECT * FROM `mountains` as m JOIN favorite_mountains as f on m.mountain_id=f.mountain_id WHERE member_id=? GROUP BY mountain_name;SELECT* FROM articles as a JOIN article_images as a2 on a.article_id=a2.article_id JOIN favorite_articles as f ON a.article_id=f.article_id WHERE member_id=? GROUP BY favorite_a;SELECT* FROM products as p JOIN product_images as p2 on p.product_id=p2.product_id JOIN favorite_products as f ON p.product_id=f.product_id WHERE member_id=? GROUP BY favorite_p;SELECT o.order_id,OID,customer_tel,customer_name,customer_add,deliverfee,paytype,discount,grand_total,status,date_format(order_time,"%Y-%m-%d %H:%i:%s") as order_time FROM `order_details` as o JOIN orders as o2 on o.order_id=o2.order_id WHERE member_id=? and status= ? GROUP by customer_name;SELECT * FROM `order_details` as o JOIN orders as o2 on o.order_id=o2.order_id WHERE member_id=? and status= ?;SELECT o.order_id,OID,customer_tel,customer_name,customer_add,deliverfee,paytype,discount,grand_total,status,date_format(order_time,"%Y-%m-%d %H:%i:%s") as order_time FROM `order_details` as o JOIN orders as o2 on o.order_id=o2.order_id WHERE member_id=? and status= ? GROUP by customer_name;SELECT * FROM `order_details` as o JOIN orders as o2 on o.order_id=o2.order_id WHERE member_id=? and status= ? ', [req.session.member_id, req.session.member_id, req.session.member_id, req.session.member_id, req.session.member_id, "待處理", req.session.member_id, "待處理", req.session.member_id, "已處理", req.session.member_id, "已處理"], function (err, row) {
        if (req.session.member_id == undefined) {
            res.redirect('/member_login')
        } else {
            var data = row[0];
            var data1 = row[1];
            var data2 = row[2];
            var data3 = row[3];
            var data4 = row[4];
            var data5 = row[5];
            var data6 = row[6];
            var data7 = row[7];
            console.log(data5);
            res.render('member', {
                data: data,
                data1: data1,
                data2: data2,
                data3: data3,
                data4: data4,
                data5: data5,
                data6: data6,
                data7: data7,

            });

        } //else
    }) //conn.query

});

//自定義 storage
var myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/upload"); // 保存的路徑 (需先自己創建)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 自定義檔案名稱
    }
});

var upload = multer({
    storage: myStorage, // 設置 storage
    // fileFilter: function(req, file, cb) { // 檔案過濾
    //     if (file.mimetype != 'image/gif') {
    //         return cb(new Error('Wrong file type'));
    //     }
    //     cb(null, true)
    // }
});
//上傳頭貼
router.post('/', upload.single('myImg'), function (req, res, next) {
    // console.log(req.file) //上傳圖片的檔名
    //如果沒選圖片跳回當前首頁
    if (req.file == undefined) {
        res.redirect('/member');
    } else {
        conn.query('UPDATE members SET member_img = ? WHERE member_id = ?', [req.file.filename, req.session.member_id])
        req.session.member_img = req.file.filename
        res.redirect("/member")
    }


})
//更改個人資料
router.put('/', function (req, res, next) {
    conn.query("UPDATE members SET member_name =?,member_mail=?, member_psw=? WHERE member_id =?", [req.body.member_name, req.body.member_mail, req.body.member_psw, req.session.member_id]);
    res.send("ok")
})
//取消收藏路線
router.delete('/cancel_path', function (req, res, next) {
    conn.query("delete from favorite_mountains where member_id=? and mountain_id=?", [req.session.member_id, req.body.mountain_id]);
    res.send("")
})

//取消收藏文章

router.delete('/cancel_article', function (req, res, next) {
    conn.query("delete from favorite_articles where member_id=? and article_id=?", [req.session.member_id, req.body.article_id]);
    res.send("")
})

//取消收藏商品

router.delete('/cancel_product', function (req, res, next) {
    conn.query("delete from favorite_products where member_id=? and product_id=?", [req.session.member_id, req.body.product_id]);
    res.send("")
})








module.exports = router;