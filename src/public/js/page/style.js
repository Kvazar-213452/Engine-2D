let style_mas = [];

$('#name_style').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        style_mas.push([inputValue, {}]);

        open_page_style_render();
        console_write(`Create style ${inputValue}`, 4)
    }
});

function open_page_style_render() {
    $('#style_render').html("");
    
    let i = 0;
    while (i < style_mas.length) {
        let code = `
            <div class="div_page_style">
                <p class="style_name_page">${style_mas[i][0]}</p>
                <p onclick="style_del_page(${i})" class="style_name_page_del">del</p>
                <br><br>
                <input class="input_tilem_page_style" placeholder="Name" id="style_add_${i}" type="text">
                <button class="style_name_page_h" onclick="add_style_style(${i})">Add selector</button>
                <br><br>
                <button class="style_name_page_h" onclick="open_style_page_on_page(${i})">Open</button>
                <br><br>
                <div class="description" id="style_code_${i}">
                    ${style_mas[i][1]['color'] ? `<div class="div_j"><p class="anem_style_ddd">Color:</p><input class="input_tilem_page_Style_g" id="color_chenge_${i}" value="${style_mas[i][1]['color']}" type="text"><button class="button_new_valu" onclick="new_value_color_style(${i}, 'color')">Update</button></div>` : ''}
                    ${style_mas[i][1]['background-color'] ? `<div class="div_j"><p class="anem_style_ddd">background-color:</p><input class="input_tilem_page_Style_g" id="color_chenge_${i}" value="${style_mas[i][1]['background-color']}" type="text"><button class="button_new_valu" onclick="new_value_color_style(${i}, 'background-color')">Update</button></div>` : ''}
                </div>
            </div>
        `;
        $('#style_render').append(code);
        i++;
    }

    console_write(`Open page style`, 4);
}

function new_value_color_style(i, num) {
    let value = $("#color_chenge_" + i).val(); 
    console.log(value)
    style_mas[i][1][num] = value;
    console.log(style_mas[i][1][num])
}

function add_style_style(i) {
    let code = $('#style_add_' + i).val();

    if (code === "color") {
        style_mas[i][1]['color'] = "0";
        open_page_style_render();
        console_write(`Page add style selector ${code}`, 4)
    } else if (code === "background-color") {
        style_mas[i][1]['background-color'] = "0";
        open_page_style_render();
        console_write(`Page add style selector ${code}`, 4)
    }
}

function style_del_page(i) {
    style_mas.splice(i, 1);

    open_page_style_render();
    console_write(`Page del style idnex ${i}`, 4)
}

function open_style_page_on_page(i) {
    let description = $('#style_code_' + i);

    if (description.css('display') === 'none' || description.css('display') === '') {
        description.css('display', 'block'); 
    } else {
        description.css('display', 'none'); 
    }
}

function render_style_ful() {
    $('#style_ful').html("");

    let style = "";
    let i = 0;
    while (i < style_mas.length) {
        style += `
            .${style_mas[i][0]} {
                ${style_mas[i][1]['color'] ? `color: ${style_mas[i][1]['color']} !important;` : ''}
                ${style_mas[i][1]['background-color'] ? `background-color: ${style_mas[i][1]['background-color']} !important;` : ''}
            }
        `
        i++;
    }

    $('#style_ful').html(style);
}