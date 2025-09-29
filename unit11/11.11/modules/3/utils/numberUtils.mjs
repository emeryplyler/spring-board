export function diceRoll(numSides, numDice)
{
    let sum = 0;
    for (let i = 0; i < numDice; i++)
    {
        sum += Math.ceil(Math.random() * numSides);
    }
    return sum;
}

export function power(num, power)
{
    return Math.pow(num, power);
}

export function getFavNum()
{
    return 9;
}
