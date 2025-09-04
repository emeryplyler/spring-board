function selectionSort(arr) 
{
    // assign first element to be minimum at the beginning of the sort
    for (let i = 0; i < arr.length; i++)
    {
        let minimum = arr[i];
        let minIndex = i; // the index the true minimum is at

        // check with the other elements to see if that's really the minimum:
        for (let j = i + 1; j < arr.length; j++) // starting after current index i
        {
            if (minimum > arr[j]) // for every OTHER item in array, compare it to next item
            {
                minimum = arr[j]; // if it's smaller, that's the new minimum
                minIndex = j; // this is where the true minimum is
            }
        }

        // now we have the true minimum
        if (minimum != arr[i]) // if the minimum is not what we started with, swap them
        {
            let temp = arr[i];
            arr[i] = minimum; // put true minimum at current spot
            arr[minIndex] = temp; // put current element where true minimum was
        }

        // now do comparison with next element
    }

    return arr;
}

module.exports = selectionSort;