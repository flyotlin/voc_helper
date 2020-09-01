import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import Card from './src/Card';
import VocBankDialog from './src/VocBankDialog';

import styles from './styles/mainStyle';
import testVocImport from './voc/testVoc.json';


const defaultVoc = testVocImport;

export default function App() {
  const [fileArray, setFileArray] = React.useState([""]);
  const [words, setWords] = React.useState(defaultVoc);
  const [num, setNum] = React.useState(0);
  const [dialogVisible, setDialogVisible] = React.useState(false);

  async function openDocumentPicker() {
    let result = await DocumentPicker.getDocumentAsync();
    let from = result.uri;
    let to = FileSystem.documentDirectory + result.name;
    let option = {from, to};
    if (from != (null || undefined) && to != (null || undefined)) {
      FileSystem.copyAsync(option);
    }
  }

  async function getDirectoryFilesArray() {
    if (FileSystem.documentDirectory === null) {
      return;
    }
    let res = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    setFileArray(res);
  }

  function handleWordChange(newWords: string[][]) {
    setNum(0);
    setWords(newWords);
  }

  function showDialog() {
    getDirectoryFilesArray();
    setDialogVisible(true);
  }

  function hideDialog() {
    setDialogVisible(false);
  }

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="VOC HELPER" />
        <Appbar.Action icon="select" onPress={showDialog} />
        <VocBankDialog
          visible={dialogVisible}
          fileArray={fileArray}
          setWords={handleWordChange}
          hideDialog={hideDialog}
        />
        <Appbar.Action icon="import" onPress={openDocumentPicker} />

      </Appbar.Header>
      <View style={styles.container}>
        <Card 
          words={words} 
          num={num}
          setNum={setNum}
        />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

