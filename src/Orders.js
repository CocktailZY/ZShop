import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView, FlatList, Modal, ToastAndroid
} from 'react-native';
import {Button, Divider, Icon, Input} from 'react-native-elements';
import Path from './config';

export default class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderId: props.navigation.state.params.orderId,
			orders:{},
			showPayType: false
		};
	}

	componentDidMount() {
		this._getOrderDetail();
	}

	componentWillUnmount() {

	}

	_getOrderDetail = () => {
		fetch(Path + 'orders/getById.do?id='+this.state.orderId, {method: 'GET'}).then((response) => {
			return response.json();
		}).then((order) => {
			console.log('订单');
			console.log(order);
			if(order.status == "success"){
				console.log(order.data);
				let ordersObj = {
					id: order.data.id,
					createTime: order.data.orderTime,
					total: order.data.total,
					orderDetailList: []
				};
				order.orderInfoList.map((item,index)=>{
					fetch(Path + 'flower/getById.do?id='+item.flowerId, {method: 'GET'}).then((response) => {
						return response.json();
					}).then((flowerDetail) => {
						console.log('详情');
						console.log(flowerDetail);
						if(flowerDetail.status == "success"){
							console.log(flowerDetail.data);
							let tItem = {};
							tItem['id'] = item.id;
							tItem['name'] = flowerDetail.data.name;
							tItem['image'] = flowerDetail.data.img.substring(3, flowerDetail.data.img.length);
							tItem['price'] = flowerDetail.data.price;
							tItem['count'] = item.num;

							console.log(tItem);
							ordersObj.orderDetailList.push(tItem);
							console.log(ordersObj.orderDetailList);
							this.setState({
								orders: ordersObj,
							});
						}else{
							console.log('获取异常');
						}
					}).catch(error => {
						console.log('获取异常：'+error);
					});
				})
			}else{
				console.log('订单异常');
			}
		}).catch(error => {
			console.log('订单异常：'+error);
		});
	}

	_renderRow = ({item,index}) => {
		return(
			<View key={item.id} style={{flexDirection:'row',height:100,justifyContent:'center',alignItems:'center'}}>
				<View style={{width:100,height:100,justifyContent:'center',alignItems:'center'}}>
					<Image style={styles.imgStyle}
						   source={{uri: Path + item.image}}
					/>
				</View>
				<View style={{flex:1}}>
					<View style={{flex:1,justifyContent:'center'}}>
						<Text style={{fontSize: 18}}>{item.name}</Text>
					</View>
					<View style={{flex:1,flexDirection:'row'}}>
						<View style={{flex:1,justifyContent:'center'}}>
							<Text>{`x ${item.count}`}</Text>
						</View>
						<View style={{flex:1,justifyContent:'center',alignItems:'flex-end',paddingRight: 10}}>
							<Text>{`¥ ${item.price}`}</Text>
						</View>
					</View>
				</View>
			</View>
		)
	};

	_payOrder = () => {
		let formData = new FormData();
		formData.append('id', this.state.orderId);
		formData.append('status', 1);
		fetch(Path + 'orders/update.do', {
			method: 'POST',
			body: formData
		}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('更新订单支付状态');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText);
				this.setState({
					showPayType: false
				},()=>{
					ToastAndroid.show('支付成功!',ToastAndroid.SHORT);
					this.props.navigation.replace('Index');
				});
			} else {
				console.log('更新订单支付状态异常');
			}
		}).catch(error => {
			console.log('更新订单支付状态异常：' + error);
		});
	}

	render() {
		const {orders} = this.state;
		return (
			<View style={styles.container}>

				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showPayType}
					onRequestClose={() => {}}
				>
					<View style={{flex:1,backgroundColor:'rgba(0,0,0,0.6)',justifyContent:'center',alignItems:'center'}}>
						<View style={{width: '80%',backgroundColor:'#ffffff'}}>
							<View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
								<Text style={{fontSize:18}}>{'请选择支付方式'}</Text>
							</View>
							<View style={{padding: 10}}>
								<Button
									icon={
										<Icon
											name="alipay-square"
											size={22}
											type={'antdesign'}
											color="white"
										/>
									}
									title="  支付宝支付"
									onPress={() => {
										this._payOrder();
									}}
								/>
								<Button
									icon={
										<Icon
											name="wechat"
											size={22}
											type={'antdesign'}
											color="white"
										/>
									}
									title="  微 信  支 付"
									buttonStyle={{backgroundColor:'#2ecc71',marginTop:10}}
									onPress={() => {
										this._payOrder();
									}}
								/>
								<Button
									icon={
										<Icon
											name="creditcard"
											size={22}
											type={'antdesign'}
											color="white"
										/>
									}
									title="  银行卡支付"
									buttonStyle={{backgroundColor:'#34495e',marginTop:10}}
									onPress={() => {
										this._payOrder();
									}}
								/>
								<Button
									icon={
										<Icon
											name="pay-circle1"
											size={22}
											type={'antdesign'}
											color="white"
										/>
									}
									title="  余 额  支 付"
									buttonStyle={{backgroundColor:'#e67e22',marginTop:10}}
									onPress={() => {
										this._payOrder();
									}}
								/>
							</View>
						</View>
					</View>
				</Modal>

				<View style={{
					flexDirection:'row',
					height:30,
					backgroundColor:'#bdc3c7',
				}}>
					<View style={{flex:1,justifyContent:'center',paddingLeft:10}}>
						<Text>{`订单编号：${orders.id}`}</Text>
					</View>
					<View style={{flex:1,justifyContent:'center',alignItems:'flex-end',paddingRight:10}}>
						<Text>{orders.createTime}</Text>
					</View>
				</View>
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					renderItem={this._renderRow}
					data={orders.orderDetailList}
					ItemSeparatorComponent={()=><Divider/>}
				/>
				{/* 底部工具条 */}
				<View style={{
					width: '100%',
					height: 44,
					position: 'absolute',
					bottom: 0,
					flexDirection: 'row',
					backgroundColor:'#2089DC'
				}}>
					<View style={{flex: 1, justifyContent: 'center',}}>
						<Text style={{color:'#ffffff',fontSize:18}}>{`  总计：¥ ${orders.total}`}</Text>
					</View>
					<TouchableOpacity
						style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
						onPress={()=>{
							this.setState({
								showPayType: true
							});
						}}
					>
						<Icon name={'pay-circle-o1'} type='antdesign' size={22} color={'#ffffff'}/>
						<Text style={{color:'#ffffff',fontSize:18}}>{`  去支付`}</Text>
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
	imgStyle: {
		width: 70,
		height: 70,
		borderRadius: 5
	},
});
