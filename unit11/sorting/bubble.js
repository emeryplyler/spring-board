function bubbleSort(arr)
{
    // for each item in the array:
    for (let i = 0; i < arr.length; i++)
    {
        let swapped = false; // see if any swaps are performed this run
        // do a run for each other item in the array:
        for (let j = 0; j < arr.length - i; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                let temp = arr[j]; // hold item 1
                arr[j] = arr[j + 1]; // item 2 goes in item 1's slot
                arr[j + 1] = temp; // item 1 goes in item 2's slot
                swapped = true; // a swap was performed this run
            }

        }

        if (!swapped)
        {
            break; // no swaps were performed during an entire run; array is sorted
        }
    }

    return arr;
}

module.exports = bubbleSort;