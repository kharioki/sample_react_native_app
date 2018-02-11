import React from 'react';
import { AsyncStorage, StyleSheet, KeyboardAvoidingView,Alert, Text, TextInput, Switch, View, Image, TouchableOpacity } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../config/constants';

class Login extends React.Component {
    // _alert = (msg) => {
    //   Alert.alert(msg);
    // }

    constructor(props) {
        super(props);
        this.state = {
            login: true, //switch between login and register
            email: '',
            username: '',
            password: 'Password',
            registering: false
        };
    }

    _confirm = async () => {
        const { username, email, password } = this.state


        if (this.state.login) {
            const result = await this.props.signinUserMutation({
                variables: {
                    email,
                    password
                }
            })
            const id = result.data.signinUser.user.id
            const token = result.data.signinUser.token
            this._saveUserData(id, token)
        } else {
            const result = await this.props.createUserMutation({
                variables: {
                    username,
                    email,
                    password
                }
            })
            const id = result.data.signinUser.user.id
            const token = result.data.signinUser.token
            this._saveUserData(id, token)
        }

        this.onLogin();
    
    };

    onLogin = () => {
        this.props.navigation.navigate('Shipment');
    };

    // _saveUserData = (id, token) => {
    //     AsyncStorage.setItem(GC_USER_ID, id);
    //     AsyncStorage.setItem(GC_AUTH_TOKEN, token);
    // }
    

  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={10}  style={styles.container}>
        <View style={styles.loginContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../img/vm-logo.png')} />
        </View>
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                editable={ this.state.registering ? true : false }
                placeholder= { this.state.registering ? 'Enter username' : '' }
                keyboardType='email-address'
                returnKeyType='next'
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
            />
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder= 'Enter Email'
                keyboardType='email-address'
                returnKeyType='next'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input}
                returnKeyType='go'
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
            />
            <View flexDirection="row">
                <Text>New User </Text>
                <Switch 
                onValueChange={ (registering) => this.setState({ registering })} 
                value={ this.state.registering } 
                style={styles.columns}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onLogin}>
                <Text style={styles.buttonText}>{ this.state.registering ? 'REGISTER' : 'LOGIN' }</Text>
            </TouchableOpacity> 
        </View>
         
      </KeyboardAvoidingView>
    );
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
  formContainer: {
        padding: 20,
        marginBottom:20
  },
  logo: {
        position: 'absolute',
        width: 300,
        height: 100
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
  columns: {
        paddingLeft: 10,
        paddingRight: 10
  }
});


const CreateUser = gql`
    mutation createUser($email: String!, $password: String!, $username: String!) {
        createUser(
            username: $username,
            authProvider: {
                email: {
                    email: $email,
                    password: $password
                }
            }
        ){
            id
        }
         signinUser(
            email :{
            email: $email,
            password: $password
            }){
            token
            user{
            id
            }
        }
    }
`;

const LoginUser = gql`
    mutation signinUser($email: String!, $password: String!){
        signinUser(
            email :{
            email: $email,
            password: $password
            }){
            token
            user{
            id
            }
        }
    }
`;

export default compose(
    graphql(CreateUser, { name : 'createUserMutation' }),
    graphql(LoginUser, { name : 'signinUserMutation' })
)(Login)