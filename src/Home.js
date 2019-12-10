import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Keyboard,
} from 'react-native';
import {theme} from "./styles/theme";

import {SearchBar, Icon, ButtonGroup, Card, ListItem, Button} from 'react-native-elements';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			selectedIndex: 0,
			buttons: ['服饰', '电器', '3C数码', '文具', '生活用品'],
			goodList: [
				{gid:'1',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'2',info: '圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'3',info: '卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'4',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'5',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'6',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'7',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'8',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'9',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
				{gid:'10',info: '2019新款秋冬加绒加厚套头圆领卫衣女打底衫韩版潮学生宽松外套',fav:false},
			],
		};
		this.keyboardIsShow = false;
	}

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	updateSearch = search => {
		this.setState({search});
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
			<View style={[styles.container,theme.themeBgColor]}>
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
					<ScrollView style={{flex:1,}}>
						{goodList.map((gItem,index)=>{
							return(
								<Card
									key={gItem.gid}
									// title='HELLO WORLD'
									image={require('../images/goods1.png')}
									imageProps={{resizeMode:'contain'}}
								>
									<Text style={{marginBottom: 10}}>
										{gItem.info}
									</Text>
									<Button
										icon={<Icon name='ios-information-circle-outline' type='ionicon' color='#ffffff' size={20}/>}
										buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
										title=' 查看详情'
										onPress={() => {
											if (this.keyboardIsShow) {
												this.search.blur();
											} else {
												this.props.navigation.navigate('Detail',{goodItem:gItem,title: gItem.info});
											}
										}}
									/>
								</Card>
							)
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
