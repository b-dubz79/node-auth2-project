const db = require('../database/dbConfig.js')

module.exports = {
    
    find,
    findBy,
    add,
    findById
}

function find() {
    return db('users').select('id', 'username', 'password', 'department')
}

function findBy(filter) {
    return db('users').where(filter);
}

// why is this async and the others aren't?
async function add(user) {
    const [id] = await db('users').insert(user, 'id'); //what do insert's arguments do and what does [id] mean?

    return findById(id);// is id the same as "saved" in the auth-router?
}

function findById(id) {
    return db('users').where({ id }).first();
}