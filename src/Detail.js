import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import {Image, Text, Divider, Icon} from 'react-native-elements';
import {theme} from './styles/theme';

const gColor = [
	{name: '颜色1', color: '#eccc68', checked: false},
	{name: '颜色2', color: '#ff7f50', checked: false},
	{name: '颜色3', color: '#ffa502', checked: false},
	{name: '颜色4', color: '#7bed9f', checked: false},
	{name: '颜色5', color: '#70a1ff', checked: false},
	{name: '颜色6', color: '#747d8c', checked: false},
	{name: '颜色7', color: '#3742fa', checked: false},
	{name: '颜色8', color: '#1abc9c', checked: false},
	{name: '颜色9', color: '#2ecc71', checked: false},
	{name: '颜色10', color: '#3498db', checked: false},
	{name: '颜色11', color: '#9b59b6', checked: false},
	{name: '颜色12', color: '#d35400', checked: false},
	{name: '颜色13', color: '#c0392b', checked: false},
];

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			goodItem: this.props.navigation.state.params.goodItem,
		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	_addToCollection = () => {
		// TODO 执行保存收藏方法
		let tgoodItem = {...this.state.goodItem};
		tgoodItem.fav = !tgoodItem.fav;
		this.setState({
			goodItem: tgoodItem
		});
	}

	render() {
		const {goodItem} = this.state;
		return (
			<View style={[styles.container]}>
				<Image
					source={require('../images/goods1.png')}
					style={{height: 200}}
					resizeMode={'contain'}
				/>
				<Divider/>
				<ScrollView style={{flex: 1, paddingLeft: 15, paddingRight: 15,overflow:'hidden'}}>
					<View>
						<Text h4 style={{color: '#ff6348'}}>{`¥ 16.8`}</Text>
					</View>
					<View>
						<Text style={{
							color: '#333333',
							fontSize: 18,
						}}>{`是多年草本球根类植物，鳞茎卵形，有膜质外皮，皮膜颜色与花色成正相关，未开花时形如大蒜，原产地中海沿岸及小亚细亚一带，是研究发现的会开花的植物中最香的一个品种。喜阳光充足和比较湿润的生长环境，要求排水良好和肥沃的沙壤土等。`}</Text>
					</View>
					{/*<Divider style={{height:1, marginTop: 15}}/>*/}
					{/*<View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop:10}}>
						{gColor.map((colorItem, index) => {
							return (
								<TouchableOpacity key={colorItem.color} style={{
									borderRadius: 3,
									backgroundColor: colorItem.color,
									width: 80,
									height: 30,
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: 15,
									marginRight: 15
								}}>
									<Text style={{color: '#ffffff'}}>{colorItem.name}</Text>
								</TouchableOpacity>
							);
						})}
					</View>*/}
				</ScrollView>
				<Divider style={{marginBottom: 45}}/>
				{/* 底部工具条 */}
				<View style={{
					width: '100%',
					height: 44,
					position: 'absolute',
					bottom: 0,
					flexDirection: 'row',
					backgroundColor:'#ffffff'
				}}>
					<TouchableOpacity
						style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
						onPress={()=>{this._addToCollection();}}
					>
						<Icon name={goodItem.fav ? 'favorite' : 'favorite-border'} type='material' size={22} color={'#2089DC'}/>
						<Text>{`  收藏`}</Text>
					</TouchableOpacity>
					<View style={{width:1,backgroundColor:'#d4d4d4'}}/>
					<TouchableOpacity
						style={{flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
						onPress={()=>{this.props.navigation.navigate('Cart');}}
					>
						<Icon name={'ios-cart'} type='ionicon' size={22} color={'#2089DC'}/>
						<Text>{`  加入购物车`}</Text>
					</TouchableOpacity>

				</View>
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
