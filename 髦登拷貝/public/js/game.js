$(document).ready(function () {
    var count = 2; // 第一題已經是預設

    obj = {
      Q2: "Q2: 下列哪項不是在山上迷路了該採取的措施？", //題目
      content2:
        "迷路時請保持冷靜，停留在原地找安全避風處躲避，並注意自身保暖與熱量補充，勿自行亂跑，有餘力時可吹哨子或製造聲響、燈光引起別人注意，等待救援。", //詳解
      Q3: "Q3: 初次登山裝備要怎麼穿？",
      content3:
        "登山時常常會越走越熱，或是爬到一半下雨，所以洋蔥式穿法就很重要！內層穿透氣、排汗、舒適的衣物，防風、防雨是外層衣最重要的功能，在高山上吹風淋雨非常容易失溫或感冒，在挑選時可衣挑選一般登山防水外套，或更高階、更輕量的款式。",
      Q4: "Q4: 申請入山入園要怎麼處理？", //題目
      content4:
        "有的山需要申請入山或入園，有的則是兩者皆要申請。入園證是依據「國家公園法」之規定，進入國家公園生態保護區，應經國家公園管理處許可。而入山證則是依據警政署「國家安全法規定」，進入部分山區須事先申請。",
      Q5: "Q5: 登山餐食怎麼準備？", //題目
      content5:
        "建議大家準備正餐餐食、預備糧、行動糧，攜帶不易腐敗的食物，主食的部分像是馬鈴薯、麵食這種好料理又不用擔心保存問題的食物，預備糧盡量以乾貨為主以減少重量和負擔，高熱量、體積小的食物都非常適合當行動糧",
    }; //這邊造物件只是想讓裡面的code看起來比較少
    // console.log($("#score"))
    // Q1
    $(".ansBtn").on("click", function () {
      var id = $(this)[0].id;

      // console.log(id);
      if (id == "A3" && true) {
        $(".m_title").text("答對了");
        $(".m_title").attr("style", "background-color: #647F68");
        $(".picText").text("好厲害喔")
        $("#score").text(parseInt($("#score")[0].innerText) + 20);
      } else {
        $(".m_title").text("答錯了");
        $(".m_title").attr("style", "background-color: #D8705B");
        $(".picText").text("溫馨提醒")
        $("#score").text(parseInt($("#score")[0].innerText) + 0);
      }
    });

    //前往下一題程式
    var count = 2;
    $(".nextBtn").on("click", function () {
      //   $("#modalArea").removeAttr("style", "display:block");
      page = count++;
      console.log(page);
      //   第二題開始
        switch (page) {
          case 2:
            $(".ansBtn").eq(0).attr("id", "A4").text("停留在原地"); //更換第1個按鈕文字
            $(".ansBtn").eq(1).attr("id", "A5").text("憑印象走回頭路"); //更換第2個按鈕文字
            $(".ansBtn").eq(2).attr("id", "A6").text("製造聲響引起別人注意"); //更換第3個按鈕文字
            $(".titie").text(`${obj.Q2}`);
            $(".content").text(`${obj.content2}`);
            $("#score").text($("#score")[0].innerText);
            // Q2
            $(".ansBtn").on("click", function () {
              var id = $(this)[0].id;
              // console.log(id);
              if (id == "A5" && true) {
                $(".m_title").text("答對了");
                $(".m_title").attr("style", "background-color: #647F68");
                $(".picText").text("好厲害喔")
                $("#score").text(parseInt($("#score")[0].innerText) + 20);
                console.log($("#score")[0].innerText);
                
              } else {
                $(".m_title").text("答錯了");
                $(".m_title").attr("style", "background-color: #D8705B");
                $(".picText").text("溫馨提醒")
                $("#score").text(parseInt($("#score")[0].innerText) + 0);
              }
            });
  
          break;
          case 3:
            $(".ansBtn").eq(0).attr("id", "A7").text("全身包緊緊"); //更換第1個按鈕文字
            $(".ansBtn").eq(1).attr("id", "A8").text("輕便為主"); //更換第2個按鈕文字
            $(".ansBtn").eq(2).attr("id", "A9").text("洋蔥式穿法"); //更換第3個按鈕文字
            $(".titie").text(`${obj.Q3}`);
            $(".content").text(`${obj.content3}`);
            $("#score").text($("#score")[0].innerText);
            // Q3
            $(".ansBtn").on("click", function () {
              var id = $(this)[0].id;
              // console.log(id);
              if (id == "A9" && true) {
                $(".m_title").text("答對了");
                $(".m_title").attr("style", "background-color: #647F68");
                $(".picText").text("好厲害喔")
                $("#score").text(parseInt($("#score")[0].innerText) + 20);
                console.log($("#score")[0].innerText);
                
              } else {
                $(".m_title").text("答錯了");
                $(".m_title").attr("style", "background-color: #D8705B");
                $(".picText").text("溫馨提醒")
                $("#score").text(parseInt($("#score")[0].innerText) + 0);
              }
            });
          break;
          case 4:
            $(".ansBtn").eq(0).attr("id", "A10").text("行前申請"); //更換第1個按鈕文字
            $(".ansBtn").eq(1).attr("id", "A11").text("到登山口申請"); //更換第2個按鈕文字
            $(".ansBtn").eq(2).attr("id", "A12").text("到國家公園申請"); //更換第3個按鈕文字
            $(".titie").text(`${obj.Q4}`);
            $(".content").text(`${obj.content4}`);
            $("#score").text($("#score")[0].innerText);
            // Q4
            $(".ansBtn").on("click", function () {
              var id = $(this)[0].id;
              // console.log(id);
              if (id == "A10" && true) {
                $(".m_title").text("答對了");
                $(".m_title").attr("style", "background-color: #647F68");
                $(".picText").text("好厲害喔")
                $("#score").text(parseInt($("#score")[0].innerText) + 20);
                console.log($("#score")[0].innerText);
                
              } else {
                $(".m_title").text("答錯了");
                $(".m_title").attr("style", "background-color: #D8705B");
                $(".picText").text("溫馨提醒")
                $("#score").text(parseInt($("#score")[0].innerText) + 0);
              }
            });
  
          break;
          case 5:
            $(".ansBtn").eq(0).attr("id", "A13").text("冷凍食品"); //更換第1個按鈕文字
            $(".ansBtn").eq(1).attr("id", "A14").text("輕量、不易腐敗食品"); //更換第2個按鈕文字
            $(".ansBtn").eq(2).attr("id", "A15").text("喜歡吃的都可以帶"); //更換第3個按鈕文字
            $(".titie").text(`${obj.Q5}`);
            $(".content").text(`${obj.content5}`);
            $("#score").text($("#score")[0].innerText);
            $("#next_page").attr("style", "display: none");
            $("#togame_p3").attr("style", "display: block");
            
            
            
            // Q4
            $(".ansBtn").on("click", function () {
              var id = $(this)[0].id;
              // console.log(id);
              if (id == "A14" && true) {
                $(".m_title").text("答對了");
                $(".m_title").attr("style", "background-color: #647F68");
                $(".picText").text("好厲害喔")
                $("#score").text(parseInt($("#score")[0].innerText) + 20);
                console.log($("#score")[0].innerText);
                
              } else {
                $(".m_title").text("答錯了");
                $(".m_title").attr("style", "background-color: #D8705B");
                $(".picText").text("溫馨提醒")
                $("#score").text(parseInt($("#score")[0].innerText) + 0);
              }
              
            });
          break;

        }
        
        //暫存分數到localStorage
        window.localStorage;
        $("#togame_p3").on("click", function(){
            var r = $("#score")[0].innerText;
            localStorage.setItem("key", `${r}`);
            window.location.href = "http://localhost:3000/game/game_p3";

        })
        
        
    });
  });