import React, { useState, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import styles from '../styles/mainStyle';

interface wordsInterface {
    words: string[][];
    num: number;
    setNum: any;
};

function Card(props: wordsInterface) {
    function handleClick() {
        const newNum = (props.num + 1) % props.words.length;
        props.setNum(newNum);
    }

    return (
        <TouchableWithoutFeedback
        onPress={handleClick} 
        >
        <View style={styles.card}>
            <Text style={styles.voc}>{props.words[props.num][0]}</Text>
            <Text style={styles.def}>{props.words[props.num][1]}</Text>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default Card;