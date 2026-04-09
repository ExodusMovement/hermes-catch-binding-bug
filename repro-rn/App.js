import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  useEffect(function () {
    try {
      throw new Error('catch-binding-bug');
    } catch (error) {
      console.log('inside catch:', error.message); // works
      setTimeout(function () {
        console.log('deferred:', error.message); // ReferenceError: Property 'error' doesn't exist
      }, 100);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Check Metro console for ReferenceError</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
