let func_id_get = `
function get_style_id(style, block) {
    return parseInt(block.css(style), 10);
}

function get_block(id) {
    return $(id);
}
`;

module.exports = { func_id_get };