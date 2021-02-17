import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../utils';

export default function ReloadIcon({load}) {

    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={reloadIconName} size={24} color={colors.PRIMARY_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 30,
        right: 20
    }
})
