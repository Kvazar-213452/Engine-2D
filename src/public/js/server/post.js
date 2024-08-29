function start() {
    let code = "";
    i = 0;
    while (i < code_tree_mas.length) {
        code += "\n\n\n" + code_tree_mas[i][1];
        i++;
    }

    let cssContent = $('#style_ful').text();
    console_write(`start`, 1)
    
    $.ajax({
        url: '/satrt',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify([block_information, code, cssContent, world_mas]),
        success: function(response) {
            console.log('Server response:', response);
        },
        error: function(err) {
            console.error('Error:', err);
        }
    });
}

function stop() {
    console_write(`stop`, 1)

    $.ajax({
        url: '/stop',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(),
        success: function(response) {
            console.log('Server response:', response);
        },
        error: function(err) {
            console.error('Error:', err);
        }
    });
}

function open_file() {
    console_write(`open project`, 1)

    $.ajax({
        url: '/open_file',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(),
        success: function(response) {
            open_file_render(response);
        },
        error: function(err) {
            console.error('Error:', err);
        }
    });
}


function save_file() {
    console_write(`save project`, 1)
    $.ajax({
        url: '/save_file',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify([block_information, code_tree_mas, style_mas, world_mas]),
        success: function(response) {
            console.log('Server response:', response);
        },
        error: function(err) {
            console.error('Error:', err);
        }
    });
}