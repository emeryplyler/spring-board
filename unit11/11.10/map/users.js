const users = [
	{firstName: "Alice", lastName: "Johnson", points: 120},
	{firstName: "Bob", lastName: "Smith", points: 99},
	{firstName: "Charlie", lastName: "Brown", points: 180}
];

// return a new array (of objects) with properties fullName, membershipStatus
const members = users.map(function (user) 
{
    let memberStatus = "Standard";
    if (user.points > 100)
    {
        memberStatus = "Premium";
    }
    let member = {
        fullName: user.firstName + " " + user.lastName,
        membershipStatus: memberStatus // could have used ternary operator 
    };
    return member;
});

console.log(members);
