// Storage 2D array (basic needed)
let graphComponentMatrix = [];

for (let i = 0;i < rows;i++) {
    let row = [];
    for (let j = 0;j < cols;j++) {
        // Why Array  -> More than 1 child relation(dependency)
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

// True -> cyclic, False-> Not Cyclic
function isGraphCyclic(graphComponentMatrix) {
    // dependency -> visited, dfsvisited (2D array)
    let visited = []; // Node visit trace
    let dfsvisited = []; //Stack visit trace

    for (let i = 0;i < rows;i++) {
        let visitedRow = [];
        let dfsVisitedRow = []; 
        for (let j = 0;j < cols;j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsVisitedRow);
    }

    for (let i = 0;i < rows;i++) {
        for (let j = 0;j < cols;j++) {
            if (visited[i][j] === false) {
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited);
                // Found cycle so return immediately, no need to explore more path
                if (response == true) return true;
            }
          
        }
    }

    return false;
}

// Start -> vis(TRUE), dfsVis(TRUE)
// End -> dfsVis(False
// If vis[i][j] -> already explored path, so go back no use to explore again
// Cycle detection condition -> if (vis[i][j] === true && dfsVis[i][j] === true -> cycle))
// Return -> True/False
// True -> cyclic, False -> Not cyclic
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsvisited) {
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;

    // A1 -> [ [0, 1], [1, 0], [5, 10],..... ]
    for (let children = 0;children < graphComponentMatrix[srcr][srcc].length;children++) {
        let [nbrr, nbrd] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) [
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsvisited);
            if (response === true) return true; // Found cycle so return immediately, no need to explore more path
        ]
        else if (visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true) {
            // Found cycle so return immediately, no need to explore more path
            return true;
        }
    }


    dfsvisited[srcr][srcc] = false;
    return false;
}