let block_information = [];

function create_block(id) {
    for (let i = 0; i < block_information.length; i++) {
        if (block_information[i][0] === id) {
            return; 
        }
    }
 
    let newDiv = $(`<div class="inner-block" id="${id}"></div>`);
    $('#panel').append(newDiv);

    let initialColor = "#000";
    let initialWidth = 100;
    let initialHeight = 100;
    let initialX = 0;
    let initialY = 0;
    let z_index = 0;
    let border_radius = 0;
    let rotate = 0;


    let newBlockInfo = [id, [initialColor, initialWidth, initialHeight, initialX, initialY, z_index, border_radius, rotate], []];
    block_information.push(newBlockInfo);

    applyStylesToBlocks();
    initialization_block();
}

function del_block() {
    let name = id_block_select();
    let element = $('#' + name);
    element.remove();

    let i = select_id_block_cycle();
    block_information.splice(i, 1);

    inspector_remove();
}

function applyStylesToBlocks() {
    for (let i = 0; i < block_information.length; i++) {
        let id = block_information[i][0];
        let styles = block_information[i][1];
        
        let [backgroundColor, width, height, top, left, z_index, border_radius, rotate] = styles;

        let block = $('#' + id);

        if (block.length > 0) {
            block.css({
                'background-color': backgroundColor,
                'width': `${width}px`,
                'height': `${height}px`,
                'left': `${left}px`,
                'top': `${top}px`,
                'z-index': `${z_index}`,
                'border-radius': `${border_radius}px`,
                'transform': `rotate(${rotate}deg)`
            });
        }
    }
}

$('#class_add_block_input').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();

        block_information[i][2].push(inputValue);

        render_block_class(i);
        style_block_render_div();
        console_write(`Block is assigned "${inputValue}"`, 1)
    }
});

function render_block_class(i) {
    $('#' + block_information[i][0]).removeClass();
    $('#' + block_information[i][0]).addClass('inner-block');
    $('#' + block_information[i][0]).addClass('selected');
    let a = 0;
    while (a < block_information[i][2].length) {
        $('#' + block_information[i][0]).addClass(block_information[i][2][a]);
        a++;
    }
    console_write(`Class Updated blocks`, 4)
}

function render_block_class_global() {
    let i = 0;
    while (i < block_information.length) {
        $('#' + block_information[i][0]).removeClass();
        $('#' + block_information[i][0]).addClass('inner-block');
        $('#' + block_information[i][0]).addClass('selected');
        let a = 0;
        while (a < block_information[i][2].length) {
            $('#' + block_information[i][0]).addClass(block_information[i][2][a]);
            a++;
        }
    i++;
    }
}

function style_block_render_div() {
    $('#class_block').html(""); 
    let name = select_id_block_cycle();
    let i = 0;
    while (i < block_information[name][2].length) {
        $('#class_block').append(`<div class="div_naem_class_block_render_div">${block_information[name][2][i]}<p onclick="del_class_block(${i})" class="style_name_page_del">del</p></div>`);
        i++;
    }
}

function del_class_block(i) {
    let block = select_id_block_cycle();
    block_information[block][2].splice(i, 1);
    style_block_render_div();
    render_block_class(i)
    console_write(`Class del blocks`, 4)
}

$('#block_create').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        clos('modal1')
        create_block(inputValue);
        tree_render();
        console_write("block create " + inputValue, 2)
    }
});

function tree_render() {
    $('#tree').html("");
    let i = 0;
    while(i < block_information.length) {
        $('#tree').append(`<div onclick="select_block_tree('${block_information[i][0]}')" class="tree_div_block ${block_information[i][0]}">${block_information[i][0]}</div>`);
        i++;
    }
}

function select_block_tree(name) {
    inspector_remove();
    $('#panel div').removeClass('selected');
    $('#' + name).addClass('selected');
    select_div_tree(name)
    inspector();
}

function select_div_tree(id) {
    let div = $('#tree .' + id);
    $('#tree div').removeClass('selected_tree_div');
    div.addClass('selected_tree_div');
}

function select_div_tree_none(id) {
    let div = $('#tree .' + id);
    $('#tree div').removeClass('selected_tree_div');
}

create_block('unique-id-1'); 