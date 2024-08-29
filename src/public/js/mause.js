$('#panel').on('wheel', function(event) {
    event.preventDefault();
    if (event.originalEvent.deltaY < 0) {
        scale += 0.1; 
    } else {
        scale -= 0.1; 
        if (scale < 0.1) scale = 0.1; 
    }
    const x = parseFloat($(this).attr('data-x')) || 0;
    const y = parseFloat($(this).attr('data-y')) || 0;
    $(this).css('transform', `translate(${x}px, ${y}px) scale(${scale})`);
});