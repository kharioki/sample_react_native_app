import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Text, TextInput, View, Image, Switch, TouchableOpacity } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'

const getShipment = gql`
    query shipments($shipment: ShipmentFilter) {
        allShipments(filter:$shipment){
            id
        }
    }
`;
const addBoxItem = gql`
    mutation addBox($actual : Float!, $reported: Float!,$diff: Float!, $standard: Boolean!, $sealed: Boolean!, $size: String, $remarks: String, $shipmentId: ID!) {
        createBox (actualWeight : $actual, reportedWeight: $reported, weightDifference: $diff, isSealed: $sealed,  isStandard : $standard, boxSize : $size, remarks : $remarks, shipmentId : $shipmentId){
            id
            actualWeight
            reportedWeight
            weightDifference
            isStandard
            boxSize
            isSealed
            remarks
            shipment{
                id
            }
        }
    }
`;

class ItemDetails extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: <Image source={require('../img/vm-logo.png')} style={{
            width: 150,
            height: 60,
            marginLeft: 20,
        }}/>,
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Report')} style={{marginRight: 20}}><Text style={{color: '#08ae9e'}}>Done</Text></TouchableOpacity>
    });

    onComplete = () => {
        this.props.navigation.navigate('Report');
    };

    onStart = () => {
        this.props.navigation.navigate('Item');
    };

    constructor(props) {
        super(props);
        this.state = { 
            actual: 0,
            reported: 0,
            diff: 0,
            standard: true,
            size: '',
            sealed: true,
            remarks: '',
            shipmentId: ''
        };
        //execute the submit function
        this.execute= () => {
            this.handlePost();
        }
    }


  render() {

    console.log(this.props);
    console.log(this.props.navigation.state.params);
    let sNumber = this.props.navigation.state.params.sNumber;

    console.log(sNumber);

    if(this.props && this.props.data){

      let sID = this.props.data.allShipments
              ? this.props.data.allShipments[0].id
              : null;

            console.log(sID);     
    }

        

    return (
      <KeyboardAvoidingView keyboardVerticalOffset={10} behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
            <Text style={styles.title}>Weigh and enter item details: </Text>
            <Text style={styles.text}>Shipment number: {sNumber}</Text>
        </View>
        <View style={styles.formContainer}>
            <View flexDirection="row">
                <View flexDirection="column" style={styles.columns}>
                    <Text>Actual Weight</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        returnKeyType='next'
                        onChange={(actual) => this.setState({actual})}
                    />
                </View>
                
                <View flexDirection="column" style={styles.columns}>
                    <Text>Reported Weight</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        returnKeyType='next'
                        onChange={(reported) => this.setState({reported})}
                    />
                </View>
                
                <View flexDirection="column" style={styles.columns}>
                    <Text>Difference</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        returnKeyType='next'
                        onChange={(diff) => this.setState({diff})}
                    />
                </View>
                
            </View>
            <View flexDirection="column">
                <View flexDirection="row">
                    <Text>Box Size (is standard) </Text>
                    <Switch 
                    onValueChange={ (standard) => this.setState({ standard })} 
                    value={ this.state.standard } 
                    style={styles.columns}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    editable={ this.state.standard ? false : true }
                    keyboardType='email-address'
                    returnKeyType='next'
                    onChangeText={(size) => this.setState({size})}
                    value={this.state.size}
                />
            </View>
            
            <View flexDirection="row">
                <Text>Sealed (box is sealed) </Text>
                <Switch 
                onValueChange={ (sealed) => this.setState({ sealed })} 
                value={ this.state.sealed } 
                style={styles.columns}
                /> 
            </View>
            <Text>Remarks</Text>
            <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    multiline={true}
                    numberOfLines={2}
                    returnKeyType='next'
                    onChangeText={(remarks) => this.setState({remarks})}
                    value={this.state.remarks}
                />
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.execute}>
                <Text style={styles.buttonText}>Record</Text>
            </TouchableOpacity> 
        </View>
      </KeyboardAvoidingView>
    );
  }
    // submit function
  handlePost = async () => {
        const { actual, reported, diff, standard, size, sealed, remarks, shipmentId } = this.state;
        await this.props.mutate({variables: {actual, reported, diff, standard, size, sealed, remarks, shipmentId}})
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
  },
  loginContainer:{
        alignItems: 'center',
        marginTop: 10
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
        marginBottom:10
  },
  columns: {
      paddingLeft: 10,
      paddingRight: 10
  }
});


export default compose(
    graphql(getShipment, {
            options: ({shipment}, ownProps) => ({ 
                variables: { 
                shipment : {
                    shipmentNumber: 17
                }
            }
        })
    }),
    graphql(addBoxItem)
)(ItemDetails);