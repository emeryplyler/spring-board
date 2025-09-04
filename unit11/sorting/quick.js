/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr)
{
    // choose a pivot
    const pivot = arr[0];

    const left = []; // less than or equal to
    const right = [];

    // for every other element:
    for (let i = 1; i < arr.length; i++)
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

function quickSort(arr) 
{
    if (arr.length <= 1)
    {
        return arr; // short enough to count as sorted
    }
    const pivotIndex = pivot(arr);
    const pivotVal = arr[pivotIndex]; // save the value of the pivot

    // split into two pieces based on the pivot
    const left = quickSort(arr.slice(0, pivotIndex)); // don't include pivotIndex itself
    const right = quickSort(arr.slice(pivotIndex + 1, arr.length));

    // add the arrays back together
    left.push(pivotVal); // left, then pivot, then right
    arr = left.concat(right); // save changes to array

    return arr;
}

module.exports = { pivot, quickSort };