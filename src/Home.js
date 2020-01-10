import React, {Component} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from './styles/theme';

import {Button, Card, Icon, SearchBar} from 'react-native-elements';
import Path from './config';

let oldGoodList = [];
export default class Home extends Component {
	// static navigationOptions = ({navigation, screenProps}) => {
	// 	return ({
	// 		// title: '首页',
	// 		// headerBackImage:(
	// 		// 	<Icons name={'ios-arrow-back'} size={30} color={'#FFFFFF'}/>
	// 		// ),
	// 		headerLeft: (
	// 			<TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'tomato'}} onPress={()=>{
	// 				this.props.navigation.openDrawer();
	// 			}}>
	// 				<Icon name={'ios-menu'} type='ionicon' size={24}/>
	// 			</TouchableOpacity>
	// 		),
	// 	})
	// };
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			buttons: [],
			goodList: [],
		};
		this.keyboardIsShow = false;
	}

	componentDidMount() {
		this._getFlowerList();
		this._getFlowerTypeList();
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	_getFlowerList = () => {
		let url = Path + 'flower/listAll.do';
		console.log(url);
		fetch(Path + 'flower/listAll.do', {method: 'GET'}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('鲜花列表');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText.data);
				responseText.data.map((item, index) => {
					item.img = item.img.substring(3, item.img.length);
					console.log(item.img);
				});
				this.setState({
					goodList: responseText.data,
				}, () => {
					oldGoodList = [...this.state.goodList];
				});
			} else {
				console.log('获取鲜花列表异常');
			}
		}).catch(error => {
			console.log('获取鲜花列表异常：' + error);
		});
	};

	_getFlowerTypeList = () => {
		let url = Path + 'flowerType/listAll.do';
		console.log(url);
		fetch(Path + 'flowerType/listAll.do', {method: 'GET'}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('鲜花类型列表');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText.data);
				responseText.data.map((item, index) => {
					if (index === 0) {
						item['checked'] = true;
					} else {
						item['checked'] = false;
					}
				});
				this.setState({
					buttons: responseText.data,
				});
			} else {
				console.log('鲜花类型列表异常');
			}
		}).catch(error => {
			console.log('鲜花类型列表异常：' + error);
		});
	};

	updateSearch = search => {
		this.setState({search}, () => {
			// TODO 根据搜索条件搜索
			let newArr = this.state.goodList.filter(item => item.name.indexOf(search) != -1);
			this.setState({
				goodList: search == '' ? oldGoodList : newArr,
			});
		});
	};

	_toSearch = (id, name) => {
		let tBtns = [...this.state.buttons];
		tBtns.map((item, index) => {
			if (item.id === id) {
				item['checked'] = true;
			} else {
				item['checked'] = false;
			}
		});
		this.setState({search: name, buttons: tBtns}, () => {
			// TODO 根据搜索条件搜索
			let newArr = oldGoodList.filter(item => item.typeId === id);
			this.setState({
				goodList: newArr,
				search: '',
			});
		});
	};

	_keyboardDidShow = () => {
		this.keyboardIsShow = true;
	};

	_keyboardDidHide = () => {
		this.keyboardIsShow = false;
	};

	render() {
		const {search, buttons, selectedIndex, goodList} = this.state;
		return (
			<View style={[styles.container, theme.themeBgColor]}>
				{/* 搜索框 */}
				<SearchBar
					ref={search => this.search = search}
					placeholder="请输入搜索商品名称"
					onChangeText={this.updateSearch}
					searchIcon={() => <Icon name={'ios-search'} type='ionicon' size={20}/>}
					clearIcon={() => <Icon name={'ios-close-circle-outline'} type='ionicon' size={20} onPress={() => {
						this.search.clear();
					}}/>}
					inputStyle={theme.themeBgColor}
					inputContainerStyle={theme.themeBgColor}
					containerStyle={{
						borderWidth: 1,
						borderRadius: 5,
						height: 44,
						padding: 0,
						marginLeft: 15,
						marginTop: 15,
						marginRight: 15,
						marginBottom: 8,
					}}
					value={search}
				/>
				<View style={{flex: 1}}>
					<View style={{height: 30, marginLeft: 15, marginRight: 15, marginBottom: 5, flexWrap: 'wrap'}}>
						{this.state.buttons.map((typeItem, index) => {
							return (
								<TouchableOpacity
									key={index}
									style={{borderRadius: 4, margin: 5, padding: 5, backgroundColor: typeItem.checked ? '#2089DC' : '#7f8c8d'}}
									onPress={() => {
										this._toSearch(typeItem.id, typeItem.name);
									}}
								>
									<Text style={{color: '#ffffff'}}>{typeItem.name}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					<ScrollView style={{flex: 1}}>
						{goodList.map((gItem, index) => {
							return (
								<Card
									key={index}
									// title='HELLO WORLD'
									image={{uri: Path + gItem.img}}
									imageProps={{resizeMode: 'contain'}}
								>
									<Text style={{marginBottom: 10}} numberOfLines={1}>
										{gItem.describes}
									</Text>
									<Button
										icon={<Icon name='ios-information-circle-outline' type='ionicon' color='#ffffff' size={20}/>}
										buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
										title=' 查看详情'
										onPress={() => {
											if (this.keyboardIsShow) {
												this.search.blur();
											} else {
												this.props.navigation.navigate('Detail', {goodItem: gItem.id, title: gItem.name});
											}
										}}
									/>
								</Card>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
