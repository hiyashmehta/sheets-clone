// For delay and  wait
function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}
function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
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

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsvisited);
    if (response === true) return Promise.resolve(true);

    return Promise.resolve(false);
}



//Coloring cells for tracking path
async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsvisited) {
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;
 
    let cell = document.querySelector(".cell[rid="${srcr}"][cid="${srcc}"]");
    
    cell.style.backgroundColor = "lightblue";
    await colorPromise(); // 1 sec finished
    
    for (let children = 0;children < graphComponentMatrix[srcr][srcc].length;children++) {
        let [nbrr, nbrd] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) [
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, dfsvisited);
            if (response === true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolbe(true);
            }
        ]
        else if (visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true) {
            let cyclicCell = document.querySelector(".cell[rid="${nbrr}"][cid="${nbrc}"]");
            cyclicCell.style.backgroundColor = "lightsalmon";
            
            await colorPromise();
            cyclicCell.style.backgroundColor = "transparent";
            
            await colorPromise();
            cell.style.backgroundColor = "transparent";
            return Promise.resolve(true);
        }
    }


    dfsvisited[srcr][srcc] = false;
    return Promise.resolve(false);
}