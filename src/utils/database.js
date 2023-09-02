sqlite3 = require("sqlite3")

function begin() {
    const db = new sqlite3.Database('./src/data/ownerWarehouse.db');
    
    const create_tb_expanse = `
        CREATE TABLE IF NOT EXISTS TB_EXPANSE (
            ID INTEGER PRIMARY KEY, 
            DESCRIPTION VARCHAR(500) NOT NULL,
            VALUE REAL NOT NULL,
            TYPE INTEGER(2)
        );
    `

    db.run(create_tb_expanse)

    return db
}

function insert_expanse(connection, description, value, type) {
    const insert_tb_expanse = `
        INSERT INTO TB_EXPANSE (
            DESCRIPTION,
            VALUE,
            TYPE
        ) VALUES (
            '${description}',
            ${value},
            '${type}'
        );
    `

    connection.run(insert_tb_expanse)
    
    connection.each("SELECT ID, DESCRIPTION, VALUE, TYPE FROM TB_EXPANSE", (err, row) => {
        console.log(row)
    })
}

const connection = begin()

export default connection
export {insert_expanse}