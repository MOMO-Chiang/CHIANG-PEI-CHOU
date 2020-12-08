<!-- //ver.12-01 -->
var express = require('express');
var router = express.Router();
const conn = require('../dbconnect');



// 商品首頁
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM product_images AS i JOIN products AS p ON i.product_id = p.product_id GROUP BY i.product_id DESC';
  conn.query(sql, function(err, rows){
    if (err) {
      console.log(err);
    }
    var data = rows;
    res.render('product', { data: data});
  });
  
});

//新上架商品頁
router.get('/new' ,function(req, res) {
  var sql = 'SELECT * FROM product_images AS i JOIN products AS p ON i.product_id = p.product_id GROUP BY i.product_id ORDER BY sell_date DESC LIMIT 5';
  conn.query(sql, function(err, rows){
    if (err) {
      console.log(err);
    }
    var data = rows;
    console.log(data);
    res.render('productNew', {data: data});
  });
});

// 商品詳細資訊頁
router.get('/product_detail_:PID', function(req, res, next) {
  let PID = JSON.stringify(req.params.PID);
  // console.log(req.params.PID);
  // console.log(req.session.member_id);
  var sql = `SELECT * FROM product_images WHERE product_id = ${PID};SELECT * FROM products WHERE product_id = ${PID};SELECT * FROM favorite_products WHERE member_id=? AND product_id=?`;
  conn.query(sql, [req.session.member_id, req.params.PID], function(err, rows){
    if (err) {
      console.log(err);   
    }
    var data1 = new Array(rows[0][0]);
    var data2 = new Array(rows[0][1]);
    var data3 = new Array(rows[0][2]);
    var data4 = rows[1];
    var data5 = rows[2];
    console.log(rows);
    if (data5[0] == undefined) {
      var favorite_img = "heart-regular.svg"
    } else {
      var favorite_img = "heart-fill.svg"
    }
    res.render('product_detail', {data1: data1,
                                  data2: data2, 
                                  data3: data3,
                                  data4: data4,
                                  favorite: favorite_img});
  });
  
});

//收藏商品ID存資料庫
router.post('/fav', function(req, res) {
  if (req.session.member_id == null) {
    res.send('請先登入會員');
  } else {
    if (req.body.hearta == "../img/heart-fill.svg") {
      conn.query("INSERT INTO favorite_products set member_id= ?, product_id= ?", [req.session.member_id, req.body.product_id]);
    }
    else {
      conn.query("DELETE from favorite_products where member_id= ? and product_id= ?", [req.session.member_id, req.body.product_id]);
      res.redirect('/product');
    }
  }
})


// 購物車頁
router.get('/checkOut', function(req, res, next) {
  res.render('checkOut', {});
});


//購物車頁判斷會員
router.post('/checkOutAccess', function(req, res) {
  if (req.session.member_id == null) {
    res.send('請先登入會員');
  } else {
    res.send('已是會員');
  }
})

// 訂單資訊頁
router.get('/orderInfo', function(req, res, next) {
  res.render('orderInfo', {});
});

// 訂單確認頁
router.get('/orderCheck', function(req, res, next) {
  // console.log(req.session.member_id);
  res.render('orderCheck', {});
});


//訂單(orders)進資料庫
router.post('/orders' ,function(req, res){
  
    if (req.session.member_id == null) {
      res.send('請先登入會員');
    } else {
      var cartListArray = JSON.parse(req.body.cartList);
      var obj = []
      cartListArray.forEach(function(item,i) {
        var price = parseInt(item.product.productPrice);
        var qty = item.count;
        var subTotal = price * qty;
        obj[obj.length] = [req.body.order_id,
                           item.product.productID,
                           item.product.productName,
                           item.product.productPrice,
                           item.count,
                           subTotal];

      // console.log(obj);
      });
      sql = "INSERT INTO orders SET order_id= ?,member_id= ?,customer_name= ?,customer_tel= ?,customer_add= ?,deliverfee=?,paytype=?,grand_total=?,discount=?;INSERT INTO order_details (order_id, product_id, product_name, unitprice, qty, subtotal) VALUES ?"
      conn.query(sql, [req.body.order_id, req.session.member_id, req.body.customer_name, req.body.customer_tel,req.body.customer_add,req.body.deliverfee,req.body.paytype,req.body.grand_total,req.body.discount,obj]);
      res.redirect('/product');
    }
  
});

module.exports = router;
