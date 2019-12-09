import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Keyboard
} from 'react-native';

import {SearchBar,Icon,ButtonGroup} from 'react-native-elements';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			selectedIndex: 0,
			buttons: ['Hello', 'World', 'Buttons']
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
		this.setState({selectedIndex})
	};

	_keyboardDidShow = () => {
		this.keyboardIsShow = true;
	};

	_keyboardDidHide = () => {
		this.keyboardIsShow = false;
	};

	render() {
		const {search,buttons,selectedIndex} = this.state;
		return (
				<View style={styles.container}>
					{/* 搜索框 */}
					<SearchBar
						ref={search => this.search = search}
						placeholder="请输入搜索商品名称"
						onChangeText={this.updateSearch}
						searchIcon={() => <Icon name={'ios-search'} type='ionicon' size={20}/>}
						clearIcon={() => <Icon name={'ios-close-circle-outline'} type='ionicon' size={20} onPress={()=>{
							this.search.clear();
						}}/>}
						inputStyle={{backgroundColor: '#ffffff'}}
						inputContainerStyle={{backgroundColor: '#ffffff'}}
						containerStyle={{
							borderWidth: 1,
							borderRadius: 5,
							height: 44,
							padding: 0,
							margin: 15,
						}}
						value={search}
					/>
					<TouchableOpacity
						onPress={() => {
							if(this.keyboardIsShow){
								this.search.blur();
							}else{
								this.props.navigation.navigate('Detail');
							}
						}}
					>
						<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
							<ButtonGroup
								onPress={this.updateIndex}
								selectedIndex={selectedIndex}
								buttons={buttons}
								containerStyle={{height: 100}}
							/>
							<Text>
								{'首页1'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
});
