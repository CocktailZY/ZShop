import React, {Component} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import {theme} from './styles/theme';

import {Button, ButtonGroup, Card, Icon, SearchBar} from 'react-native-elements';
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
			selectedIndex: 0,
			buttons: ['玫瑰', '牡丹', '桃花', '梨花', '仙人掌', '风信子'],
			goodList: [
				{gid: '1', info: '风信子极早花种，阿姆斯特丹（Amsterdam）花红色', fav: false},
				{gid: '2', info: '风信子早花种，安娜·玛丽（AnnaMarie）花粉红色', fav: false},
				{gid: '3', info: '风信子中花种，德比夫人（LadyDerby）', fav: false},
				{gid: '4', info: '风信子晚花种，吉普赛女王（GipsyQueen）花橙色', fav: false},
				{gid: '5', info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套', fav: false},
				{gid: '6', info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套', fav: false},
				{gid: '7', info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套', fav: false},
				{gid: '8', info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套', fav: false},
				{gid: '9', info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套', fav: false},
				{gid: '10', info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套', fav: false},
			],
		};
		this.keyboardIsShow = false;
	}

	componentDidMount() {
		this._getFlowerList();
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

	updateSearch = search => {
		this.setState({search}, () => {
			// TODO 根据搜索条件搜索
			let newArr = this.state.goodList.filter(item => item.info.indexOf(search) != -1);
			this.setState({
				goodList: search == '' ? oldGoodList : newArr,
			});
		});
	};

	updateIndex = (selectedIndex) => {
		this.setState({selectedIndex});
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
					<ButtonGroup
						onPress={this.updateIndex}
						selectedIndex={selectedIndex}
						buttons={buttons}
						containerStyle={{height: 30, marginLeft: 15, marginRight: 15}}
					/>
					<ScrollView style={{flex: 1}}>
						{goodList.map((gItem, index) => {
							return (
								<Card
									key={index}
									// title='HELLO WORLD'
									image={{uri: gItem.img}}
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
