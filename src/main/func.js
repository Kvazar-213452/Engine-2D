function content_html_file(code, func_id_get, receivedData) {
let i = 0;
let class_ = "";
while (i < receivedData[3][7].length) {
    if(i === receivedData[3][7].length - 1) {
        class_ += receivedData[3][7][i];
    } else {
        class_ += receivedData[3][7][i] + "";
    }
    i++;
}

let world = `<div id="panel" 
style="
background-color: ${receivedData[3][4]}; 
width: ${receivedData[3][3]}px; 
height: ${receivedData[3][2]}px; 
top: ${receivedData[3][0]}px; 
left: ${receivedData[3][1]}px; 
border-radius: ${receivedData[3][5]}px; 
transform: ${receivedData[3][6]};" 
class="${class_}">
`;
    
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }

    ${receivedData[2]}
    </style>
</head>
<body>
    ${world}
    ${code}
    </div>
</body>
<script>
    ${func_id_get}

    ${receivedData[1]}
</script>
</html>`;

return htmlContent;
}

function create_block(receivedData) {
    let code = ``;
    let i = 0;
    while (i < receivedData[0].length) {
        let a = 0;
        let class_block = "";
        while (a < receivedData[0][i][2].length) {
            class_block += receivedData[0][i][2][a] + "";
            a++;
        }

        let mars = `<div 
        id="${receivedData[0][i][0]}" 
        class="${class_block}"
        style="
        position: absolute; 
        background-color: ${receivedData[0][i][1][0]}; 
        width: ${receivedData[0][i][1][1]}px; 
        height: ${receivedData[0][i][1][2]}px; 
        left: ${receivedData[0][i][1][4]}px; 
        top: ${receivedData[0][i][1][3]}px; 
        z-index: ${receivedData[0][i][1][5]};
        border-radius: ${receivedData[0][i][1][6]}px;
        transform: rotate(${receivedData[0][i][1][7]}deg);">
        </div>`;
        code += mars;
        i++;
    }
    return code;
}

module.exports = { content_html_file, create_block };