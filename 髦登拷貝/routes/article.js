var express = require('express');
var router = express.Router();
const conn = require('../dbconnect');
router.get("/", function(req, res) {
    var rank1;
    var rank2;
    var rank3;
    var rank4;
    conn.query('select article_img,c.article_id, category_id,title,content,date_format(add_date,"%Y-%m-%d") as add_date,ifnull(d.cnt,0) as cnt from articles c left join (select article_id, COUNT(*) as cnt from favorite_articles GROUP BY article_id) d on c.article_id = d.article_id INNER join (SELECT * from article_images group by article_id) e on c.article_id =  e.article_id', function(err, result) {
        if (err) {
            console.log("錯誤");
        } else {
            var data = result;
            // console.log(data);
            conn.query('SELECT title ,a.article_id, count(*) as cnt from favorite_articles a LEFT join articles b on b.article_id = a.article_id group by a.article_id order by cnt desc', function(err, row) {
                var rank = row
                var rank1 = row[0];
                var rank2 = row[1];
                var rank3 = row[2];
                var rank4 = row[3];

                res.render("article", { data, rank1, rank2, rank3, rank4 });
            })
        }

    });
});

module.exports = router;