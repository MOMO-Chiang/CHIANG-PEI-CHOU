var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const conn = require("../dbconnect");

router.get("/", function (req, res, next) {
  res.render("member_login", {});
});

router.get("/member_login_1", function (req, res, next) {
  var wrong = "";
  var colora = "";
  res.render("member_login_1", { wrong, colora });
});
//email
router.post("/member_login_1", function (req, res, next) {
  conn.query(
    "select member_psw,member_name from members where member_mail = ?",
    [req.body.sendmail],
    function (err, row) {
      var data = row;
      if (data == "") {
        var wrong = "您尚未註冊";
        var colora = "#d8704b";
      } else {
        var wrong = "信件已發送";
        var colora = "#90AB8D";
        var psd = data[0].member_psw;
        var nname = data[0].member_name;
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "mountain99123@gmail.com",
            pass: "m0unt@in123",
          },
        });
        var mailOptions = {
          from: "mountain99123@gmail.com",
          to: req.body.sendmail,
          subject: "髦登密碼",
          html: `
          <h1>親愛的 <span style="color:#647f68;">${nname}</span> 您好</h1>
          <h2>您的髦登密碼: <span style="color: #d8704b;">${psd}</span></h2>
          <h2>立即登入<a href="http://localhost:3000/homepage" style="text-decoration: none;color:#647f68;">髦登</a></h2>
          <img src="cid:logo_img" style="width: 50%;">`,
          attachments: [{
            filename: 'logo',
            path: 'public/img/email.png',
            cid: 'logo_img'
          }]
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("訊息發送: " + info.response);
          }
        });
      }
      res.render("member_login_1", { wrong, colora });
    }
  );
});

// 登入頁面
router.get("/member_login_2", function (req, res, next) {
  res.render("member_login_2", { errMsg: "" });
});
// 登入判斷式

router.post("/member_login_2", function (req, res) {
  conn.query(
    "SELECT * FROM members where member_acct = ?",
    [req.body.member_acct],
    function (err, row) {
      var data = row;
      errMsg = "";
      if (req.body.member_acct == "" || req.body.member_psw == "") {
        errMsg = "請輸入完整資訊";
      } else if (data == "") {
        errMsg = "請先註冊帳號";
      } else if (data[0].member_psw != req.body.member_psw) {
        errMsg = "請確認密碼";
      } else if (
        data[0].member_psw == req.body.member_psw &&
        data[0].member_id == 7
      ) {
        req.session.member_id = data[0].member_id;
        req.session.member_img = data[0].member_img;
        res.redirect("/controls/control_article");
      } else {
        req.session.member_id = data[0].member_id;
        req.session.member_img = data[0].member_img;
        console.log(req.session.member_img);
        res.redirect("/homepage");
      }
      res.render("member_login_2", { errMsg });
    }
  );
});

//註冊頁面
router.get("/member_login_3", function (req, res, next) {
  res.render("member_login_3", { errMsg: "" });
});
//註冊頁面資料輸入&驗證
router.post("/member_login_3", function (req, res) {
  conn.query(
    "SELECT * FROM `members` where member_acct=?",
    [req.body.member_acct],
    function (err, row) {
      if (
        req.body.member_acct == "" ||
        req.body.member_mail == "" ||
        req.body.member_psw == "" ||
        req.body.member_name == ""
      ) {
        errMsg = "請輸入完整資訊";
      } else if (row != "") {
        errMsg = "帳號已被使用請更換";
      } else if (row == "") {
        conn.query(
          "insert into members set member_psw=?,member_acct=?,member_mail=?,member_name=? ",
          [
            req.body.member_psw,
            req.body.member_acct,
            req.body.member_mail,
            req.body.member_name,
          ]
        );
        errMsg = "";
        res.redirect("/member_login");
      }
      res.render("member_login_3", { errMsg });
    }
  );
});

module.exports = router;
