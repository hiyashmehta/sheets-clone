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