import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"

const ExpenseList = ({ db }) => {
    const styles = StyleSheet.create({
        expense_wrapper: {
            flexDirection: "row",
            padding: 5
        },
        description_row: {
            width: 130
        },
        value_row: {
            width: 100
        },
        date_row: {
            width: 110
        }
    })

    const [expenses, loadExpenses] = useState([])
    useEffect((_) => {
        db.transaction(tx => {
            let select_expense_list = "SELECT ID, DESCRIPTION, VALUE, CREATED_DATE FROM TB_EXPENSE"
            tx.executeSql(select_expense_list, [], (tx, result) => {
                if(result.rows) {
                    let build_expenses_list = []
                    
                    for (let i = 0; i < result.rows.length; i++) {
                        item = result.rows.item(i)
                        build_expenses_list.push(
                            <View key={item['ID']} style = {styles.expense_wrapper}>
                                <Text style = {styles.description_row}>{item['DESCRIPTION']}</Text>
                                <Text style={styles.value_row}>{item['VALUE']}</Text>
                                <Text style={styles.date_row}>{item['CREATED_DATE']}</Text>
                            </View>
                        )
                    }

                    loadExpenses(build_expenses_list)
                }
            })
        })
    })
    
    return (<>
        <View key={item['ID']} style = {styles.expense_wrapper}>
            <Text style={styles.description_row}>Descrição</Text>
            <Text style={styles.value_row}>Valor</Text>
            <Text style={styles.date_row}>Informado</Text>
        </View>
        {expenses}
    </>)
}

export default ExpenseList