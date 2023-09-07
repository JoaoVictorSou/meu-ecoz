import SQLite from 'react-native-sqlite-storage';
import { get_now_datetime } from './simplifyData';

function begin() {
    const create_tb_expanse = `
    CREATE TABLE IF NOT EXISTS TB_EXPENSE (
        ID INTEGER PRIMARY KEY, 
        DESCRIPTION VARCHAR(500) NOT NULL,
        VALUE REAL NOT NULL,
        TYPE INTEGER(2),
        CREATED_DATE DATE NOT NULL
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

function insert_expense(db, description, value, type) {
    if(description && value != 0) {
        const insert_tb_expense = `
            INSERT INTO TB_EXPENSE (
                DESCRIPTION,
                VALUE,
                TYPE,
                CREATED_DATE
            ) VALUES (
                '${description}',
                ${value},
                ${type},
                '${get_now_datetime()}'
            );
        `
    
        db.transaction(tx => {
            tx.executeSql(    
                insert_tb_expense,
                [],
                (_) => {
                    
                })
        })
    }
}

export {insert_expense, begin}