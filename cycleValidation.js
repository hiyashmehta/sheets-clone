// Storage 2D Matrix (basic needed)
let graphComponentMatrix = [];

for (let i = 0;i < rows;i++) {
    let row = [];
    for (let j = 0;j < cols;j++) {
        // Why Array  -> More than 1 child relation(dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}