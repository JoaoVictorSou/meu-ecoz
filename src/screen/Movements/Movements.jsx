import { Text, TextInput, Input, Button, View } from "react-native";
import React, {useEffect} from "react";
import MoneyInput from "../../components/MoneyInput";
import { insert_expense, begin } from "../../utils/database";

const db = begin()

const Movements = (props) => {
    const [money, onChangeText] = React.useState('0.00');
    const [expenses, loadExpenses] = React.useState([])
    const [description, onChangeDescription] = React.useState('')
    const question = 'O que andou comprando?'

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM TB_EXPENSE", [], (tx, result) => {
                if(result.rows) {
                    let build_expenses_list = []
                    
                    for (let i = 0; i < result.rows.length; i++) {
                        item = result.rows.item(i)
            
                        build_expenses_list.push(
                            <View key={item['ID']}>
                                <Text>{item['DESCRIPTION']}</Text>
                                <Text>{item['VALUE']}</Text>
                                <Text>{item['TYPE']}</Text>
                            </View>
                        )
                    }
                    
                    loadExpenses(build_expenses_list)
                }
            })
        })
    })

    return (<>
        <MoneyInput question = {question} value={money} onChangeText={onChangeText} />
        <TextInput value={description} onChangeText={onChangeDescription} />
        <Button 
            title = 'Informar'
            onPress={_ => {
                insert_expense(db, description, money, 1)
            }}
        />
        {expenses}
    </>)
}

export default Movements