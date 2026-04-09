import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App(): React.JSX.Element {
  const [result, setResult] = useState('Running...');

  useEffect(function () {
    try {
      throw new Error('catch-binding-bug');
    } catch (error) {
      console.log('inside catch:', (error as Error).message);
      setTimeout(function () {
        try {
          console.log('deferred:', (error as Error).message);
          setResult('BUG NOT REPRODUCED - catch binding accessible in setTimeout');
        } catch (e) {
          console.error('ReferenceError caught:', e);
          setResult('BUG REPRODUCED - ' + String(e));
        }
      }, 100);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hermes Catch Binding Bug</Text>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  result: { fontSize: 16, textAlign: 'center' },
});
