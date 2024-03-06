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

document.getElementById('stop').addEventListener('click', function() {
    isSorting = false; 
});

beginButton.addEventListener("click", async function(){
    if(isSorting) return;
    isSorting = true;
    const algoChoice = document.getElementById("algoSelect").value;
    const speedValue = parseInt(document.getElementById("animationSpeed").value, 10);

    switch(algoChoice) {
        case "bubbleSort":
            document.querySelector(".algoName p").innerText = "Bubble Sort";
            document.querySelector(".algoDesc p").innerText = "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The algorithm's pass through the list is repeated until no swaps are needed, indicating the list is sorted. It's known for its simplicity but is not suitable for large datasets due to its low efficiency.";
            
            await bubbleSort(arr, speedValue);
            break;
        case "selectionSort":
            document.querySelector(".algoName p").innerText = "Selection Sort";
            document.querySelector(".algoDesc p").innerText = "Selection Sort is an in-place comparison sorting algorithm. It divides the input list into a sorted sub-list built up from left to right at the front of the list and an unsorted sub-list. Each iteration selects the smallest (or largest) element from the unsorted sub-list, swapping it with the leftmost unsorted element, gradually growing the sorted sub-list.";
            
            await selectionSort(arr, speedValue);
            break;
        case "insertionSort":
            document.querySelector(".algoName p").innerText = "Insertion Sort";
            document.querySelector(".algoDesc p").innerText = "Insertion Sort builds the final sorted array one item at a time. It iterates through the input elements and removes one element per iteration, finding its correct position in the already-sorted section of the array, and inserts it there. This method is efficient for small datasets and nearly sorted arrays but less so for large random arrays.";
            
            await insertionSort(arr, speedValue);
            break;
        case "mergeSort":
            document.querySelector(".algoName p").innerText = "Merge Sort";
            document.querySelector(".algoDesc p").innerText = "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge function is key to its efficiency, producing a sorted array from two sorted subarrays. It's known for its consistent performance but requires additional space.";
            
            await mergeSort(arr, speedValue);
            break;
        case "quickSort":
            document.querySelector(".algoName p").innerText = "Quick Sort";
            document.querySelector(".algoDesc p").innerText = "Quick Sort is a highly efficient sorting algorithm that employs a divide-and-conquer strategy to partition the array into smaller sub-arrays, then sorting those sub-arrays independently. Quick Sort is well-regarded for its speed and efficiency, particularly on large datasets.";
            
            await quickSort(arr, speedValue);
            break;
        case "heapSort":
            document.querySelector(".algoName p").innerText = "Heap Sort";
            document.querySelector(".algoDesc p").innerText = "Heap Sort is a comparison-based sorting technique based on a binary heap data structure. It's similar to selection sort where we first find the maximum element and place the maximum at the end. We repeat the same process for the remaining elements. Heap Sort is appreciated for its in-place sorting feature and not using additional storage.";
            
            await heapSort(arr, speedValue);
            break;
        case "shellSort":
            document.querySelector(".algoName p").innerText = "Shell Sort";
            document.querySelector(".algoDesc p").innerText = "Shell Sort is an in-place comparison sort that generalizes insertion sort to allow the exchange of items far apart. The idea is to arrange the list of elements so that, starting anywhere, taking every hth element produces a sorted list. These h-sorting sequences progressively decrease to end with a simple insertion sort but with elements mostly sorted, significantly reducing the overall complexity.";
            
            await shellSort(arr, speedValue);
            break;
        case "cocktailShakerSort":
            document.querySelector(".algoName p").innerText = "Cocktail Shaker Sort";
            document.querySelector(".algoDesc p").innerText = "Cocktail Shaker Sort, also known as bidirectional bubble sort, cocktail sort, shaker sort, ripple sort, shuffle sort, or shuttle sort, is an extension of bubble sort. The algorithm extends bubble sort by operating in two directions. While it traverses the list in both directions alternately, it can move items to their position faster, improving performance on certain datasets over regular bubble sort.";
            
            await cocktailShakerSort(arr, speedValue);
            break;
        default:
            console.log("Error: Algorithm not found");
    }
    isSorting = false;



});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array, speedValue) {

    for (let i = 0; i < array.length; i++) {
        if (!isSorting) return;
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
        if (!isSorting) return;
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
        if (!isSorting) return;
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
    if (!isSorting) return;
    const middle = Math.floor((start + end) / 2);
    await mergeSort(array, speedValue, start, middle);
    await mergeSort(array, speedValue, middle + 1, end);
    await merge(array, start, middle, end); // Removed speedValue
    await sleep(speedValue); // Assuming sleep is defined elsewhere
    createBars();
}

async function merge(array, start, middle, end) { // Removed speedValue
    let left = array.slice(start, middle + 1);
    let right = array.slice(middle + 1, end + 1);

    let k = start, i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (!isSorting) return;
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
    if (!isSorting) return;
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
        if (!isSorting) return;
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
        if (!isSorting) return;
        await heapify(array, n, i);
    }

    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
        if (!isSorting) return;
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        await heapify(array, i, 0); // call max heapify on the reduced heap
        await sleep(speedValue); // Introduce delay for visualization
        createBars(); // Update bars to visualize the current state
    }
}

async function heapify(array, size, rootIndex) {
    if (!isSorting) return;
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
        if (!isSorting) return;
        for (let i = gap; i < n; i += 1) {
            let temp = array[i];

            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }
            array[j] = temp;
            await sleep(speedValue); 
            createBars(); 
        }
    }
}


async function cocktailShakerSort(array, speedValue) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < array.length - 2; i++) {
            if (!isSorting) return;
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await sleep(speedValue); 
                createBars();
            }
        }
        if (!swapped) {
            break;
        }
        swapped = false;
        for (let i = array.length - 2; i >= 0; i--) {
            if (!isSorting) return;
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await sleep(speedValue);
                createBars();
            }
        }
    } while (swapped);
}



