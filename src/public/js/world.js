let world_mas = [100, 100, 600, 800, "#4c4c4c", 0, 0, []];

function world_style_update() {
    $("#panel").css({
        'background-color': `${world_mas[4]}`,        
        'width': `${world_mas[3]}px`,
        'height': `${world_mas[2]}px`,
        'top': `${world_mas[0]}px`,
        'left': `${world_mas[1]}px`,
        'border-radius': `${world_mas[5]}px`,
        'transform': `rotate(${world_mas[6]}deg)`
    });
}

function style_world_render_div() {
    $('#class_world').html(""); 
    let i = 0;
    while (i < world_mas[7].length) {
        $('#class_world').append(`<div class="div_naem_class_block_render_div">${world_mas[7][i]}<p onclick="del_class_world(${i})" class="style_name_page_del">del</p></div>`);
        i++;
    }
}

$('#class_add_world_input').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[7].push(inputValue);

        render_world_class();
        style_world_render_div();
        console_write(`Wordl is assigned "${inputValue}"`, 5)
    }
});

function render_world_class() {
    $('#panel').removeClass();
    let a = 0;
    while (a < world_mas[7].length) {
        $('#panel').addClass(world_mas[7][a]);
        a++;
    }
    console_write(`Class Updated world`, 5)
}

function del_class_world(i) {
    world_mas[7].splice(i, 1);
    style_world_render_div();
    render_world_class();
    console_write(`Class del world`, 5)
}