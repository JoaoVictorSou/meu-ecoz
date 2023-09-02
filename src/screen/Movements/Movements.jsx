import { Text, TextInput, Input } from "react-native";
import React from "react";
import MoneyInput from "../../componet/MoneyInput";
import { insert_expanse } from "../../utils/database";

const Movements = (props) => {
    const [money, onChangeText] = React.useState('0.00');
    const question = 'O que andou comprando?'

    return (<>
        <MoneyInput question = {question} value={money} onChangeText={onChangeText} />
    </>)
}

export default Movements