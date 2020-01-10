import React, {Component} from 'react';
import {Image, SectionList, StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import Path from './config';

export default class OrderList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderList: [],
		};
	}

	componentDidMount() {
		this._getOrderList();
	}

	componentWillUnmount() {

	}

	_getOrderList = () => {
		let url = Path + 'orders/listAll.do';
		console.log(url);
		fetch(Path + 'orders/listAll.do', {method: 'GET'}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('订单列表');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText.data);
				let tSectionArr = [];
				responseText.data.map((orderItem, index) => {
					let header = {
						title: `${orderItem.order.id} | ${orderItem.order.orderTime} | ${orderItem.order.total}`,
						data: []
					};
					orderItem.orderInfoList.map((item,index)=>{
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
								header.data.push(tItem);
								console.log(header.data);
								tSectionArr.push(header);
								this.setState({
									orderList: tSectionArr,
								});
							}else{
								console.log('获取异常');
							}
						}).catch(error => {
							console.log('获取异常：'+error);
						});
					})
				});
			} else {
				console.log('订单异常');
			}
		}).catch(error => {
			console.log('订单异常：' + error);
		});
	}

	_renderRow = ({item, index, section}) => {
		return (
			<View key={item.id} style={{
				flexDirection: 'row',
				height: 80,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(116, 185, 255,0.2)',
			}}>
				<View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
					<Image style={styles.imgStyle}
						   source={{uri: item.image}}
					/>
				</View>
				<View style={{flex: 1}}>
					<View style={{flex: 1, justifyContent: 'center'}}>
						<Text style={{fontSize: 18}}>{item.name}</Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>{`x ${item.count}`}</Text>
						</View>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10}}>
							<Text>{`¥ ${item.price}`}</Text>
						</View>
					</View>
				</View>
			</View>

		);
	};

	render() {
		return (
			<View style={styles.container}>
				<SectionList
					renderItem={this._renderRow}
					renderSectionHeader={({section: {title}}) => (
						<View style={{
							height: 30,
							backgroundColor: '#2089DC',
							paddingLeft: 10,
							paddingRight: 10,
						}}>
							<View style={{flex: 1,justifyContent: 'center',}}>
								<Text style={{fontWeight: 'bold', color: '#ffffff'}}>{`订单编号：${title.split('|')[0]}`}</Text>
							</View>
						</View>
					)}
					renderSectionFooter={({section}) => {
						return (
							<View style={{
								height: 35,
								flexDirection: 'row',
								backgroundColor: '#2089DC',
								paddingLeft: 10,
								paddingRight: 10,
								marginBottom: 10,
							}}>
								<View style={{flex: 1, justifyContent: 'center'}}>
									<Text style={{fontWeight: 'bold', color: '#ffffff'}}>{section.title.split('|')[1]}</Text>
								</View>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
									<Text style={{fontWeight: 'bold', color: '#ffffff', fontSize: 17}}>{`总计：¥ ${section.title.split('|')[2]}`}</Text>
								</View>
							</View>
						);
					}}
					sections={this.state.orderList}
					ItemSeparatorComponent={() => <Divider/>}
					keyExtractor={(item, index) => item + index}
				/>
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
		width: 60,
		height: 60,
		borderRadius: 5,
	},
});
