var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('game', {});
});
router.get('/game_p2', function(req, res, next) {
    res.render('game_p2', {});
});
router.get('/game_p3', function(req, res, next) {
    res.render('game_p3', {});
});


module.exports = router;