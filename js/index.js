const box = document.getElementsByClassName("displaySort")[0];
const randomizeButton = document.getElementById("randomize");
const beginButton = document.getElementById("startSort");
const speedValue = parseInt(document.getElementById("animationSpeed").value, 10);
let arr = [];
let isSorting = false;


for(let i = 0; i < 100; i++){
    arr[i] = i + 1;
}
randomize(arr);
createBars();

function createBars(){
    while (box.firstChild) {
        box.removeChild(box.firstChild);
    }

    for(let i = 0; i < arr.length; i++){
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${arr[i]/2.3}vh`;
        bar.style.width = `5px`;
        bar.style.margin = `0 1px`;
        bar.style.backgroundColor = `#4CAF50`;
        box.appendChild(bar);
    }
}


function randomize(array) {
    if(isSorting) return;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

randomizeButton.addEventListener("click", function(){
    randomize(arr);
    while(box.firstChild){
        box.removeChild(box.firstChild);
    }
    createBars();
});


beginButton.addEventListener("click", async function(){
    if(isSorting) return;
    isSorting = true;
    const algoChoice = document.getElementById("algoSelect").value;
    const speedValue = parseInt(document.getElementById("animationSpeed").value, 10);

    switch(algoChoice){
    case "bubbleSort":
        await bubbleSort(arr, speedValue);
        createBars();
        break;
    case "selectionSort":
        await selectionSort(arr ,speedValue);
        createBars();
        break;
    case "insertionSort":
        await insertionSort(arr ,speedValue);
        createBars();
        break;
    case "mergeSort":
        await mergeSort(arr ,speedValue);
        createBars();
        break;
    case "quickSort":
        await quickSort(arr ,speedValue);
        createBars();
        break;
    case "heapSort":
        await heapSort(arr ,speedValue);
        createBars();
        break;
    case "shellSort":
        await shellSort(arr ,speedValue);
        createBars();
        break;
    case "cocktailShakerSort":
        await cocktailShakerSort(arr ,speedValue);
        createBars();
        break;
    default:
        console.log("error");
    }
    isSorting = false;



});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array, speedValue) {

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                await sleep(speedValue);
                createBars();
            }
        }
    }
}

async function selectionSort(array, speedValue) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            await sleep(speedValue);
            createBars();
        }
    }
}

async function insertionSort(array, speedValue) {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = current;
        await sleep(speedValue);
        createBars();
    }
}

async function mergeSort(array, speedValue, start = 0, end = array.length - 1) {
    if (start >= end) return;

    const middle = Math.floor((start + end) / 2);
    await mergeSort(array, speedValue, start, middle);
    await mergeSort(array, speedValue, middle + 1, end);
    await merge(array, speedValue, start, middle, end);
    await sleep(speedValue);
    createBars();
}

async function merge(array, start, middle, end) {
    let left = array.slice(start, middle + 1);
    let right = array.slice(middle + 1, end + 1);

    let k = start, i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < left.length) {
        array[k] = left[i];
        i++;
        k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        j++;
        k++;
    }
}


async function quickSort(array, speedValue, start = 0, end = array.length - 1) {
    if (start >= end) return;
    
    let index = await partition(array, start, end);
    await Promise.all([
        quickSort(array, speedValue, start, index - 1),
        quickSort(array, speedValue, index + 1, end)
    ]);
}

async function partition(array, start, end) {
    let pivotValue = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
        }
    }
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    await sleep(speedValue);
    createBars();
    return pivotIndex;
}


async function heapSort(array, speedValue) {
    let n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }

    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        await heapify(array, i, 0); // call max heapify on the reduced heap
        await sleep(speedValue); // Introduce delay for visualization
        createBars(); // Update bars to visualize the current state
    }
}

async function heapify(array, size, rootIndex) {
    let largest = rootIndex; // Initialize largest as root
    let left = 2 * rootIndex + 1; // left = 2*i + 1
    let right = 2 * rootIndex + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < size && array[left] > array[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < size && array[right] > array[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest != rootIndex) {
        [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]]; // Swap

        // Recursively heapify the affected sub-tree
        await heapify(array, size, largest);
    }
}


async function shellSort(array, speedValue) {
    let n = array.length;

    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = array[i];

            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }
            array[j] = temp;
            await sleep(speedValue); // Introduce delay for visualization
            createBars(); // Update bars to visualize the current state
        }
    }
}


async function cocktailShakerSort(array, speedValue) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < array.length - 2; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await sleep(speedValue); // Visualize the process
                createBars();
            }
        }
        if (!swapped) {
            break;
        }
        swapped = false;
        for (let i = array.length - 2; i >= 0; i--) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await sleep(speedValue); // Visualize the process
                createBars();
            }
        }
    } while (swapped);
}



