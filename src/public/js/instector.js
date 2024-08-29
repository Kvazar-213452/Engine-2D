function inspector() {
    let i = select_id_block_cycle();
    style_block_render_div();

    $('#name').text(block_information[i][0]);
    $('#cord_x').val(block_information[i][1][4]);
    $('#cord_y').val(block_information[i][1][3]);
    $('#size_x').val(block_information[i][1][2]);
    $('#size_y').val(block_information[i][1][1]);
    $('#z_index').val(block_information[i][1][5]);
    $('#background_color').val(block_information[i][1][0]);
    $('#border_radius').val(block_information[i][1][6]);
    $('#rotate').val(block_information[i][1][7]);
}

function inspector_new_val() {
    let i = select_id_block_cycle();
    
    $('#cord_x').val(block_information[i][1][4]);
    $('#cord_y').val(block_information[i][1][3]);
    $('#size_x').val(block_information[i][1][2]);
    $('#size_y').val(block_information[i][1][1]);
}

function inspector_remove() {
    $('#class_block').html(""); 
    
    $('#name').text("Null");
    $('#cord_x').val("");
    $('#cord_y').val("");
    $('#size_x').val("");
    $('#size_y').val("");
    $('#z_index').val("");
    $('#background_color').val("");
    $('#border_radius').val("");
    $('#rotate').val("");
}

$('#cord_x').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][4] = inputValue;
        
        applyStylesToBlocks();
        console_write(`block cord-x ${inputValue} | ${name}`, 1)
    }
});

$('#cord_y').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][3] = inputValue;
        
        applyStylesToBlocks();
        console_write(`block cord-y ${inputValue} | ${name}`, 1)
    }
});

$('#size_x').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][2] = inputValue;
        
        applyStylesToBlocks();
        console_write(`block size-x ${inputValue} | ${name}`, 1)
    }
});

$('#size_y').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][1] = inputValue;
        
        applyStylesToBlocks();
        console_write(`block size-y ${inputValue} | ${name}`, 1)
    }
});

$('#z_index').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][5] = inputValue;
        
        applyStylesToBlocks();
        console_write(`block z-index ${inputValue} | ${name}`, 1)
    }
});

$('#background_color').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][0] = inputValue;
        
        applyStylesToBlocks();
        console_write(`block background color ${inputValue} | ${name}`, 1)
    }
});

$('#border_radius').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][6] = inputValue;
        
        applyStylesToBlocks();
        console_write(`block border radius ${inputValue} | ${name}`, 1)
    }
});

$('#rotate').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        let i = select_id_block_cycle();
        let name = id_block_select();

        block_information[i][1][7] = inputValue;
        
        applyStylesToBlocks();
        console_write(`rotate block ${inputValue} | ${name}`, 1)
    }
});


//world//world//world//world//world//world//world//world//world//world//world//world//world//world//world
//world//world//world//world//world//world//world//world//world//world//world//world//world//world//world

$('#cord_x_world').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[1] = inputValue;

        world_style_update();
        console_write(`set x wordl ${inputValue}`, 5)
    }
});

$('#cord_y_world').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[0] = inputValue;

        world_style_update();
        console_write(`set y wordl ${inputValue}`, 5)
    }
});

$('#size_x_world').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[3] = inputValue;

        world_style_update();
        console_write(`set size x wordl ${inputValue}`, 5)
    }
});

$('#size_y_world').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[2] = inputValue;

        world_style_update();
        console_write(`set size y wordl ${inputValue}`, 5)
    }
});

$('#background_color_world').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[4] = inputValue;

        world_style_update();
        console_write(`set background color wordl ${inputValue}`, 5)
    }
});

$('#border_radius_world').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[5] = inputValue;

        world_style_update();
        console_write(`set border radius wordl ${inputValue}`, 5)
    }
});

$('#rotate_world').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 

        world_mas[6] = inputValue;

        world_style_update();
        console_write(`set rotate wordl ${inputValue}`, 5)
    }
});