import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Welcome extends React.Component {

    onStart = () => {
        this.props.navigation.navigate('Login');
    };

  render() {
    return (
      <View style={styles.container}>
        <Text>WELCOME</Text>
        <Button
        onPress={this.onStart}
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});