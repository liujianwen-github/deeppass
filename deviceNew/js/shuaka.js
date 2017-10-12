/**
 * 刷卡 TODO
 * 
 * @param cardId
 */

function shuaKa(cardId) {
    // 获取输入框内的卡号
    var cardID = cardId;
    console.log("cardId = " + cardID);
    if(!swipeCard){
    		return
    }
    $("#inputCard").attr("value", ''); // 清空input输入框
    $.ajax({
        type: "post",
        url: config.HOST + "user/userSwipeCard",
        async: true,
        data: { cardId: cardID }

    });
}