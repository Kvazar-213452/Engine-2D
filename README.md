0 f 
1 t


const moveAmount = 10;

$(document).keydown(function(event) {
    let kkk = get_block("#unique-id-1");
    let currentTop = get_style_id("top", kkk);
    let currentLeft = get_style_id("left", kkk);

    switch (event.key) {
        case "w":
            kkk.css("top", currentTop - moveAmount + "px");
            break;
        case "s":
            kkk.css("top", currentTop + moveAmount + "px");
            break;
        case "a":
            kkk.css("left", currentLeft - moveAmount + "px");
            break;
        case "d":
            kkk.css("left", currentLeft + moveAmount + "px");
            break;
    }
});