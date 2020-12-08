// 文章分類搜尋
$("#article_list").on("change", function () {
  var a = $(this).val();
  console.log(a);
  if (a == "all") {
    $(".all").show();
  } else {
    //.siblings()除此以外
    $(`.${a}`).siblings().hide();
    $(`.${a}`).show();
  }
});

// 商品分類搜尋
$("#product_list").on("change", function () {
  var b = $(this).val();
  // console.log(b);
  if (b == "ALL") {
    $(".pall").show();
  } else {
    $(`.${b}`).siblings().hide();
    $(`.${b}`).show();
  }
});

//新增文章傳回資料庫
$("#chk_btn").on("click", function (e) {
  let judged = e.target.name;
  console.log("ok");
  let dataToSever = {
    article_id: $("#article_id").val(),
    article_list: $("#article_list2").val(),
    article_title: $("#article_title").val(),
    article_content: $("#article_content").val(),
  };
  //新增文章
  if (judged == "") {
    $.ajax({
      type: "post",
      url: "/controls/control_article_edit",
      data: dataToSever,
    }).then(function () {
      window.location.href = "/controls/control_article";
    });
  } else {
    $.ajax({
      type: "put",
      url: "/controls/control_article_edit",
      data: dataToSever,
    }).then(function (e) {
      // console.log(e);
      window.location.href = "/controls/control_article";
    });
  }
});

// 刪除文章

var delBtn_art = document.querySelectorAll("#del_btn");

for (i = 0; i < delBtn_art.length; i++) {
  delBtn_art[i].addEventListener("click", function (e) {
    // console.log("OK");
    // console.log(e.target.attributes[3].value);
    var art_id = e.target.attributes[3].value;

    var art_delData = {
      article_id: art_id,
    };
    $.ajax({
      type: "delete",
      url: "/controls/control_article",
      data: art_delData,
    }).then(function (e) {
      location.reload();
    });
  });
}

// 上架商品到資料庫
$("#chk_btn_pd").on("click", function (e) {
  // console.log("ok");
  let judge = e.target.name;
  let dataToProducts = {
    product_list: $("#product_list2").val(),
    product_id: $("#prod_id").val(),
    unitprice: $("#unit").val(),
    stock: $("#stk").val(),
    product_name: $("#prod_name").val(),
    product_desc: $("#product_desc").val(),
  };
  //新增商品
  if (judge == "") {
    $.ajax({
      type: "post",
      url: "/controls/control_product_edit",
      data: dataToProducts,
    }).then(function (e) {
      window.location.href = "/controls/control_product";
    });
  } else {
    //更新商品
    $.ajax({
      type: "put",
      url: "/controls/control_product_edit",
      data: dataToProducts,
    }).then(function (e) {
      window.location.href = "/controls/control_product";
    });
  }
});

//刪除商品
var delBtn_pd = document.querySelectorAll("#del_btn_pd");

for (i = 0; i < delBtn_pd.length; i++) {
  delBtn_pd[i].addEventListener("click", function (e) {
    console.log("OK");
    console.log(e.target.attributes[2].value);
    var pd_id = e.target.attributes[2].value;

    var pd_delData = {
      product_id: pd_id,
    };
    $.ajax({
      type: "delete",
      url: "/controls/control_product",
      data: pd_delData,
    }).then(function (e) {
      location.reload();
    });
  });
}
// sell_date上架時間格式

$(".pall>#sell_date").each(function (index) {
  let newdate = $(".pall>#sell_date")[index].innerText.substr(0, 25);
  $(".pall>#sell_date").eq(index).text(newdate);
});

// 訂單日期格式

let newdate = [];
$("#order_table>#order_time").each(function (index) {
  let newdate = $("#order_table>#order_time")[index].innerText.substr(20, 49);
  console.log($("#order_table>#order_time")[index].innerText)
  $("#order_table>#order_time").eq(index).text(newdate);
});

//更改訂單狀態

let statu = "";
$("#order_status>#status").each(function () {
  $(this).change(function (e) {
    statu = e.target.value;
    // console.log(statu);
  });
});

var statuBtn = document.querySelectorAll("#status_btn");
for (i = 0; i < statuBtn.length; i++) {
  statuBtn[i].addEventListener("click", function (e) {
    var oId = e.target.attributes[3].value;
    var newStatu = {
      oid: oId,
      status: statu,
    };

    $.ajax({
      type: "put",
      url: "/controls/control_order",
      data: newStatu,
    }).then(function (e) {
      location.reload();
    });
  });
}

//上傳文章圖片
$(function () {
  var upload = {
    uplodImg: $("#uplodImg"), //上傳多個檔案
    uplodchk_btn: $("#uplodchk_btn"), //上傳檔案
    preview: $("#preview"), //圖片預覽盒子
    //預覽圖片載入
    previewImgLoad: function (fileList) {
      for (var i = 0; i < fileList.length; i++) {
        var tempFile = fileList[i];
        var reader = new FileReader();
        reader.readAsDataURL(tempFile);
        reader.onload = function (e) {
          var image = new Image();
          image.height = 150;
          image.width = 150;
          image.title = tempFile.name;
          image.src = e.target.result;
          upload.preview.append(image);
        };
      }
    },
  };

  //載入預覽圖片
  upload.uplodImg.change(function () {
    var fileList = this.files;
    upload.previewImgLoad(fileList);
  });

   //上傳文章多張圖片
  upload.uplodchk_btn.click(function () {
    console.log("ok");
    var files = upload.uplodImg.prop("files");
    // console.log(files)
    if (files.length == 0) {
      //沒有選擇檔案直接返回
      return;
    }
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    let dataToSever = {
      article_id: $("#article_id").val(),
    };
    $.ajax({
      url: "/controls/control_article_edit/upload_artImg",
      type: "post",
      cache: false,
      data: formData,
      processData: false,
      contentType: false,
    }).then(function (e) {
      //傳送成功訊息
      $("#updateStatus").text(e);
    });
    //增加發佈的name跟文章ID Value以便偵測修改或刪除(fix更新無法全刪照片)
    var url = location.href;
    var paraString = url.substring(52)
        // console.log(url, paraString);
    $("#chk_btn").attr("name", `${paraString}`)
    $("#article_id").attr("value", `${paraString}`)
  });
});

//更新文章照片刪除

var deleteBtn_art = document.querySelectorAll("#delete_btn")

for (i = 0; i < deleteBtn_art.length; i++) {
    deleteBtn_art[i].addEventListener("click", function(e) {
        // console.log("OK");

        var artimg_Data = e.target.attributes[3].value

        var img_delData = {
            article_img: artimg_Data
        };
        $.ajax({
            type: "delete",
            url: "/controls/article_imgDel",
            data: img_delData
        }).then(function(e) {
            location.reload()
        })

    })

}


//上傳商品圖片
$(function () {
  var upload = {
    uplodImg: $("#uplodProdImg"), //上傳多個檔案
    uplodchk_btn: $("#uplodprod_btn"), //上傳檔案
    preview: $("#previewProd"), //圖片預覽盒子
    //預覽圖片載入
    previewImgLoad: function (fileList) {
      for (var i = 0; i < fileList.length; i++) {
        var tempFile = fileList[i];
        var reader = new FileReader();
        reader.readAsDataURL(tempFile);
        reader.onload = function (e) {
          var image = new Image();
          image.height = 150;
          image.width = 150;
          image.title = tempFile.name;
          image.src = e.target.result;
          upload.preview.append(image);
        };
      }
    },
  };

  //載入預覽圖片
  upload.uplodImg.change(function () {
    var fileList = this.files;
    upload.previewImgLoad(fileList);
  });

 //上傳商品多張圖片
  upload.uplodchk_btn.click(function () {
    console.log("ok");
    var files = upload.uplodImg.prop("files");
    // console.log(files)
    if (files.length == 0) {
      //沒有選擇檔案直接返回
      return;
    }
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    let dataToProducts = {
      product_list: $("#product_list").val(),
    };

    console.log(formData);
    $.ajax({
      url: "/controls/control_product_edit/upload_productImg",
      type: "post",
      cache: false,
      data: formData,
      processData: false,
      contentType: false,
    }).then(function (e) {
      //傳送成功訊息
      $("#updateStatus").text(e);
    });
     //增加發佈的name跟商品ID Value以便偵測修改或刪除(fix更新無法全刪照片)
     var pd_url = location.href;
     var paraString2 = pd_url.substring(52)
     console.log(pd_url, paraString2);
     $("#chk_btn_pd").attr("name", `${paraString2}`)
     $("#prod_id").attr("value", `${paraString2}`)
  });
});


//更新商品照片刪除

var deleteBtn_pd = document.querySelectorAll("#deleteBtn_pd")

for (i = 0; i < deleteBtn_pd.length; i++) {
  deleteBtn_pd[i].addEventListener("click", function(e) {
        

        var pdimg_Data = e.target.attributes[3].value
        console.log(pdimg_Data);
        var img_delData = {
            product_img: pdimg_Data
        };
        $.ajax({
            type: "delete",
            url: "/controls/product_imgDel",
            data: img_delData
        }).then(function(e) {
            location.reload()
        })

    })

}


//目前文章編號到幾號
$("#article_list2").on("change", function () {
  var categ = $(this).val();
  var categ1 = $(`.d${categ}`).text();
  var txt = categ1.substr(0, 2);
  var txt1 = categ1.substr(2, 3);
  var num = parseInt(txt1) + 1;
  num = num.toString().padStart(3, "0");
  document.getElementById("article_id").setAttribute("value", `${txt}${num}`);
});


//目前商品編號到幾號
$("#product_list2").on("change", function () {
  var categ = $(this).val();
  var categ1 = $(`.d${categ}`).text();
  var txt2 = categ1.substr(0, 2);
  var txt3 = categ1.substr(2, 3);
  var num1 = parseInt(txt3) + 1;
  num1 = num1.toString().padStart(3, "0");
  document.getElementById("prod_id").setAttribute("value", `${txt2}${num1}`)
})

//無處理訂單顯示文字

let chk_status = $("#od_id").val()

if (chk_status == undefined) {
    $("#od_management").text("目前無處理訂單")
} else {
    $("#od_management").text("")

}
//一鍵輸入文字(文章)

$("#speedText").on("click", () => {
  $("#article_title").val("爬山注意事項");
  $("#article_content").text("毛姆曾提出，人生是個艱辛的歷程，讓我自己的一生過得完美一點兒已經很不容易了，怎麼能指望去教導別人如何過好他的一生呢？ 這段話可說是震撼了我。海涅講過一句值得人反覆尋思的話，人生是疾病，世界是醫院，而死是我們的醫生。這段話可說是震撼了我。我們一般認為，抓住了問題的關鍵，其他一切則會迎刃而解。爬山注意事項的出現，必將帶領人類走向更高的巔峰。儘管如此，別人往往卻不這麼想。我們可以很篤定的說，這需要花很多時間來嚴謹地論證。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。一般來說，所謂爬山注意事項，關鍵是爬山注意事項需要如何解讀。既然，若能夠洞悉爬山注意事項各種層面的含義，勢必能讓思維再提高一個層級。阿拉伯講過一段深奧的話，斃虎者飽餐虎肉，畏虎者葬身虎口。帶著這句話，我們還要更加慎重的審視這個問題。我們不得不相信，美華納講過，勿問成功的秘訣為何，且盡全力做你應該做的事吧。這段話雖短，卻足以改變人類的歷史。")

})

//一鍵輸入文字(商品)

$("#speedText2").on("click", () => {
  $("#unit").val("799")
  $("#prod_name").val("風衣外套")

  $("#product_desc").text("黑色<br>擁有兩種模式，可長時間運行的節能模式與不降等的恆流模式<br>智慧調整系統<br>防塵防水級別<br>")
})