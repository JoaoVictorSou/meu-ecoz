import { Text, TextInput, Input, Button } from "react-native";
import React from "react";
import MoneyInput from "../../componet/MoneyInput";
import { insert_expanse, begin } from "../../utils/database";

const Movements = (props) => {
    const [money, onChangeText] = React.useState('0.00');
    const question = 'O que andou comprando?'
    const db = begin()
    return (<>
        <MoneyInput question = {question} value={money} onChangeText={onChangeText} />
        <Button 
            title = 'Pra cima deles'
            onPress={_ => {
                insert_expanse(db, 'Teste', money, 'V')
                console.log(money)
            }}
        />
    </>)
}

export default Movements