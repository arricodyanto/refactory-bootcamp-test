const fs = require('fs')

const loadUsers = () => {
    const file = fs.readFileSync('data/users.json', 'utf-8');
    const users = JSON.parse(file);
    return users
}

const saveUser = (users) => {
    fs.writeFileSync('data/users.json', JSON.stringify(users));
}

const addUser = (user) => {
    var idguser = req.user.id
    const users = loadUsers();
    users.push(user);
    saveUser(users);
}

const findID = (id) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === id)
    return user;
}


// // connect db
// const { Client } = require('pg')
// const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'skilltest',
//     user: 'postgres',
//     password: 'password',
// })
// client.connect()

// const loadContacts = () => {
//     client.query('SELECT * from users', (err, res) => {
//         var rowbro = JSON.parse(res.rows)
//         return rowbro
//     })
// }

module.exports = {
    loadUsers,
    saveUser,
    addUser,
    findID
}