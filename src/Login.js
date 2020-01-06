import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Divider, Input, Icon} from 'react-native-elements';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	componentDidMount() {

	}

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
							this.props.navigation.navigate('Index');
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
