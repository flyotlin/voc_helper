import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Provider as PaperProvider, Appbar, Dialog, Portal, Button, Title } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

interface VocBankDialogInterface {
    visible: boolean;
    fileArray: string[];
    hideDialog: any;
    setWords: any;
};

function VocBankDialog(props: VocBankDialogInterface) {
    const fileArray = props.fileArray;
    let newWords: string[] = ["1"];

    async function chooseButtonHandler(file: string) {
        const uri = FileSystem.documentDirectory + file;
        let result = await FileSystem.readAsStringAsync(uri);
        props.setWords(JSON.parse(result));
        props.hideDialog();
    }

    function deleteButtonHandler(file: string) {
        const uri = FileSystem.documentDirectory + file;
        FileSystem.deleteAsync(uri, {idempotent: true});
        props.hideDialog();
    }


    let files = fileArray.map((fileName) => {
        return (
        <Dialog.Actions key={fileName}>
            <Button onPress={() => {chooseButtonHandler(fileName)}}>{fileName}</Button>
            <Button onPress={() => {deleteButtonHandler(fileName)}}>Delete</Button>
        </Dialog.Actions>
        );
        
    });

    return (
        <Portal>
        <Dialog
            visible={props.visible}
            onDismiss={props.hideDialog}
        >
            <Title style={{textAlign: "center"}}>The Files you have imported:  </Title>
            {files}
        </Dialog>
        </Portal>
    );
}

export default VocBankDialog;