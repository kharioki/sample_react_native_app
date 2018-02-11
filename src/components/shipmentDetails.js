import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ShipmentDetails extends React.Component {

    onStart = () => {
        this.props.navigation.navigate('Item', { sNumber: this.state.sNumber});
    };
    

    constructor(props) {
        super(props);
        this.state = { 
            sNumber: '',
            awb: '',
            tw: 0
        };
        // execute the submit function
        this.execute = () => {
            this.handlePost();
            this.onStart();
        }
    }

  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={10} behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../img/vm-logo.png')} />
            <Text style={styles.title}>Enter Shipment details: </Text>
        </View>
        <View style={styles.formContainer}>
            <Text>Shipment Number</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                onChangeText={(sNumber) => this.setState({sNumber})}
                value={ this.state.sNumber }
            />
            <Text>AWB Number</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                onChangeText={(awb) => this.setState({awb})}
                value={ this.state.awb }
            />
            <View flexDirection="row">
            <Text>Total weight (in Kgs)</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                returnKeyType='next'
                onChange={(tw) => this.setState({tw})}
            />
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.execute}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity> 
        </View>
      </KeyboardAvoidingView>
    );
  }
    //submit function
  handlePost = async () => {
        const {awb, sNumber, tw} = this.state
        await this.props.mutate({variables: {awb, sNumber, tw}})
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
  },
  loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
  },
  logo: {
        position: 'relative',
        width: 300,
        height: 100
  },
  formContainer: {
        padding: 20,
        marginBottom:20
  },
  input:{
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        color: 'black'
  },
  buttonContainer:{
        backgroundColor: '#08ae9e',
        paddingVertical: 15
  },
  buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
  },
  title: {
        color: '#08ae9e',
        textAlign: 'center',
  }
});

const addShipment = gql `
    mutation addShipment($awb : String!, $sNumber : String!, $tw: Float! ) {
            createShipment (awbNumber : $awb, shipmentNumber: $sNumber, totalWeight: $tw){
                id
                awbNumber
                shipmentNumber
                totalWeight
            }
        }
`;

export default graphql(addShipment)(ShipmentDetails);