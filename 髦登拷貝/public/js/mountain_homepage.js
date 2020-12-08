// 天氣預報卡時間部分
let d = new Date();
let m = d.getMonth() + 1
let cur_date = d.getDate()
let cur_hour = d.getHours('chinese', { hour12: false })
let cur_min = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
// console.log(cur_hour, cur_min)
let weeks = new Array("日", "一", "二", "三", "四", "五", "六")
let weekdate = weeks[d.getDay()]
// console.log(weekdate); //星期幾

$("#today").text(`${m}/${cur_date}`)
$("#weekdate").text(`(${weekdate})`)
$("#cur_time").text(`${cur_hour}:${cur_min}`)


// 天氣預報API
$(function () {
    $.ajax({
        type: "get",
        url: "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0053-031?Authorization=CWB-989CB285-6523-4ADF-9295-98FF770DF979&format=Json",
        dataType: "JSON",
    }).then(function (elm) {
        //url各山區最後編號位置
        let url = window.location.href
        mid = url.substr(36)
        // console.log(mid)
        // 用mid給的條件抓API山區天氣陣列位置
        switch (mid) {
            case "1":
                num = 126
                break;
            case "2":
                num = 105
                break;
            case "3":
                num = 102
                break;
            case "4":
                num = 6
                break;
            case "5":
                num = 97
                break;
            case "6":
                num = 54
                break;
            case "7":
                num = 32
                break;
            case "8":
                num = 121
                break;
            case "9":
                num = 9
                break;
            case "10":
                num = 1
                break;
            case "11":
                num = 81
                break;
            case "12":
                num = 96
                break;
        }
        // 各項天氣資訊
        let mountain = elm.cwbopendata.dataset.locations.location[num];
        // console.log(mountain);
        let mtName = mountain.locationName; //山名
        let T = mountain.weatherElement[0].time[0].elementValue.value; //溫度
        let Wx = mountain.weatherElement[12].time[0].elementValue[0].value; //天氣現象
        let POP = mountain.weatherElement[9].time[0].elementValue.value; //降雨機率
        // console.log(POP)
        $("#mtName").text(mtName);
        $("#T").html(`${T}&#8451`);
        $("#Wx").text(Wx);

        // 依降雨機率更換圖片
        if (POP <= 20) {
            $("#wt_img").attr("src", "/img/mountains_img/sunny.gif")
        } else if (POP <= 60) {
            $("#wt_img").attr("src", "/img/mountains_img/cloudy.gif")
        } else {
            $("#wt_img").attr("src", "/img/mountains_img/rainny.gif")
        }
        // 山名轉換
        switch (mtName) {
            case "頭鷹山":
                $("#mtName").text("頭嵙山");
                break;
            case "大雪山":
                $("#mtName").text("白毛山");
                break;
            case "大劍山":
                $("#mtName").text("大凍山");
                break;
            case "巴巴山":
                $("#mtName").text("尾寮山");
                break;
            case "三叉山":
                $("#mtName").text("嘉明湖");
                break;
        }



    }); //.ajax.then
}); //function


//加入收藏的愛心
var toggle = true
$("#heart").on("click", function (e) {
  
    if (toggle) {
        $("#heart").attr("src", "img/heart-fill.svg");
        toggle = false
    } else {
        $("#heart").attr("src", "img/heart-regular.svg");
        toggle = true
    }
    // console.log(e)
})

// 推薦指數
window.onload = function () {
    var imgs = document.getElementsByName("rec");

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onclick = function (e) {
            var score = e.target.attributes[2].nodeValue; //獲取分數
            // console.log(score); 
            for (var j = 0; j < score; j++) {
                imgs[j].src = "/img/mountains_img/m_icon.svg";
                // console.log(j);
            }
            for (var j = score; j < imgs.length; j++) {
                imgs[j].src = "/img/mountains_img/m_icon_no.svg";
            }
            var adj;
            switch (score) {
                case "1":
                    adj = "不太行阿!";
                    break;
                case "2":
                    adj = "普普!";
                    break;
                case "3":
                    adj = "覺得可以!";
                    break;
                case "4":
                    adj = "值得推薦!";
                    break;
                case "5":
                    adj = "一定要爬一下!";
                    break;
            }
            document.getElementById("cnt").innerHTML = score;
            document.getElementById("adj").innerHTML = adj;
        };
    }
};

// 留言區時間格式
let newdate = []
$("#item>#msg_time").each(function (index) {

    let newdate = $("#item>#msg_time")[index].innerText.substr(0, 25)
    $("#item>#msg_time").eq(index).text(newdate)

})


//回最上頭
$(document).ready(function () {
    $("#to_topimg").on("click", function (e) {
        document.documentElement.scrollTop = 0;
    });

    // 滑鼠往下到一定位置圖片出現
    $(document).on("scroll", function () {
        if (window.scrollY > 800) {
            $(".topimg").addClass("show")
        } else {
            $(".topimg").removeClass("show")
        }
    })

})


// 分隔線

// 清除評論內容
$("#rest_btn").on("click", function () {
    $("#comment").val("")
})

// 評論的分數及輸入內容進資料庫
$("#chk_btn").on("click", function () {
    // console.log("ok")
    if ($("#comment").val() == "") {
        Swal.fire({
            position: 'center',
            icon: 'question',
            title: '你/妳想說啥呢0.0?',
            background: "#e2e1d1",
            showConfirmButton: true,
        });
    } else {
        var newData = {
            mountain_id: $("#m_id")[0].innerText,
            member_msg: $("#comment").val(),
            rec_score: $("#cnt").text()
        };
        $.ajax({
            type: "post",
            url: "/mountains",
            data: newData
        }).then(function (msg) {
            // console.log(msg)
            if (msg == "請先登入會員") {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: `${msg}`,
                    showConfirmButton: true,
                    background: "#e2e1d1",
                    footer: '<a href=member_login>前往登入/註冊頁</a>'
                });
                $("#comment").val('')
            } else {

                location.reload();
            }
        }) //$.ajax


    } //else
}) //function

// 加入收藏進資料庫

$("#f_btn").on("click", function () {
    console.log($("#heart").attr("src"))
    var favoritedata = {
        mountain_id: $("#m_id")[0].innerText,
        hearta: $("#heart").attr("src")
    };
    $.ajax({
        type: "post",
        url: "/mountains/fav",
        data: favoritedata
    }).then(function (msg) {
        // console.log(msg)
        if (msg == "請先登入會員") {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: `${msg}`,
                showConfirmButton: true,
                background: "#e2e1d1",
                footer: '<a href=member_login>前往登入/註冊頁</a>'
            });
            $("#heart").attr("src", "img/heart-regular.svg");
        } else {
            location.reload();
        }
    })//then
})//function

//生態區翻卡片
$("#wildlife>#item >.card").on("click", function () {
    $(this).toggleClass('flip')
})

document.title=`髦登｜${$("#mountainName")[0].innerText}`
