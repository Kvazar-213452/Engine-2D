function clos(name) {
    $('#' + name).hide(); 
}

function openModal(name) {
    $('#' + name).show(); 
}

function id_block_select() {
    let selectedBlock = $('.inner-block.selected');
    let idValue = selectedBlock.attr('id');
    return idValue;
}

function select_id_block_cycle() {
    let id = id_block_select();
    
    for (let i = 0; i < block_information.length; i++) {
        if (block_information[i][0] === id) {
            return i;
        }
    }
}

function select_name_block_id(id) {
    let element = $('#' + id);
    return objectName = element.attr('id');
}

function update_block_information_x_y(x, y) {
    let i = select_id_block_cycle();

    block_information[i][1][3] = y;
    block_information[i][1][4] = x;
}

function update_block_information_width_height(width, height) {
    let i = select_id_block_cycle();

    block_information[i][1][1] = width;
    block_information[i][1][2] = height;
}

function open_file_render(response) {
    block_information = [];
    $('#panel').empty();

    let i = 0;
    while (i < response[0].length) {
    let html_content = `
    <div 
    class="inner-block" 
    id="${response[0][i][0]}" 
    style="
    background-color: rgb(0, 0, 0); 
    width: 100px; 
    height: 100px; 
    left: 0px; 
    top: 0px; 
    z-index: 0; 
    border-radius: 0px; 
    transform: rotate(0deg);">
    </div>
    `;
    $('#panel').append(html_content);

    initialization_block();
    i++;
    }

    block_information = response[0];
    code_tree_mas = response[1];
    style_mas = response[2];

    editor.setValue("");
    $('#style_ful').html("");

    open_page_style_render();
    render_style_ful();
    applyStylesToBlocks();
    code_div_display();
    render_style_ful();
    render_block_class_global();
    tree_render();
}

function open_page_code() {
    $('#panel').hide();
    $('#code_page').show();
    $('#class').hide();
}

function open_page_code_tree(a) {
    if (a === 0) {
        $('#tree').hide();
        $('#code_tree').show();
        code_div_display();
    } else if (a === 1) {
        $('#tree').show();
        $('#code_tree').hide();
    }
}

function open_page_inspector(a) {
    if (a === 0) {
        $('#consolas_inspector_ins').show();
        $('#consolas_world_ins').hide();
        code_div_display();
    } else if (a === 1) {
        $('#consolas_inspector_ins').hide();
        $('#consolas_world_ins').show();
    } 
}

function open_page_main() {
    $('#panel').show();
    $('#code_page').hide();
    $('#class').hide();
}

function open_page_class() {
    $('#panel').hide();
    $('#code_page').hide();
    $('#class').show();
}

function console_write(name, type) {
    let code = "";
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    if (type === 0) {
        code = `<div class="console_text_r"><span class="consolas">[consolas]</span> ${name} ${hours}:${minutes}:${seconds}</div>`;
    } else if (type === 1) {
        code = `<div class="console_text_o"><span class="consolas">[consolas]</span> ${name} ${hours}:${minutes}:${seconds}</div>`;
    } else if (type === 2) { 
        code = `<div class="console_text_b"><span class="consolas">[consolas]</span> ${name} ${hours}:${minutes}:${seconds}</div>`;
    } else if (type === 3) {
        code = `<div class="console_text_p"><span class="consolas">[consolas]</span> ${name} ${hours}:${minutes}:${seconds}</div>`;
    } else if (type === 4) {
        code = `<div class="console_text_y"><span class="consolas">[consolas]</span> ${name} ${hours}:${minutes}:${seconds}</div>`;
    } else if (type === 5) {
        code = `<div class="console_text_g"><span class="consolas">[consolas]</span> ${name} ${hours}:${minutes}:${seconds}</div>`;
    }

    $('#console_t').append(code);
}

console_write("start engine", 2)