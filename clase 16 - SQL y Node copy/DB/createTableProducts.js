const { options } = require('./mysql')
const knex = require('knex')(options)

knex.schema
    .createTable('products', table => {
        table.increments('id')
        table.string('title', 128)
        table.double('price')
        table.string('thumbnail', 2048)
    })
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => knex.destroy())
