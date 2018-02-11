import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { items } from '../config/data';

const BoxQuery = gql`
    query shipments($shipment: ShipmentFilter) {
      allShipments(filter:$shipment){
        id
        awbNumber
        boxes{
          id
          actualWeight
          reportedWeight
          weightDifference
          isStandard
          boxSize
          isSealed
          remarks
        }
        _boxesMeta{
          count
        }
      }
    }
`;


class Reports extends Component {
  // _alert = (value) => {
  //   Alert.alert(value);
  // }

  static navigationOptions = ({ navigation }) => ({
        headerLeft: <Image source={require('../img/vm-logo.png')} style={{
            width: 150,
            height: 60,
            marginLeft: 20,
        }}/>,
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Shipment')} style={{marginRight: 20}}><Text style={{color: '#08ae9e'}}>Go back home</Text></TouchableOpacity>
    });

    constructor(props) {
        super(props);

    }

     onComplete = () => {
         this.props.navigation.navigate('Shipment');
     };


  render() { 
    console.log(this.props);
    console.log(this.props.data);

    let shipmentData = this.props.data
                ? this.props.data.allShipments
                : null;
   

    if (shipmentData) {   
     // lets call the items

     let d = shipmentData[0].boxes;

    // Declare arrays
    const tableHead = ['Id', 'Actual Weight', 'Reported Weight', 'Weight Difference', 'Standard', 'Sealed'];
    let tableData = [];
    //loop
    for (var i =0; i < d.length; i++) {
        var eachItem = [];
        eachItem.push(d[i].id)
        eachItem.push(d[i].actualWeight)
        eachItem.push(d[i].reportedWeight)
        eachItem.push(d[i].weightDifference)
        if(d[i].isStandard === true ){
            eachItem.push('yes')
        } else {
            eachItem.push('no')
        }
        if(d[i].isSealed === true ){
            eachItem.push('yes')
        } else {
            eachItem.push('no')
        }
        tableData.push(eachItem);
    }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.loginContainer}>
              <Text style={styles.text}>Shipment number: 33256</Text>
              <Text style={styles.text}>Awb number:  123-345-6789</Text>
              <Text style={styles.text}>Recorded on: </Text>
          </View>
          <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[2, 1.5, 2, 2, 2, 1.5]}/>
            <Rows data={tableData} style={styles.row} textStyle={styles.text} flexArr={[2, 1.5, 2, 2, 2, 1.5]}/>
          </Table>
        </ScrollView>
      )
    } else {
        return (
          <ScrollView style={styles.container}>
          <View style={styles.loginContainer}>
              <Text style={styles.text}>Loading...</Text>
          </View>
        </ScrollView>
        )
    }
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
  buttonContainer:{
        backgroundColor: '#08ae9e',
        paddingVertical: 15
  },
  buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
  },
  table: { marginTop: 10, marginLeft: 10 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5, textAlign: 'center' },
  row: { height: 30 },
  btn: { width: 58, height: 18, backgroundColor: '#ccc', marginLeft: 15 },
  btnText: { textAlign: 'center', color: '#fff' }
});



export default graphql(BoxQuery, {
  options: ({shipment}) => ({ variables: { 
      "shipment" : {
        "shipmentNumber": "yt5678"
      }
    }
  })
})(Reports);
