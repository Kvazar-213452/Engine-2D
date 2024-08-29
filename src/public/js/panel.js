let scale = 1;
let undoStack = [];
let redoStack = [];
let isResizing = false;
let isDragging = false;
let initialMouseX, initialMouseY, initialLeft, initialTop, initialWidth, initialHeight;
let isPanelDragging = false;
let panel = $('#panel')[0];


function initialization_block() {
    function saveState() {
        $('.inner-block').each(function() {
            undoStack.push({
                id: $(this).attr('id'),
                width: $(this).width(),
                height: $(this).height(),
                left: parseFloat($(this).css('left')) || 0,
                top: parseFloat($(this).css('top')) || 0
            });
        });
        redoStack = []; 
    }

    function move_x_y(x, y) {
        $('.inner-block.selected').each(function() {
            $(this).css({
                left: `${x}px`,
                top: `${y}px`
            });

            inspector_new_val();
            update_block_information_x_y(x, y);
            applyStylesToBlocks();
        });
    }

    function move_ob(width, height) {
        $('.inner-block.selected').each(function() {
            $(this).css({
                width: `${width}px`,
                height: `${height}px`
            });

            inspector_new_val();
            update_block_information_width_height(width, height);
            applyStylesToBlocks();
        });
    }

    function move_panel(dx, dy) {
        $(panel).css({
            left: (parseFloat($(panel).css('left')) || 0) + dx + 'px',
            top: (parseFloat($(panel).css('top')) || 0) + dy + 'px'
        });
    }

    function ensureInViewport(element) {
        const panelRect = panel.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const scrollLeft = Math.min(
            Math.max(0, elementRect.left - panelRect.left),
            panel.scrollWidth - panel.clientWidth
        );
        const scrollTop = Math.min(
            Math.max(0, elementRect.top - panelRect.top),
            panel.scrollHeight - panel.clientHeight
        );

        panel.scrollLeft = scrollLeft;
        panel.scrollTop = scrollTop;
    }

    interact('#panel')
        .draggable({
            listeners: {
                start(event) {
                    isPanelDragging = true;
                    initialMouseX = event.pageX;
                    initialMouseY = event.pageY;
                },
                move(event) {
                    if (isPanelDragging) {
                        const dx = event.pageX - initialMouseX;
                        const dy = event.pageY - initialMouseY;

                        move_panel(dx, dy);
                        initialMouseX = event.pageX;
                        initialMouseY = event.pageY;
                    }
                },
                end() {
                    isPanelDragging = false;
                }
            }
        });

    interact('.inner-block')
        .draggable({
            listeners: {
                start(event) {
                    if ($(event.target).hasClass('selected')) {
                        isDragging = true;
                        initialMouseX = event.pageX / scale;
                        initialMouseY = event.pageY / scale;
                        initialLeft = parseFloat($(event.target).css('left')) || 0;
                        initialTop = parseFloat($(event.target).css('top')) || 0;
                    }
                },
                move(event) {
                    if (isDragging) {
                        saveState(); // Зберегти стан перед переміщенням
                        const target = event.target;

                        let x = initialLeft + (event.pageX / scale - initialMouseX);
                        let y = initialTop + (event.pageY / scale - initialMouseY);

                        x = Math.max(0, Math.min(x, ($('#panel').width() - $(target).width()) / scale));
                        y = Math.max(0, Math.min(y, ($('#panel').height() - $(target).height()) / scale));

                        move_x_y(x, y);
                        ensureInViewport(target);
                    }
                },
                end() {
                    isDragging = false;
                }
            }
        })
        .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                start(event) {
                    if ($(event.target).hasClass('selected')) {
                        isResizing = true;
                        initialMouseX = event.pageX / scale;
                        initialMouseY = event.pageY / scale;
                        initialWidth = $(event.target).width();
                        initialHeight = $(event.target).height();
                        initialLeft = parseFloat($(event.target).css('left')) || 0;
                        initialTop = parseFloat($(event.target).css('top')) || 0;
                    }
                },
                move(event) {
                    if (isResizing) {
                        saveState(); // Зберегти стан перед зміною розміру
                        const target = event.target;
                        const panelRect = panel.getBoundingClientRect();

                        let dw = (event.pageX / scale) - initialMouseX;
                        let dh = (event.pageY / scale) - initialMouseY;
                        let newWidth = initialWidth + dw;
                        let newHeight = initialHeight + dh;

                        newWidth = Math.max(50, Math.min(newWidth, panelRect.width - initialLeft));
                        newHeight = Math.max(50, Math.min(newHeight, panelRect.height - initialTop));

                        move_ob(newWidth, newHeight);
                        ensureInViewport(target);
                    }
                },
                end() {
                    isResizing = false;
                }
            }
        });

    $('.inner-block').on('click', function(event) {
        event.stopPropagation(); // Запобігти спливу події до панелі
        $('.inner-block').removeClass('selected'); // Зняти виділення з усіх блоків
        $(this).addClass('selected'); // Виділити натиснутий блок
        let id = $(this).attr('id');
        inspector();
        select_div_tree(id);
    });

    $('#panel').on('click', function() {
        let id = id_block_select()
        select_div_tree_none(id);
        $('.inner-block').removeClass('selected');
        inspector_remove();
    });

    $(document).on('mousemove', function(event) {
        if (isDragging) {
            let dx = (event.pageX / scale) - initialMouseX;
            let dy = (event.pageY / scale) - initialMouseY;
            let newX = initialLeft + dx;
            let newY = initialTop + dy;

            newX = Math.max(0, Math.min($('#panel').width() - $('.inner-block.selected').width(), newX));
            newY = Math.max(0, Math.min($('#panel').height() - $('.inner-block.selected').height(), newY));

            move_x_y(newX, newY);
            ensureInViewport($('.inner-block.selected')[0]);
        }

        if (isResizing) {
            let dw = (event.pageX / scale) - initialMouseX;
            let dh = (event.pageY / scale) - initialMouseY;
            let newWidth = initialWidth + dw;
            let newHeight = initialHeight + dh;

            newWidth = Math.max(50, Math.min(newWidth, $('#panel').width() - initialLeft));
            newHeight = Math.max(50, Math.min(newHeight, $('#panel').height() - initialTop));

            move_ob(newWidth, newHeight);
            ensureInViewport($('.inner-block.selected')[0]);
        }
    });
}