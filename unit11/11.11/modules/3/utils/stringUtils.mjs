export function capitalize(str)
{
    let first = str[0];
    let newString = "";
    first = first.toUpperCase();
    newString += first;
    if (str.length > 1) {
        newString += str.substring(1, str.length);
    }
    return newString;
}