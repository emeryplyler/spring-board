function merge(arr1, arr2) 
{
    const mergedArr = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length)
    {
        if (arr1[i] < arr2[j])
        {
            mergedArr.push(arr1[i]);
            i++;
        }
        else
        {
            mergedArr.push(arr2[j]);
            j++;
        }
    }

    // in case there are leftovers in one of the two arrays:
    while (i < arr1.length)
    {
        mergedArr.push(arr1[i]);
        i++;
    }
    while (j < arr2.length)
    {
        mergedArr.push(arr2[j]);
        j++;
    }

    return mergedArr;
}

function mergeSort(arr) 
{
    // if the array is length 0 or 1, that's good; return this array
    if (arr.length <= 1)
    {
        return arr;
    }


    const midpoint = Math.floor(arr.length / 2); // if the array is longer, split it in half (floor 2)
    const left = mergeSort(arr.slice(0, midpoint)); // and call mergeSort on the left and right halves
    const right = mergeSort(arr.slice(midpoint, arr.length));
    return merge(left, right); // then merge the two halves and return the merged item

}

module.exports = { merge, mergeSort };