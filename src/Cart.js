import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View,DeviceEventEmitter} from 'react-native';

import ShopCarCell from './ShopCartCell';
import {Icon} from 'react-native-elements';
import Path, {Global} from './config';

export default class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			totalPrice: 0,
			ids: '',
		};
	}

	componentDidMount() {
		this._getCartList();
		DeviceEventEmitter.addListener('_removeGood', this._removeGood.bind(this));
		DeviceEventEmitter.addListener('_addGood', this._addGood.bind(this));
		DeviceEventEmitter.addListener('_delGood', this._delGood.bind(this));
	}

	componentWillUnmount() {

	}

	_getCartList = () => {
		fetch(Path + 'cart/listByUserId.do', {method: 'GET'}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('购物车列表');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText.data);
				let tDataSource = [];
				responseText.data.map((item, index) => {
					let tids = '', tTotal = 0;
					tids += item.id;
					tTotal += parseFloat(item.sTotal);
					let tItem = {};
					tItem['id'] = item.id;
					tItem['num'] = parseInt(item.num);
					fetch(Path + 'flower/getById.do?id='+item.flowerId, {method: 'GET'}).then((response) => {
						return response.json();
					}).then((flowerDetail) => {
						console.log('详情');
						console.log(flowerDetail);
						if(flowerDetail.status == "success"){
							console.log(flowerDetail.data);
							tItem['name'] = flowerDetail.data.name;
							tItem['img'] = flowerDetail.data.img.substring(3, flowerDetail.data.img.length);
							tItem['price'] = parseFloat(flowerDetail.data.price);

							console.log(tItem);
							tDataSource.push(tItem);
							console.log(tDataSource);
							this.setState({
								dataSource: tDataSource,
								ids: tids,
								totalPrice:tTotal
							});
						}else{
							console.log('获取异常');
						}
					}).catch(error => {
						console.log('获取异常：'+error);
					});
				});

			} else {
				console.log('购物车列表异常');
			}
		}).catch(error => {
			console.log('购物车列表异常：' + error);
		});
	}

	//渲染界面
	_renderRow(rowData) {
		return (
			<ShopCarCell key={rowData.index} entity={rowData.item}/>
		);
	}

	//逻辑处理
	_removeGood(entity) {
		let formData = new FormData();
		formData.append('id', entity.id);
		formData.append('num', entity.num);
		formData.append('sTotal', (entity.num*entity.price).toFixed(2));
		fetch(Path + 'cart/update.do', {
			method: 'POST',
			body: formData
		}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('生成订单');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText);
				let totalPrice = this.state.totalPrice - parseInt(entity.price);

				this.setState({
					totalPrice: totalPrice,
				});
			} else {
				console.log('生成订单异常');
			}
		}).catch(error => {
			console.log('生成订单异常：' + error);
		});
	}

	_addGood(entity) {
		let formData = new FormData();
		formData.append('id', entity.id);
		formData.append('num', entity.num);
		formData.append('sTotal', (entity.num*entity.price).toFixed(2));
		fetch(Path + 'cart/update.do', {
			method: 'POST',
			body: formData
		}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('更新购物车');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText);
				let totalPrice = this.state.totalPrice + parseInt(entity.price);
				this.setState({
					totalPrice: totalPrice,
				});
			} else {
				console.log('更新购物车异常');
			}
		}).catch(error => {
			console.log('更新购物车异常：' + error);
		});
	}

	_delGood(entity) {
		let oldList = [...this.state.dataSource];
		oldList.splice(oldList.findIndex(item => item.id === entity.id), 1);
		this.setState({
			dataSource: oldList
		});
	}

	_genOrder = () => {
		let formData = new FormData();
		formData.append('ids', this.state.ids);
		formData.append('total', this.state.totalPrice);
		fetch(Path + 'orders/save.do', {
			method: 'POST',
			body: formData
		}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('生成订单');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText);
				this.props.navigation.push('Order',{orderId: responseText.orderId});
			} else {
				console.log('生成订单异常');
			}
		}).catch(error => {
			console.log('生成订单异常：' + error);
		});

	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					renderItem={this._renderRow.bind(this)}
					data={this.state.dataSource}
				/>

				{/* 底部工具条 */}
				<View style={{
					width: '100%',
					height: 44,
					position: 'absolute',
					bottom: 0,
					flexDirection: 'row',
					backgroundColor: '#2089DC',
				}}>
					<TouchableOpacity
						style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
						onPress={() => {
							this._genOrder();
						}}
					>
						<Icon name={'checkcircleo'} type='antdesign' size={22} color={'#ffffff'}/>
						<Text style={{color: '#ffffff'}}>{`  生成订单`}</Text>
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
