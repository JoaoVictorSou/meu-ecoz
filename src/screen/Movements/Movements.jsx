import { TextInput, Button } from "react-native";
import React, { useState } from "react";
import MoneyInput from "../../components/MoneyInput";
import { insert_expense, delete_all_expenses, begin } from "../../utils/database";
import ExpenseList from "./components/ExpenseList";

const db = begin()

const Movements = (_) => {
    const [money, onChangeText] = useState('0.00');
    const [description, onChangeDescription] = useState('')
    const question = 'O que andou comprando?'

    return (<>
        <MoneyInput question = {question} value={money} onChangeText={onChangeText} />
        <TextInput value={description} onChangeText={onChangeDescription} />
        <Button 
            title = 'Informar'
            onPress={_ => {
                insert_expense(db, description, money, 1)
            }}
        />
        <Button
            title = 'Limpar base.'
            onPress = {_ => {
                delete_all_expenses(db)
            }}
        />
        <ExpenseList db = {db} />
    </>)
}

export default Movements