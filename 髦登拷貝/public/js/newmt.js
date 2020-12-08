//漢堡選單
change = () => {
    changea.classList.toggle("con1");
    change1.classList.toggle("top");
    change2.classList.toggle("middle");
    change3.classList.toggle("bottom");
    text.classList.toggle("text");
}

//吉祥物滑出
$(".groupL").on("mouseenter", function(e) {
    // console.log(e)
    var infor = $(this)[0].innerText
        // substring可取範圍內想要的字串
    var h2content = infor.substring(0, 3)
    var pcontent = infor.substring(3, 11)
    var imgcontent = e.currentTarget.firstElementChild.children[2].outerHTML
        // console.log(imgcontent)
        // console.log(h2content, pcontent)
    $("#mtInfo").html(`
    <div class="infoText">
        <h2>${h2content}</h2>
        <p>${pcontent}</p>
        ${imgcontent}
    </div>`)
    $(".leftDiau").css("left", -300)
        // pop找出pop1在哪個位置是for pop視窗的
    var pop = e.currentTarget.children[1].className
        // console.log(pop)
    $(`.${pop}`).attr("style", " display: block")


})

$(".groupL").on("mouseleave", function(e) {
    $(".leftDiau").css("left", -1000)
    var pop = e.currentTarget.children[1].className
        // console.log(pop)
    $(`.${pop}`).removeAttr("style", " display: block")
        // $(".infoText").hide().innerText
})


$(".groupR").on("mouseenter", function(e) {

    var infor = $(this)[0].innerText
    var h2content = infor.substring(0, 3)
    var pcontent = infor.substring(3, 11)
    var imgcontent = e.currentTarget.firstElementChild.children[2].outerHTML
        // console.log(imgcontent)
        //left
    $("#mtInfoR").html(`
    <div class="infoTextR">
        <h2>${h2content}</h2>
        <p>${pcontent}</p>
        ${imgcontent}
    </div>`)
    $(".rightDiau").css("left", 800)
    var pop = e.currentTarget.children[1].className
        // console.log(pop)
    $(`.${pop}`).attr("style", " display: block")

})
$(".groupR").on("mouseleave", function(e) {
    $(".rightDiau").css("left", 1800)
    var pop = e.currentTarget.children[1].className
        // console.log(pop)
    $(`.${pop}`).removeAttr("style", " display: block")
        // $(".infoText").hide().innerText
})

//會員下拉
function drop() {
    document.getElementById("drop").classList.toggle("dis");
    if (arrow.innerText == "▼") {
        arrow.innerText = "▲";
    } else {
        arrow.innerText = "▼";
    }
}