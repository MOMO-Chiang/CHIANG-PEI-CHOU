var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var url = require("url")
//路由引用
var testRouter = require('./routes/test');
var memberRouter = require('./routes/member');
var member_loginRouter = require('./routes/member_login');
var controlRouter = require('./routes/controls');
var mountainsRouter = require('./routes/mountains');
var newmtRouter = require('./routes/newmt');
var gameRouter = require('./routes/game');
var homepageRouter = require('./routes/homepage');
var newinRouter = require('./routes/newin');
var newinArticle = require('./routes/article');
var newinArticle1 = require('./routes/article_p1');
var productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "secretcode",

}));

// header變數
app.use(function(req, res, next) {
    if (!req.session.member_id) {
        memimg = "guest.png";
        loga = "登入";
        dis = "none";
    } else {
        loga = "登出";
        dis = "block";
        memimg = req.session.member_img;
    }

    next();
});
app.get('/logout', function(req, res, next) {

    delete req.session.member_id;
    res.redirect("/homepage");

});
//路由中介
app.use('/test', testRouter);
app.use('/member', memberRouter)
app.use('/member_login', member_loginRouter)
app.use('/controls', controlRouter)
app.use('/mountains', mountainsRouter);
app.use('/newmt', newmtRouter);
app.use('/game', gameRouter);
app.use('/homepage', homepageRouter);
app.use('/newin', newinRouter);
app.use('/article', newinArticle);
app.use('/article_p1', newinArticle1);
app.use('/product', productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});






module.exports = app;