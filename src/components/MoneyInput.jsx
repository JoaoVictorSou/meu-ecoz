import { TextInput, Text, View, StyleSheet, Dimensions } from "react-native";
import { scales } from "../utils/screen"

const width = Dimensions.get('screen').width

const MoneyInput = (props) => {
    
    function changeMoneyValue(value) {
        if (!isNaN(value)) {
            props.onChangeText(value)
        }
    }
    
    return (
        <View style = {styles.wrapper_money_input}>
            <Text style = {styles.presentation}>{props.question}</Text>
            <View style={styles.collection_area}>
                <Text style={styles.sign}>R$</Text>
                <TextInput value={props.value} onChangeText={changeMoneyValue} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper_money_input: {
        marginTop: scales(width, 7),
        padding: scales(width, 2)
    },
    presentation: {
        fontSize: scales(width, 8)
    },
    collection_area: {
        flexDirection: 'row',
    },
    sign: {
        padding: scales(width, 7),
        fontSize: scales(width, 7),
    },

})

export default MoneyInput