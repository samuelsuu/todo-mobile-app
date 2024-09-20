import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Created = () => {
  return (
    <View>
        <Button title='Created by Samuel SU' color={"#1064AB"}/>
    </View>
  )
}

export default Created

const styles = StyleSheet.create({
    create:{
        fontSize: 15,
        fontWeight: "400",
        paddingVertical: 5,
    }
})