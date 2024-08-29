let code_tree_mas = [["inputValue", "ffff"]];
open_page_code();

function index_find_code_mas(index) {
    return code_tree_mas[index][0];
}

$('#name_code').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        code_tree_mas.push([inputValue, ""]);

        code_div_display();
        console_write(`Create page ${inputValue}`, 3)
    }
});

function clean_page_code() {
    let inputValu_name = $("#code_select").text(); 
    let name_page = index_find_code_mas(inputValu_name)

    editor.setValue("");
    console_write(`Clean up page ${name_page}`, 3)
}

function code_div_display() {
    i = 0;
    $('#lll').html("");
    while (i < code_tree_mas.length) {
        let code = `<div class="tree_item"><p onclick="open_page_code_render(${i})" class="text_p_item">${code_tree_mas[i][0]}</p><p onclick="code_del_page(${i})" class="del_item_code">del</p></div>`;
        $('#lll').append(code);
        i++;
    }
}

function open_page_code_render(name) {
    $('#code_select').text(name);
    editor.setValue(code_tree_mas[name][1]);
}

function save_page_code() {
    let inputValue = editor.getValue(); 
    let inputValu_name = $("#code_select").text(); 
    let name_page = index_find_code_mas(inputValu_name)

    code_tree_mas[inputValu_name][1] = inputValue;
    console_write(`page code save ${name_page}`, 3)
}

function code_del_page(i) {
    code_tree_mas.splice(i, 1);
    code_div_display();
    editor.setValue("");

    console_write(`page del page`, 3)
}