/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, startIndex = 0, endIndex = arr.length)
{
    const pivot = arr[startIndex]; // choose a pivot
    let pivotIndex = startIndex + 1; // where to put the pivot

    for (let i = startIndex + 1; i < endIndex; i++)
    {
        // if current element less than pivot,
        if (arr[i] < pivot)
        {
            // swap current element with item at pivotIndex
            let temp = arr[i];
            arr[i] = arr[pivotIndex];
            arr[pivotIndex] = temp;
            // increment pivotIndex, since there's another item behind it now
            pivotIndex++;
        }
    }
    // put pivot next to pivot index
    // this way, one of the smaller numbers will get rearranged to make room for the pivot
    // the order of the smaller numbers doesn't matter right now, just that
    // they're on the left of the pivot
    let temp = arr[pivotIndex - 1];
    arr[pivotIndex - 1] = pivot;
    arr[startIndex] = temp;

    // return index of where the pivot ended up
    return pivotIndex - 1; // minus 1 because index changed after inserting element
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, leftIndex = 0, rightIndex = arr.length) 
{
    if (rightIndex - leftIndex <= 1)
    {
        // there are no numbers between left and right indices; one or no elements left
        return arr; // short enough to count as sorted
    }

    // organize current section of array by pivot, lesser on left, greater on right
    const pivotIndex = pivot(arr, leftIndex, rightIndex);

    // split into two pieces based on the pivot, not including the pivot itself
    quickSort(arr, leftIndex, pivotIndex); // sort each piece
    quickSort(arr, pivotIndex + 1, rightIndex);

    return arr;
}

module.exports = { pivot, quickSort };