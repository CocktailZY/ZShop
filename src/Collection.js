import React, {Component} from 'react';
import {Dimensions, FlatList, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import Path from './config';

let pixel = PixelRatio.get();
let screenW = Dimensions.get('window').width;

export default class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
		};
	}

	componentDidMount() {
		this._getCollection();
	}

	componentWillUnmount() {

	}

	_getCollection = () => {
		let url = Path + 'collection/listByUserId.do';
		console.log(url);
		fetch(Path + 'collection/listByUserId.do', {method: 'GET'}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('收藏列表');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText.data);
				let tSectionArr = [...this.state.dataList];
				responseText.data.map((collectionItem, index) => {
					if (collectionItem.flowerId) {
						fetch(Path + 'flower/getById.do?id=' + collectionItem.flowerId, {method: 'GET'}).then((response) => {
							return response.json();
						}).then((flowerDetail) => {
							console.log('详情');
							console.log(flowerDetail);
							if (flowerDetail.status == 'success') {
								console.log(flowerDetail.data);
								let tItem = {};
								tItem['id'] = collectionItem.id;
								tItem['name'] = flowerDetail.data.name;
								tItem['image'] = flowerDetail.data.img.substring(3, flowerDetail.data.img.length);
								tItem['price'] = flowerDetail.data.price;
								tItem['type'] = 'flower';

								console.log(tItem);
								tSectionArr.push(tItem);
								this.setState({
									dataList: tSectionArr,
								});
							} else {
								console.log('获取异常');
							}
						}).catch(error => {
							console.log('获取异常：' + error);
						});
					} else if (collectionItem.shopId) {
						fetch(Path + 'shop/getById.do?id=' + collectionItem.shopId, {method: 'GET'}).then((response) => {
							return response.json();
						}).then((shop) => {
							console.log('详情');
							console.log(shop);
							if (shop.status == 'success') {
								console.log(shop.data);
								let tItem = {};
								tItem['id'] = collectionItem.id;
								tItem['name'] = shop.data.name;
								tItem['type'] = 'shop';

								console.log(tItem);
								tSectionArr.push(tItem);
								this.setState({
									dataList: tSectionArr,
								});
							} else {
								console.log('获取异常');
							}
						}).catch(error => {
							console.log('获取异常：' + error);
						});
					}
				});
			} else {
				console.log('订单异常');
			}
		}).catch(error => {
			console.log('订单异常：' + error);
		});
	};

	_renderRow = ({item, index}) => {
		return (
			<View key={item.id} style={{height: 100, flexDirection: 'row', alignItems: 'center'}}>
				<Image style={styles.imgStyle}
					   source={item.type == 'flower' ? {uri: Path + item.image} : require('../images/shop.png')}
				/>

				<View style={{flex: 1, marginLeft: 20, justifyContent: 'space-around', height: 80}}>
					<Text style={{fontSize: 18}}>{item.name}</Text>
					{item.type == 'flower' ? (
						<Text style={{fontSize: 15, color: 'red', textAlign: 'left'}}>¥{item.price}</Text>
					) : null}
				</View>

				<TouchableOpacity style={{
					borderWidth: 1 / pixel,
					borderColor: 'rgb(200,200,200)',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#fb3444',
					width: 30,
					height: 30,
					marginLeft: 5,
					borderRadius: 3,
				}} onPress={() => {
					//移除本地列表
					let formData = new FormData();
					formData.append('id', item.id);
					fetch(Path + 'collection/delete.do', {
						method: 'POST',
						body: formData,
					}).then((response) => {
						return response.json();
					}).then((responseText) => {
						console.log('移除收藏');
						console.log(responseText);
						if (responseText.status == 'success') {
							let oldList = [...this.state.dataList];
							oldList.splice(oldList.findIndex(tItem => tItem.id === item.id), 1);
							this.setState({
								dataList: oldList,
							});
						} else {
							console.log('移除收藏异常');
						}
					}).catch(error => {
						console.log('移除收藏异常：' + error);
					});
				}}>
					<Icon name={'delete'} type='antdesign' size={20} color={'#ffffff'}/>
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					renderItem={this._renderRow}
					data={this.state.dataList}
					ItemSeparatorComponent={() => <Divider/>}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#FFFFFF',
	},
	imgStyle: {
		width: 60,
		height: 60,
		borderRadius: 5,
	},
});
