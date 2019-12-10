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
						}}>{`尺寸: 均码\t\t面料: 其他\n风格: 韩版女裤\t\t腰高: 高腰\n颜色分类: 杏色 深灰色 黑色 粉色\n成分含量: 51%(含)-70%(含)\n年份季节: 2019年秋季\n厚薄: 薄款\t\t服装款式: 口袋\n裤长: 九分裤女裤 裤型: 灯笼裤`}</Text>
					</View>
					<Divider style={{height:1, marginTop: 15}}/>
					<View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop:10}}>
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
					</View>
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
					<TouchableOpacity style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<Icon name={goodItem.fav ? 'favorite' : 'favorite-border'} type='material' size={22} color={'#1e90ff'}/>
						<Text>{`  收藏`}</Text>
					</TouchableOpacity>
					<View style={{width:1,backgroundColor:'#d4d4d4'}}/>
					<TouchableOpacity style={{flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						<Icon name={'ios-cart'} type='ionicon' size={22} color={'#1e90ff'}/>
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
