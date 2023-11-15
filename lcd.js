/*

        OPEN HTML FILE

*/
let form = document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
        let num = document.querySelector("#numInput");
        let height = document.querySelector("#height");
        let width = document.querySelector("#width");
        let output = document.querySelector(".show");
        output.firstChild.innerText = convertLCD(num.value, width.value, height.value);
        num.value = "";
        height.value = "";
        width.value = "";
    }
})
function convertLCD(num, width, height) {
    const patterns = {
        '0': [' _ ', '| |', '|_|'],
        '1': ['   ', '  |', '  |'],
        '2': [' _ ', ' _|', '|_ '],
        '3': [' _ ', ' _|', ' _|'],
        '4': ['   ', '|_|', '  |'],
        '5': [' _ ', '|_ ', ' _|'],
        '6': [' _ ', '|_ ', '|_|'],
        '7': [' _ ', '  |', '  |'],
        '8': [' _ ', '|_|', '|_|'],
        '9': [' _ ', '|_|', ' _|'],
    };
    let adjustHeight = increaseHeight(patterns, height);
    let lcdPatterns = increaseWidth(adjustHeight, width);
    const numStr = num.toString();
    const lcdRows = ['', '', ''];
    if (height > 1) {
        for (let e = 0; e < height * 2 - 2; e++) {
            lcdRows.push('');
        }
    }
    for (let i = 0; i < numStr.length; i++) {
        const pattern = lcdPatterns[numStr[i]];
        for (let j = 0; j < lcdRows.length; j++) {
            lcdRows[j] += pattern[j] + ' ';
        }
    }
    const result = lcdRows.join('\n');
    return result;
}
function increaseWidth(obj, w) {
    for (let i = 0; i < 10; i++) {
        let index = i.toString();
        for (let j = 0; j < obj[index].length; j++) {
            let string = obj[index][j];
            let char = string.charAt(1);
            let newStr = string.slice(0, 1) + char.repeat(w - 1) + string.slice(1);
            obj[index][j] = newStr;
        }
    }
    return obj;
}
function increaseHeight(obj, h) {
    if (h === 1) return obj;
    h--;
    for (let i = 0; i < 10; i++) {
        let string = i.toString();
        if (string === '0' || string === '8') {
            for (let j = 0; j < h; j++) {
                obj[i].splice(1, 0, '| |');
                obj[i].splice(-1, 0, '| |');
            }
        }
        if (string === '1' || string === '3' || string === '7') {
            for (let j = 0; j < h; j++) {
                obj[i].splice(1, 0, '  |');
                obj[i].splice(-1, 0, '  |');
            }
        }
        if (string === '2') {
            for (let j = 0; j < h; j++) {
                obj[i].splice(1, 0, '  |');
                obj[i].splice(-1, 0, '|  ');
            }
        }
        if (string === '4' || string === '9') {
            for (let j = 0; j < h; j++) {
                obj[i].splice(1, 0, '| |');
                obj[i].splice(-1, 0, '  |');
            }
        }
        if (string === '5') {
            for (let j = 0; j < h; j++) {
                obj[i].splice(1, 0, '|  ');
                obj[i].splice(-1, 0, '  |');
            }
        }
        if (string === '6') {
            for (let j = 0; j < h; j++) {
                obj[i].splice(1, 0, '|  ');
                obj[i].splice(-1, 0, '| |');
            }
        }
    }
    return obj;
}