// get the digit in number 'num' at place 'digit'
function getDigit(num, digit) 
{
    // convert num to string
    const numString = num.toString();
    const index = numString.length - 1 - digit; // start at back, move left
    if (index < 0)
    {
        return 0; // out of bounds
    }
    else
    {
        return parseInt(numString[index]); // convert character back to int
    }
}

// return the number of digits in a number
function digitCount(num) 
{
    const numString = num.toString();
    return numString.length; // strings have a built-in length property
}

// return how many digits the longest number has
function mostDigits(arr) 
{
    if (arr.length <= 0)
    {
        return 0; // empty array, no digits
    }
    else
    {
        // use spread operator ... to turn array into individual arguments
        const m = Math.max(...arr);
        return digitCount(m); // just check the biggest number
    }
}

function radixSort(arr) 
{
    const digits = mostDigits(arr);

    // once for each digit in the longest number:
    for (let i = 0; i < digits; i++)
    {
        // found Array.from() syntax in Sorting Algorithms Explained Visually
        // for each element in an array of length 10 (digits 0 to 9):
        //     add a new array to the array
        const buckets = Array.from({ length: 10 }, () => []);

        // for each number's digit at place i:
        for (let j = 0; j < arr.length; j++)
        {
            const digit = getDigit(arr[j], i);
            // put that number into the corresponding bucket:
            buckets[digit].push(arr[j]);
        }
        // now they've all been placed in buckets
        // use Array.flat() to turn the 2d array into one long array in order
        arr = buckets.flat(); // elements have been sorted by this digit. continue
    }

    return arr;
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };