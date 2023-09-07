import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { informed_moment } from "../../../utils/simplifyData"

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
            width: 125
        }
    })

    const [expenses, loadExpenses] = useState([])
    const [total_expenses, setTotalExpenses] = useState(0)

    useEffect((_) => {
        db.transaction(tx => {
            let select_expense_list = `
                SELECT 
                    E.ID, 
                    E.DESCRIPTION, 
                    E.VALUE, 
                    E.CREATED_DATE 
                FROM TB_EXPENSE E
                ORDER BY E.CREATED_DATE DESC
            `
            tx.executeSql(select_expense_list, [], (tx, result) => {
                if(result.rows) {
                    let build_expenses_list = []
                    let sum = 0

                    for (let i = 0; i < result.rows.length; i++) {
                        item = result.rows.item(i)

                        sum += item['VALUE']
                        build_expenses_list.push(
                            <View key={item['ID']} style = {styles.expense_wrapper}>
                                <Text style = {styles.description_row}>{item['DESCRIPTION']}</Text>
                                <Text style={styles.value_row}>{item['VALUE']}</Text>
                                <Text style={styles.date_row}>{informed_moment(item['CREATED_DATE'])}</Text>
                            </View>
                        )
                    }

                    loadExpenses(build_expenses_list)
                    setTotalExpenses(sum)
                }
            })
        })
    })
    
    return (<>
        <View style = {styles.expense_wrapper}>
            <Text style={styles.description_row}>Descrição</Text>
            <Text style={styles.value_row}>Valor</Text>
            <Text style={styles.date_row}>Informado</Text>
        </View>
        {expenses}
        <Text>Total: R$ {total_expenses}</Text>
    </>)
}

export default ExpenseList