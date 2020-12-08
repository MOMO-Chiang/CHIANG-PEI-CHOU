//登入密碼開關屏蔽

$("#psw_status").on("click", function () {
    var status = $(this)[0].attributes[2].value
    console.log(status);
    if (status === "on") {
        $("#form_4").attr("type", "password");
        $("#psw_status").attr("state", "off");
    } else {
        $("#form_4").attr("type", "text");
        $("#psw_status").attr("state", "on");
    }
})
/* 一件輸入資料小山 */

$("#speedText").on("click", () => {
    // console.log("ok");
    $("#form_7").val("大膽貂民")
    $("#form_3").val("test1")
    $("#form_4").val("test1")
    $("#form_6").val("test1@gmail.com")
})