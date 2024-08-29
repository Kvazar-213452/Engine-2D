$(document).ready(function(){
    $(document).keydown(function(event) {
        let keyCode = event.which; 

        if (keyCode === 188) {
            if (undoStack.length > 0) {
                const state = undoStack.pop();
                console.log(state.id)
                redoStack.push({
                    id: state.id,
                    width: $(`#${state.id}`).width(),
                    height: $(`#${state.id}`).height(),
                    left: parseFloat($(`#${state.id}`).css('left')) || 0,
                    top: parseFloat($(`#${state.id}`).css('top')) || 0
                });
                let objectName = select_name_block_id(state.id)
                let id_block;

                let i = 0;
                while (i < block_information.length) {
                    if (objectName === block_information[i][0]) {
                        id_block = i;
                        break;
                    }
                    i++;
                }

                block_information[id_block][1][1] = state.width;
                block_information[id_block][1][2] = state.height;
                block_information[id_block][1][3] = state.top;
                block_information[id_block][1][4] = state.left;

                applyStylesToBlocks();
            }
        } else if (keyCode === 190) {
            if (redoStack.length > 0) {
                const state = redoStack.pop();
                undoStack.push({
                    id: state.id,
                    width: $(`#${state.id}`).width(),
                    height: $(`#${state.id}`).height(),
                    left: parseFloat($(`#${state.id}`).css('left')) || 0,
                    top: parseFloat($(`#${state.id}`).css('top')) || 0
                });
                let objectName = select_name_block_id(state.id)
                let id_block;

                let i = 0;
                while (i < block_information.length) {
                    if (objectName === block_information[i][0]) {
                        id_block = i;
                        break;
                    }
                    i++;
                }

                block_information[id_block][1][1] = state.width;
                block_information[id_block][1][2] = state.height;
                block_information[id_block][1][3] = state.top;
                block_information[id_block][1][4] = state.left;

                applyStylesToBlocks();
            }
        }
    });
});