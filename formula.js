for (let i = 0;i < rows;i++){
    for (let j = 0;j < cols;j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getCellAndCellProp(address);
            let enteredData = activeCell.innerText;
          
            if (enteredData === cellProp.value) return;

            cellProp.value = enteredData;
            // If data modifies remove P-C relation, formula empty, update children with new hardcoded (modified) value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) => {
    let inputFormula = formulaBar.value;
    if (e.key === "Enter" && formulaBar.value) {
        let inputFormula = formula.value
        let evaluatedValue = evaluateFormula(inputFormula);

        // If change in formula, break old P-C relation, evaluatenew formula, add new P-C relation
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        if (inputFormula !== cellProp.formula) removeChildFromParent(cellProp.formula);
        
        addChildToGraphComponent(inputFormula, address);
        // check formula is cyclic or not, then only evaluate
        // True -> cycle, False-> Not Cyclic
        let cycleResponse = isGraphCyclic();
        if (cycleResponse) {
          //  alert("Your formula is cyclic");
            let response = confirm("Your formula is cyclic. Do you want to trace your path.");
            while (response === true) {
                // Keep on tracking color until user is satisfied
                await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse); // I want to complete full  iteration of  color tracing, so I will attach wait here also
                response = confirm("Your formula is cyclic. Do you want to trace your path.");
            }
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }

        let evaluatedValue = evaluatedFormula(inputFormula);



        // To updateUI and cellProp in DB
        setCellUIAndCellProp(evaluatedValue, inputFormula, address);
        addChildToParent(inputFormula);

        updateChildrenCells(address);
    }
})


function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for (let i = 0;i < encodedFormula.length;i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            // B1: A1 + 10
            // rid -> i, cid -> j
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

function removeChildFromGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");

    for (let i = 0;i < encodedFormula.length;i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue = 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}
function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children;

    for (let i = 0;i < children.length;i++) {
        let childAddress = children[i];
        let [childCell, childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.firmula;

        let evaluatedVaalue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedVaalue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}
function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let decodedFormula = formula.split(" ");
    for (let i = 0;i < decodedFormula.length;i++) {
        let asciiValue = decodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0;i < encodedFormula.length;i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0;i < encodedFormula.length;i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
           let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
           encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address){
    let [cell, cellProp] = getCellAndCellProp(address);

    // UI update
    cell.innerText = evaluatedValue;
    //DB Update 
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;

}