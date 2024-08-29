$('.input').on('keypress', function(event) {
    if (event.which === 13) {
        let inputValue = $(this).val(); 
        
        create_p(inputValue);
    }
});

function create_p(name) {
    $.ajax({
        url: '/create',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(name),
        success: function(response) {
            console.log('Server response:', response);
        },
        error: function(err) {
            console.error('Error:', err);
        }
    });
}

function render_prg() {
    let i = 0;
    while (i < projects.length) {
        $('.main').append(``);
        i++;
    }
}