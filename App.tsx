import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface Props {
  vocabulary: String;
  definition: String;
};

export function Card(props: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.voc}>{props.vocabulary}</Text>
      <Text style={styles.def}>{props.definition}</Text>
    </View>
  );
}

const words = [["と思います", "猜想、覺得、認為"], ["覚える", "察覺"], ["Simulate", "模擬"]];

export default function App() {
  let cards = words.map( (word) => {
    return (
      <Card 
        key={word[0].toString()}
        vocabulary={word[0]}
        definition={word[1]}
      />
    );
  });

  return (
    <View style={styles.container}>
      {cards}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderColor: 'black',
    borderWidth: 3,
  },
  voc: {
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
  }, 
  def: {
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "center",
  },
});
