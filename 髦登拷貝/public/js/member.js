//我的背包
$(document).ready(function (e) {

    $("input[type='checkbox']").on("click", function () {
        var obj = this.id
        // console.log(obj)
        $(`.${obj}`).toggleClass("show1")
    })
});

//修改會員資料
$("#editBtn").on("click", function () {
    if ($("#memberPsw").val() == "" || $("#pswCheck").val() == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<h3 style=color:#647f68>請確認密碼欄位資訊完整</h3>',
            text: '請重新輸入',
            showConfirmButton: true,
            //可改modal顏色
            background: "#e2e1d1",
            //可增加圖片
            // imageUrl:"../img/logo.svg"
        })

    } else if ($("#memberPsw").val() != $("#pswCheck").val()) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<h3 style=color:#647f68>密碼不一致</h3>',
            text: '請重新輸入',
            showConfirmButton: true,
            background:"#e2e1d1"
        })
    } else {
        var newData = {
            member_name: $("#memberName").val(),
            member_mail: $("#memberMail").val(),
            member_psw: $("#memberPsw").val()
        };
        $.ajax({
            type: "put",
            url: "/member",
            data: newData
        }).then(function (e) {
            // console.log(e)   
            Swal.fire({
                text: "修改成功",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ok',
                background:"#e2e1d1"
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) { location.reload() }
            })
        })
    }
    $("#memberPsw").val("");
    $("#pswCheck").val("");

})

//取消收藏路線

var delBtn1 = document.querySelectorAll("#removeBtn1")

for (i = 0; i < delBtn1.length; i++) {
    delBtn1[i].addEventListener("click", function (e) {

        var mt_id = e.path[1].attributes[1].nodeValue

        var delData = {
            mountain_id: mt_id
        };
        $.ajax({
            type: "delete",
            url: "/member/cancel_path",
            data: delData
        }).then(function (e) {
            location.reload()
        })

    })

}
//取消收藏文章

var delBtn2 = document.querySelectorAll("#removeBtn2")

for (i = 0; i < delBtn2.length; i++) {
    delBtn2[i].addEventListener("click", function (e) {

        var art_id = e.path[1].attributes[1].value
        // console.log(e.path[1].attributes[1].value)
        var delData2 = {
            article_id: art_id
        };
        $.ajax({
            type: "delete",
            url: "/member/cancel_article",
            data: delData2
        }).then(function (e) {
            location.reload()
        })

    })

}

//取消收藏商品
var delBtn3 = document.querySelectorAll("#removeBtn3")

for (i = 0; i < delBtn3.length; i++) {
    delBtn3[i].addEventListener("click", function (e) {

        var pd_id = e.path[1].attributes[1].value
        // console.log(e.path[1].attributes[1].value)
        var delData3 = {
            product_id: pd_id
        };
        $.ajax({
            type: "delete",
            url: "/member/cancel_product",
            data: delData3
        }).then(function (e) {
            location.reload()
        })

    })

}

// 訂單日期格式

let newdate = []
$("#order_table>#order_time").each(function (index) {

    let newdate = $("#order_table>#order_time")[index].innerText.substr(0, 25)
    $("#order_table>#order_time").eq(index).text(newdate)

})


// 訂單明細(待處理)

var ordBtn = document.querySelectorAll("#orderBtn")

for (i = 0; i < ordBtn.length; i++) {
    ordBtn[i].addEventListener("click", function (e) {

        var oid = e.target.attributes[7].value
        // console.log(oid);

        var pd_detail = $("tbody>#pd_detail").length

        for (var i = 0; i < pd_detail; i++) {
            // console.log($("tbody>#pd_detail")[i].attributes[1].value);
            if ($("tbody>#pd_detail")[i].attributes[1].value == oid) {
                // console.log($("tbody>#pd_detail").eq(i));
                $("tbody>#pd_detail").eq(i).show()
            } else {
                $("tbody>#pd_detail").eq(i).hide()
            }
        }
    })
}

// 訂單明細(無待處理訂單時顯示)
console.log($(".chk_ord").val());
let no_ord = $(".chk_ord").val()

if (no_ord == undefined) {
    $("#no_ord").text("無待處理訂單")
} else {
    $("#no_ord").text("")
}

// 訂單明細(已處理)
var ordedBtn = document.querySelectorAll("#orderedBtn")

for (i = 0; i < ordedBtn.length; i++) {
    ordedBtn[i].addEventListener("click", function (e) {

        var oid = e.target.attributes[7].value
        // console.log(oid);

        var pd_detail2 = $("tbody>#pd_detail2").length

        for (var i = 0; i < pd_detail2; i++) {
            // console.log($("tbody>#pd_detail")[i].attributes[1].value);
            if ($("tbody>#pd_detail2")[i].attributes[1].value == oid) {
                // console.log($("tbody>#pd_detail").eq(i));
                $("tbody>#pd_detail2").eq(i).show()
            } else {
                $("tbody>#pd_detail2").eq(i).hide()
            }
        }
    })
}

// 無收藏時出現小提醒
var nofav = $("#chkStatus").val()
// console.log(nofav);
if (nofav == undefined) {
    $("#remindImg").attr("style", "display: block")
} else {
    $("#remindImg").attr("style", "display: none")

    // console.log("good");
}
// 無收藏路線時出現小提醒
var nofav = $("#chkStatus").val()
// console.log(nofav);
if (nofav == undefined) {
    $("#remindImg").attr("style", "display: block")
} else {
    $("#remindImg").attr("style", "display: none")

    // console.log("good");
}
// 無收藏時文章出現小提醒
var nofav2 = $("#chkStatus2").val()
// console.log(nofav);
if (nofav2 == undefined) {
    $("#remindImg2").attr("style", "display: block")
} else {
    $("#remindImg2").attr("style", "display: none")

    // console.log("good");
}
var nofav3 = $("#chkStatus3").val()
// console.log(nofav);
if (nofav3 == undefined) {
    $("#remindImg3").attr("style", "display: block")
} else {
    $("#remindImg3").attr("style", "display: none")

    // console.log("good");
}