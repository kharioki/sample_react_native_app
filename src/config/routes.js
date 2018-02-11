import React from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import {StyleSheet, Image} from 'react-native';

import Welcome from '../containers/welcome';
import Login from '../auth/login';
import ShipmentDetails from '../components/shipmentDetails';
import ItemDetails from '../components/itemDetails';
import Reports from '../components/report';

export const Complete = StackNavigator({
    Report: {
        screen: Reports
    }
},{
    headerMode: 'none'
});

export const Next  = StackNavigator({
    Item: {
        screen: ItemDetails
    },
    Report: {
        screen: Complete
    }
});

export const Record = StackNavigator({
    Shipment: {
        screen: ShipmentDetails
    },
    Item: {
        screen: Next
    }
},{
    headerMode: 'none'
});

export const Root = StackNavigator({
    Login: {
        screen: Login
    },
    Shipment: {
        screen: Record
    }
},{
    headerMode: 'none'
});

export const Tabs = StackNavigator({
    Chowbase: {
        screen: Welcome
    },
    Login: {
        screen: Root
    }
}, {headerMode: 'none'});

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
    }
});
