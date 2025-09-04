function insertionSort(arr) 
{
    // start at second element
    for (let i = 1; i < arr.length; i++)
    {
        const element = arr[i];
        // check all elements to the left
        let index = i;
        for (let j = i - 1; j >= 0; j--)
        {
            if (element < arr[j])
            {
                // move element at j to the right
                let temp = arr[j + 1]; // hold h
                arr[j + 1] = arr[j]; // move j one spot to the right
                arr[j] = temp; // put h where j was
                index = j; // will place element right behind h
            }
            else
            {
                break;
            }
        }

        arr[index] = element; // place element
    }

    return arr;
}

module.exports = insertionSort;