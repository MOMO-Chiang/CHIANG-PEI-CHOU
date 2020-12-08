var express = require('express');
var router = express.Router();
const conn = require('../dbconnect');
const multer = require('multer')

router.get('/', function (req, res, next) {
    res.render('control_login', {});
});

// 從資料庫抓文章資料及管理者帳號資料
router.get('/control_article', function (req, res, next) {
    conn.query('SELECT * FROM members WHERE member_id=?;SELECT article_id,category_id,title,content,date_format(add_date,"%Y-%m-%d") as add_date FROM articles order by add_date desc', [req.session.member_id], function (err, row) {
        var data = row[0]
        var data1 = row[1]
        // console.log(data1);
        res.render('control_article', {
            data: data,
            data1: data1
        });
    })

});

// 新增文章欄位資料抓取
router.get('/control_article_edit', function (req, res, next) {

    conn.query('SELECT * FROM members WHERE member_id=?; SELECT max(article_id) as article_id from articles group by category_id', [req.session.member_id,], function (err, row) {
        var data = row[0]
        var data3 = row[1]
        // console.log(data);
        res.render('control_article_edit', { data, data1: [{}], data2: [{}], data3, display_status: "none" });
        // res.send(data)
    })

});

//更新文章資料抓取
router.get('/control_article_edit_:aid', function (req, res, next) {
    // console.log("ok5555")

    conn.query('SELECT * FROM members WHERE member_id=?;SELECT * FROM articles as a left join article_images as a2 on a.article_id=a2.article_id WHERE a.article_id=? GROUP BY a.article_id;SELECT * FROM articles as a join article_images as a2 on a.article_id=a2.article_id WHERE a.article_id=?', [req.session.member_id, req.params.aid, req.params.aid], function (err, row) {
        // console.log(row);
        var data = row[0];
        var data1 = row[1];
        var data2 = row[2];
        var data3 = [{ article_id: "" }, { article_id: "" }, { article_id: "" }, { article_id: "" }, { article_id: "" }, { article_id: "" }];
        // console.log(data1)
        res.render('control_article_edit', {
            data: data,
            data1: data1,
            data2: data2,
            data3: data3,
            display_status: "inline-block"

        });
    })

});


//新增文章到資料庫
router.post('/control_article_edit', function (req, res, next) {
    var art_img = req.session.images
    var art_imges = []; //存成陣列讓新增比較彈性
    art_img.forEach(function (item, index) {
        art_imges[art_imges.length] = [req.body.article_id, art_img[index].filename]
    })
    // console.log(art_imges);
    conn.query('INSERT INTO articles set article_id= ?, category_id= ?, title= ?, content= ?;INSERT INTO article_images (article_id , article_img )VALUES ?',
        [req.body.article_id, req.body.article_list, req.body.article_title, req.body.article_content, art_imges]);
    // console.log(req.body.article_list)
    res.redirect('/controls/control_article');
});


// 文章修改

router.put('/control_article_edit', function (req, res, next) {
    // console.log("ok");
    var modify_art_img = req.session.images
    var modify_art_imges = []; //存成陣列讓新增比較彈性
    modify_art_img.forEach(function (item, index) {
        modify_art_imges[modify_art_imges.length] = [req.body.article_id, modify_art_img[index].filename]
    })
    console.log(modify_art_imges);
    conn.query('update articles set article_id= ?, category_id= ?, title= ?, content= ? where article_id= ?;INSERT INTO article_images (article_id , article_img )VALUES ?', [req.body.article_id, req.body.article_list, req.body.article_title, req.body.article_content, req.body.article_id, modify_art_imges]);
    res.send('put_ok');
    req.session.images.destroy();
    // console.log(req.session.images);


});


//整個文章刪除(圖&文)

router.delete("/control_article", function (req, res, next) {
    conn.query("DELETE a.*, a2.* FROM articles as a JOIN article_images as a2 ON a.article_id=a2.article_id WHERE a.article_id=?", [req.body.article_id]);
    res.send("")
})

//修改文章刪除照片
router.delete("/article_imgDel", function (req, res, next) {

    conn.query('delete from article_images where article_img = ?', [req.body.article_img]);

    res.send("")
})

//修改文章修改照片


// 從資料庫抓商品資料及管理者帳號資料
router.get('/control_product', function (req, res, next) {
    conn.query('SELECT * FROM members WHERE member_id=?; SELECT a.product_id,category_id,product_name,product_desc,stock,unitprice,date_format(sell_date,"%Y-%m-%d %H:%i:%s") as sell_date,product_img from products a inner join (SELECT * from product_images group by product_id) b on b.product_id = a.product_id', [req.session.member_id], function (err, row) {

        var data = row[0]
        var data1 = row[1]
        // console.log(data);
        res.render('control_product', {
            data: data,
            data1: data1
        });
    })

});
// 新增商品資料抓取
router.get('/control_product_edit', function (req, res, next) {
    // console.log(req.params.pid);
    conn.query('SELECT * FROM members WHERE member_id=?;SELECT max(product_id) as product_id from products group by category_id', [req.session.member_id], function (err, row) {

        var data = row[0];
        var data5 = row[1];


        res.render('control_product_edit', {
            data: data,
            data1: [{}],
            data2: [{}],
            data5,
            display_status: "none"
        });
    })

});

//更新商品資料抓取
router.get('/control_product_edit_:pid', function (req, res, next) {
    conn.query('SELECT * FROM members WHERE member_id=?;SELECT * FROM products as p left join product_images as p2 on p.product_id=p2.product_id WHERE p.product_id=? GROUP BY p.product_id;SELECT * FROM products as p join product_images as p2 on p.product_id=p2.product_id WHERE p.product_id=?', [req.session.member_id, req.params.pid, req.params.pid], function (err, row) {


        var data = row[0];
        var data1 = row[1];
        var data2 = row[2];

        var data5 = [{ product_id: "" }, { product_id: "" }, { product_id: "" }, { product_id: "" }];
        // console.log(data1)
        res.render('control_product_edit', {
            data: data,
            data1: data1,
            data2: data2,
            data5: data5,
            display_status: "inline-block"

        });
    })

});


//新增商品資料
router.post('/control_product_edit', function (req, res, next) {
    var pd_img = req.session.images
    var pd_imges = []; //存成陣列讓新增比較彈性
    pd_img.forEach(function (item, index) {
        pd_imges[pd_imges.length] = [req.body.product_id, pd_img[index].filename]
    })
    // console.log(pd_imges);
    conn.query('INSERT INTO products set category_id= ?, product_id= ?, unitprice= ?, product_name= ?, product_desc= ?; INSERT INTO product_images (product_id, product_img) VALUES ?',
        [req.body.product_list, req.body.product_id, req.body.unitprice, req.body.product_name, req.body.product_desc, pd_imges]);
    res.redirect('/controls/control_product');

});

//更新商品資料
router.put('/control_product_edit', function (req, res, next) {
    var modify_pd_img = req.session.images
    var modify_pd_imges = []; //存成陣列讓新增比較彈性
    modify_pd_img.forEach(function (item, index) {
        modify_pd_imges[modify_pd_imges.length] = [req.body.product_id, modify_pd_img[index].filename]
    })
    // console.log(modify_pd_imges);

    conn.query('update products set category_id= ?, product_id= ?, unitprice= ?, product_name= ?, product_desc= ?  WHERE product_id= ?;INSERT INTO product_images (product_id, product_img) VALUES ?', [req.body.product_list, req.body.product_id, req.body.unitprice, req.body.product_name, req.body.product_desc, req.body.product_id, modify_pd_imges])
    res.send("put_ok")

})


//更新商品刪除照片
router.delete("/product_imgDel", function (req, res, next) {

    conn.query('delete from product_images where product_img = ?', [req.body.product_img]);

    res.send("")
})



//刪除商品(圖&文)
router.delete("/control_product", function (req, res, next) {
    conn.query('DELETE p.*, p2.* FROM products as p JOIN product_images as p2 ON p.product_id=p2.product_id WHERE p.product_id=?', [req.body.product_id]);
    res.send("")
})




// 從資料抓管理者帳號資料
router.get('/control_order', function (req, res, next) {
    conn.query('SELECT * FROM members WHERE member_id=?; SElECT OID,order_id,member_id,customer_name,customer_tel,customer_add,deliverfee,paytype,grand_total,status,date_format(order_time,"%Y-%m-%d") as order_time FROM orders where status=?', [req.session.member_id, "待處理"], function (err, row) {

        var data = row[0]
        var data1 = row[1]
        // console.log(data1);
        res.render('control_order', {
            data: data,
            data1: data1,

        });
    })

});

//更改訂單狀態
router.put('/control_order', function (req, res, next) {
    // console.log(req.body.oid);
    conn.query('UPDATE orders set status= ? where OID=?', [req.body.status, req.body.oid]);
    res.send('ok');
});

//上傳文章圖片
//自定義 storage
var myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/articles_img"); // 保存的路徑 (需先自己創建)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // 自定義檔案名稱
    }
});

var upload = multer({
    storage: myStorage,
});

// 新增文章上傳照片
router.post('/control_article_edit/upload_artImg', upload.array('photos', 3), function (req, res, next) {

    req.session.images = req.files
    // console.log(req.session.images);
    res.send("圖片上傳成功")
})



//上傳商品圖片
//自定義 storage
var myProdStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/products"); // 保存的路徑 (需先自己創建)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // 自定義檔案名稱
    }
});

var upload = multer({
    storage: myProdStorage,
});

//新增商品上傳圖片
router.post('/control_product_edit/upload_productImg', upload.array('photos', 3), function (req, res, next) {
    req.session.images = req.files
    // console.log(req.session.images);
    // console.log(req.files);
    res.send("圖片上傳成功")
})



module.exports = router;