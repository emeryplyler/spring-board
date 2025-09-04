/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, leftIndex, rightIndex)
{
    // choose a pivot
    let start = 0;
    let end = arr.length;
    if (leftIndex && rightIndex)
    {
        start = leftIndex;
        end = rightIndex;
    }
    const pivot = arr[start];

    const left = []; // less than or equal to
    const right = [];

    // for every other element:
    for (let i = 1; i < end; i++)
    {
        if (arr[i] <= pivot)
        {
            left.push(arr[i]);
        }
        else
        {
            right.push(arr[i]);
        }
    }

    for (let i = 0; i < left.length; i++)
    {
        arr[i] = left[i]; // overwrite array with left elements
    }

    const pivotIndex = left.length;
    arr[pivotIndex] = pivot; // put pivot after left

    let counter = left.length + 1;
    for (let j = 0; j < right.length; j++)
    {
        arr[counter] = right[j]; // overwrite last elements in array with right side
        counter++;
    }

    return pivotIndex;
    // return index of where the pivot ended up
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, leftIndex, rightIndex) 
{
    if (!leftIndex || !rightIndex)
    {
        leftIndex = 0;
        rightIndex = arr.length;
    }
    
    if (leftIndex < rightIndex)
    {
        let pivotIndex = pivot(arr, leftIndex, rightIndex);
        quickSort(arr, leftIndex, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, rightIndex);
    }
    // if (arr.length <= 1)
    // {
    //     return;
    // }
    // const pivotIndex = pivot(arr);
    // quickSort(arr.slice(0, pivotIndex + 1)); // when only two elements, not splitting into two
    // quickSort(arr.slice(pivotIndex + 1, arr.length));
    // return arr;
}

// const a = [2, 3];
// console.log(a.slice(0, 0));

console.log(quickSort([4, 20, 12, 10, 7, 9]));

module.exports = { pivot, quickSort };