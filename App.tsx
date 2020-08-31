import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Provider as PaperProvider, Appbar, Menu, Button } from 'react-native-paper';
import styles from './styles/mainStyle';
import testVocImport from './voc/testVoc.json';
import EnglishVocImport from './voc/EnglishVoc.json';

const testVoc = testVocImport;
const EnglishVoc = EnglishVocImport;

interface wordsInterface {
  words: string[][];
};

function Card(props: wordsInterface) {
  const [num, setNum] = React.useState(0);

  function handleClick() {
    const newNum = (num + 1) % props.words.length;
    setNum(newNum);
  }

  return (
    <TouchableWithoutFeedback
      onPress={handleClick} >
      <View style={styles.card}>
        <Text style={styles.voc}>{props.words[num][0]}</Text>
        <Text style={styles.def}>{props.words[num][1]}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default function App() {
  const [words, setWords] = React.useState(testVoc);
  const [visible, setVisible] = React.useState(false);

  function changeVoc(prop :string[][]) {
    setWords(prop);
    setVisible(false);
  }

  function openMenu() {
    setVisible(true);
  }

  function closeMenu() {
    setVisible(false);
  }

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="VOC HELPER" />
        <Menu
          style={{paddingTop: 50}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="file-plus-outline" onPress={openMenu} />}
        >
          <Menu.Item onPress={() => {changeVoc(testVoc)}} title="testVoc" />
          <Menu.Item onPress={() => {changeVoc(EnglishVoc)}} title="EnglishVoc" />
        </Menu>

      </Appbar.Header>
      <View style={styles.container}>
        <Card words={words} />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
    

  );
}

