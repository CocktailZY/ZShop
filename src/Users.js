import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon, Divider, Input, Button} from 'react-native-elements';

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: {
				username: 'admin',
				password: '123',
				phone: '13111111111',
				account: '100.00',
			},
			editorType: '',
			showEditor: false,
			money: '', //充值金额
		};
	}

	componentDidMount() {
		// TODO 请求用户个人信息
	}

	componentWillUnmount() {

	}

	_setEdit = (text) => {
		let tUsers = {...this.state.users};
		tUsers[this.state.editorType] = text;
		this.setState({
			users: tUsers,
		});
	};

	render() {
		const {username, password, phone, account} = this.state.users;
		let tp = '';
		if(this.state.editorType == 'username'){
			tp = username;
		}else if(this.state.editorType == 'password'){
			tp = password;
		}else if(this.state.editorType == 'phone'){
			tp = phone;
		}else{
			tp = account;
		}
		return (
			<View style={styles.container}>

				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showEditor}
					onRequestClose={() => {}}
				>
					<View style={{flex:1,backgroundColor:'rgba(0,0,0,0.6)',justifyContent:'center',alignItems:'center'}}>
						<View style={{width: '80%',height: 300,backgroundColor:'#ffffff'}}>
							<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
								<Input
									placeholder={tp}
									onChangeText={(text) => {
										this._setEdit(text);
									}}
									editable={this.state.editorType == 'account' ? false : true}
									underlineColorAndroid={this.state.editorType == 'account' ? 'transparent': '#d4d4d4'}
									keyboardType={this.state.editorType == 'phone' || this.state.editorType == 'account'? 'number-pad':'default'}
									value={tp}
								/>
								{this.state.editorType == 'account' ? (
									<Input
										placeholder={'充值金额'}
										onChangeText={(text) => {
											this.setState({
												money: text
											});
										}}
										keyboardType={'number-pad'}
										value={this.state.money}
									/>
								) : null}
								{this.state.editorType == 'account' ? (
									<View style={{marginTop:20,width:'95%',backgroundColor:'tomato'}}>
										<Button
											title="充值"
											onPress={() => {
												// TODO 修改个人信息
												// parseFloat(text).toFixed(2).toString()
											}}
										/>
									</View>
								) : null}
							</View>

							<View style={{
								width: '100%',
								height: 44,
								position: 'absolute',
								bottom: 0,
								flexDirection: 'row',
								backgroundColor: '#e67e22',
							}}>
								<TouchableOpacity
									style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
									onPress={()=>{
										this.setState({
											showEditor: false
										});
									}}
								>
									<Icon name={'retweet'} type='antdesign' size={22} color={'#ffffff'}/>
									<Text style={{color: '#ffffff'}}>{`  取消`}</Text>
								</TouchableOpacity>
								<View style={{width:1,backgroundColor:'#d4d4d4'}}/>
								<View style={{width: 1, backgroundColor: '#d4d4d4'}}/>
								<TouchableOpacity
									style={{flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
									onPress={() => {
										this.setState({
											showEditor: false
										},()=>{
											// TODO 修改个人信息
										});
									}}
								>
									<Icon name={'save'} type='antdesign' size={22} color={'#ffffff'}/>
									<Text style={{color: '#ffffff'}}>{`  保存修改`}</Text>
								</TouchableOpacity>

							</View>
						</View>
					</View>
				</Modal>

				<View style={{height: 50, flexDirection: 'row'}}>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<View style={{width:30,height:30,justifyContent:'center',alignItems:'center',borderRadius: 3,backgroundColor:'#53c5ff'}}>
							<Icon name={'idcard'} type='antdesign' size={24} color={'#ffffff'}/>
						</View>
					</View>
					<View style={{flex:1,justifyContent:'center'}}>
						<Text style={{fontSize: 18}}>{`登录用户：${username}`}</Text>
					</View>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<TouchableOpacity
							style={{width:30,height:30,justifyContent:'center',alignItems:'center'}}
							onPress={()=>{
								this.setState({
									editorType: 'username',
									showEditor: true
								});
							}}
						>
							<Icon name={'right'} type='antdesign' size={24} color={'#333333'}/>
						</TouchableOpacity>
					</View>
				</View>
				<Divider/>
				<View style={{height: 50, flexDirection: 'row'}}>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<View style={{width:30,height:30,justifyContent:'center',alignItems:'center',borderRadius: 3,backgroundColor:'#00d2c4'}}>
							<Icon name={'key'} type='antdesign' size={24} color={'#ffffff'}/>
						</View>
					</View>
					<View style={{flex:1,justifyContent:'center'}}>
						<Text style={{fontSize: 18}}>{`明文密码：${password}`}</Text>
					</View>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<TouchableOpacity
							style={{width:30,height:30,justifyContent:'center',alignItems:'center'}}
							onPress={()=>{
								this.setState({
									editorType: 'password',
									showEditor: true
								});
							}}
						>
							<Icon name={'right'} type='antdesign' size={24} color={'#333333'}/>
						</TouchableOpacity>
					</View>
				</View>
				<Divider/>
				<View style={{height: 50, flexDirection: 'row'}}>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<View style={{width:30,height:30,justifyContent:'center',alignItems:'center',borderRadius: 3,backgroundColor:'#ffbe76'}}>
							<Icon name={'phone'} type='antdesign' size={24} color={'#ffffff'}/>
						</View>
					</View>
					<View style={{flex:1,justifyContent:'center'}}>
						<Text style={{fontSize: 18}}>{`联系方式：${phone}`}</Text>
					</View>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<TouchableOpacity
							style={{width:30,height:30,justifyContent:'center',alignItems:'center'}}
							onPress={()=>{
								this.setState({
									editorType: 'phone',
									showEditor: true
								});
							}}
						>
							<Icon name={'right'} type='antdesign' size={24} color={'#333333'}/>
						</TouchableOpacity>
					</View>
				</View>
				<Divider/>
				<View style={{height: 50, flexDirection: 'row'}}>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<View style={{width:30,height:30,justifyContent:'center',alignItems:'center',borderRadius: 3,backgroundColor:'#9980FA'}}>
							<Icon name={'pay-circle-o1'} type='antdesign' size={24} color={'#ffffff'}/>
						</View>
					</View>
					<View style={{flex:1,justifyContent:'center'}}>
						<Text style={{fontSize: 18}}>{`账户余额：${account}`}</Text>
					</View>
					<View style={{width:50,height:50,justifyContent:'center',alignItems:'center'}}>
						<TouchableOpacity
							style={{width:30,height:30,justifyContent:'center',alignItems:'center'}}
							onPress={()=>{
								this.setState({
									editorType: 'account',
									showEditor: true
								});
							}}
						>
							<Icon name={'local-gas-station'} type='material' size={24} color={'#333333'}/>
						</TouchableOpacity>
					</View>
				</View>

				{/* 底部工具条 */}
				<View style={{
					width: '100%',
					height: 44,
					position: 'absolute',
					bottom: 0,
					flexDirection: 'row',
					backgroundColor: '#fb3444',
				}}>
					<TouchableOpacity
						style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
						onPress={() => {
							this.props.navigation.navigate('Login');
						}}
					>
						<Icon name={'logout'} type='antdesign' size={22} color={'#ffffff'}/>
						<Text style={{color: '#ffffff'}}>{`  退出登录`}</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},

});
