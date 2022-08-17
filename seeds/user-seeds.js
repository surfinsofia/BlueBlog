const User = require("../models/User")

const userData = [
    {
        user: 'surfinsofia',
        email: 'asofiae96@gmail.com',
        password: 'surfinsofia'
    },
    
];

// creates the above users all at once
const seedUser = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUser;