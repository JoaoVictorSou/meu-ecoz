import SQLite from 'react-native-sqlite-storage';

function begin() {
    const create_tb_expanse = `
    CREATE TABLE IF NOT EXISTS TB_EXPANSE (
        ID INTEGER PRIMARY KEY, 
        DESCRIPTION VARCHAR(500) NOT NULL,
        VALUE REAL NOT NULL,
        TYPE INTEGER(2)
    );
    `
    const db = new SQLite.openDatabase(
        {name: 'ownerWarehouse.db', location: 'default'},
        (_) => {
            db.transaction(tx => {
                tx.executeSql(
                    create_tb_expanse,
                    [],
                    (tx, results) => {
                        console.log('Database connection established.')
                    }
                )
            })
        },
        (_) => {console.error('error')}
    )

    return db
}

function insert_expanse(db, description, value, type) {
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

    db.transaction(tx => {
        tx.executeSql(    
            insert_tb_expanse,
            [],
            (_) => {
                tx.executeSql("SELECT ID, DESCRIPTION, VALUE, TYPE FROM TB_EXPANSE", [], (tx, result) => console.log(result.rows.item(1)))
            })
    })
}

export {insert_expanse, begin}