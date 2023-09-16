// Storage
let sheetDB = [];

for (let i = 0;i < rows;i++) {
    let sheetRow = [];
    for (let j = 0;j < cols;j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000" //Just for indication purpose
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


// Selectors for cell properties 
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color");
let BGcolor = document.querySelector(".BGcolor");
let alignment = document.querySelector(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Application of two-way binding

// Attach property listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    // Modification
    cellProp.bold = !cellProp.bold; // Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";  // ui change (1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;  // UI change (2)
})
italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    // Modification
    cellProp.italic = !cellProp.italic; // Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";  // ui change (1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;  // UI change (2)
})
underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    // Modification
    cellProp.underline = !cellProp.underline; // Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";  // ui change (1)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;  // UI change (2)
})
fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    cellProp.fontSize = fontSize.value;  // Data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.value;
})

function activeCell(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
    // address -> "A1"
    let rid = Number(address.slice(1)-1); //"1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65
    return [rid, cid];
}