import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import { colors } from '../utils'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherDetails({ currentWeather }) {

    const {
        main: {feels_like, humidity}
    } = currentWeather;

    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={styles.weatherDetailsBox}>
                    <Text>{feels_like}</Text>
                </View>
                <View style={styles.weatherDetailsBox}>
                    <Text>{humidity}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    weatherDetailsBox:{
        flex: 1,
        padding: 20
    }
})
