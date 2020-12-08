change = () => {
    changea.classList.toggle("con1");
    change1.classList.toggle("top");
    change2.classList.toggle("middle");
    change3.classList.toggle("bottom");
    text.classList.toggle("text");
    // cart.classList.toggle("cart");
}
function drop() {
    document.getElementById("drop").classList.toggle("dis");
    if (arrow.innerText == "▼") {
        arrow.innerText = "▲";
    } else {
        arrow.innerText = "▼";
    }
}