import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage } from 'react-native';

import {Button, Divider, Input, Icon} from 'react-native-elements';
import Path, {Global} from './config';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	componentDidMount() {
		this._retrieveData();
	}

	_login = () => {
		let formData = new FormData();
		formData.append('username', this.state.username);
		formData.append('password', this.state.password);
		formData.append('roleId', 2);
		fetch(Path + 'users/login.do', {
			method: 'POST',
			body: formData
		}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('登录');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText);
				this._storeData(responseText.loginUser);
				Global.userId = responseText.loginUser.id;
				this.props.navigation.navigate('Index');
			} else {
				console.log('登录异常');
			}
		}).catch(error => {
			console.log('登录异常：' + error);
		});
	}

	_storeData = async (loginUser) => {
		try {
			await AsyncStorage.setItem('loginUser', JSON.stringify(loginUser));
		} catch (error) {
			// Error saving data
		}
	};

	_retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('loginUser');
			if (value !== null) {
				// We have data!!
				console.log(value);
				Global.userId = JSON.parse(value).id;
				this.props.navigation.navigate('Index');
			}
		} catch (error) {
			// Error retrieving data
		}
	};

	componentWillUnmount() {
	}

	render() {
		const {username, password} = this.state;
		return (
			<View style={styles.container}>
				<Icon name={'ios-flower'} type='ionicon' size={50} color={'#2089DC'}/>
				<Input
					placeholder='用户名'
					leftIcon={{type: 'font-awesome', name: 'user', color: '#2089DC'}}
					onChangeText={(text) => {
						this.setState({
							username: text,
						});
					}}
					value={username}
				/>
				<Input
					placeholder='密码'
					leftIcon={{type: 'font-awesome', name: 'lock', color: '#2089DC'}}
					secureTextEntry={true}
					onChangeText={(text) => {
						this.setState({
							password: text,
						});
					}}
					value={password}
				/>
				<View style={{marginTop:20,width:'95%',backgroundColor:'tomato'}}>
					<Button
						title="登录"
						onPress={() => {
							this._login();
						}}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E9E9E9',
	},

});
