const accounts = [
    { id: 1, owner: "Alice", balance: 500 },
    { id: 2, owner: "Bob", balance: 300 }
];

function getAccountById(id)
{
    if (typeof (id) !== "number")
    {
        throw new Error("Account ID must be a number");
    }

    for (const account of accounts)
    {
        if (account.id === id)
        {
            return account;
        }
    }
}

function createAccount(newAccountId, newAccountOwner)
{
    if (getAccountById(newAccountId) !== undefined)
    {
        throw new Error("Account ID already in use");
    }

    else if (typeof (newAccountId) !== "number" || newAccountId <= 0)
    {
        throw new Error("Account ID invalid: must be a positive integer");
    }

    else if (typeof (newAccountOwner) !== "string" || newAccountOwner.length < 1 || newAccountOwner.trim().length < 1)
    {
        throw new Error("Account Owner invalid");
    }

    accounts.push(
        {
            id: newAccountId,
            owner: newAccountOwner,
            balance: "0"
        }
    );
}

function depositMoney(accountId, amount)
{
    const account = getAccountById(accountId);

    if (!account)
    {
        throw new Error("Account not found");
    }

    else if (typeof (amount) !== "number" || amount <= 0 || !Number.isFinite(amount))
    {
        throw new Error("Deposit amount invalid: must be a positive, finite number");
    }

    account.balance += amount;
}

function withdrawMoney(accountId, amount)
{
    const account = getAccountById(accountId);

    if (!account)
    {
        throw new Error("Account not found");
    }

    if (typeof (amount) !== "number" || amount <= 0 || !Number.isFinite(amount))
    {
        throw new Error("Withdraw amount invalid: must be a positive, finite number");
    }

    else if (account.balance < amount)
    {
        throw new Error("Withdraw amount is higher than balance");
    }

    account.balance -= amount;
}

function transferMoney(fromAccountId, toAccountId, amount)
{
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);

    if (!fromAccount)
    {
        throw new Error("Source account not found.");
    }

    else if (!toAccount)
    {
        throw new Error("Recipient account not found.");
    }

    if (!Number.isFinite(amount) || amount < 0)
    {
        throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
    }

    if (fromAccount.balance < amount)
    {
        throw new Error("Transfer amount higher than source account balance");
    }

    // withdrawMoney(fromAccountId, amount);
    // depositMoney(toAccountId, amount);

    fromAccount.balance -= amount;
    toAccount.balance += amount;
}


// Hints:

// console.log(getAccountById("1"));
console.log(getAccountById(1));

// createAccount(1, "Alice");
// createAccount("3", "Charlie");
// createAccount(-3, "Charlie");
// createAccount(3, ["Charlie"]);
// createAccount(3, "");
// createAccount(3, "  ");
createAccount(3, "Charlie");

// depositMoney(1, "300")
// depositMoney(1, -300)
// depositMoney(1, 0)
// depositMoney(1, Infinity)
depositMoney(1, 40);
// depositMoney(4, 100)

// withdrawMoney(1, -100)
// withdrawMoney(1, 0)
withdrawMoney(1, 501);

// transferMoney(1, 4, 100)
// transferMoney(1, 2, 501);
transferMoney(1, 2, 10);

console.log(getAccountById(1));

