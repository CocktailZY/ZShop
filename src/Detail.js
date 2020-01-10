import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import {Image, Text, Divider, Icon, Input, Button} from 'react-native-elements';
import {theme} from './styles/theme';
import Path, {Global} from './config';

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
			goodItem: {},
			goodId: props.navigation.state.params.goodItem,
			commentList: [],
			content: ''
		};
	}

	componentDidMount() {
		this._getFlowerDetail();
		this._getCommentList();
	}

	componentWillUnmount() {

	}

	_getFlowerDetail = () => {
		let url = Path + 'flower/getById.do';
		console.log(url);
		fetch(Path + 'flower/getById.do?id='+this.state.goodId, {method: 'GET'}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('详情');
			console.log(responseText);
			if(responseText.status == "success"){
				console.log(responseText.data);
				responseText.data.img = responseText.data.img.substring(3, responseText.data.img.length);

				fetch(Path + 'shop/getById.do?id=' + responseText.data.shopId, {method: 'GET'}).then((response) => {
					return response.json();
				}).then((shop) => {
					console.log('详情');
					console.log(shop);
					if (shop.status == 'success') {
						console.log(shop.data);
						responseText.data['mjUserId'] = shop.data.usersId;
						this.setState({
							goodItem: responseText.data
						},()=>{
							//判断是否已经被收藏
							fetch(Path + 'collection/listByUserId.do', {method: 'GET'}).then((response) => {
								return response.json();
							}).then((collection) => {
								console.log('收藏');
								console.log(collection);
								if(collection.status == "success"){
									console.log(collection.data);
									collection.data.map((item,index)=>{
										if(item.flowerId === this.state.goodId){
											let tGoodItem = {...this.state.goodItem};
											tGoodItem['fav'] = true;
											this.setState({
												goodItem: tGoodItem
											});
										}
									})
								}else{
									console.log('获取异常');
								}
							}).catch(error => {
								console.log('获取异常：'+error);
							});
						});
					} else {
						console.log('获取异常');
					}
				}).catch(error => {
					console.log('获取异常：' + error);
				});
			}else{
				console.log('获取异常');
			}
		}).catch(error => {
			console.log('获取异常：'+error);
		});
	};

	_getCommentList = () => {
		fetch(Path + 'comment/listByFlowerId.do?id='+this.state.goodId, {method: 'GET'}).then((response) => {
			return response.json();
		}).then((comment) => {
			console.log('评论');
			console.log(comment);
			if(comment.status == "success"){
				console.log(comment.data);
				let tempArr = [];
				comment.data.map((item,index)=>{
					let tObj = {
						id: item.id,
						content: item.content
					};
					fetch(Path + 'users/getById.do?id=' + item.usersId, {method: 'GET'}).then((response) => {
						return response.json();
					}).then((tUser) => {
						console.log('详情');
						console.log(tUser);
						if (tUser.status == 'success') {
							console.log(tUser.data);
							tObj['username'] = tUser.data.username;
							tempArr.push(tObj);
							this.setState({
								commentList: tempArr
							});
						} else {
							console.log('获取异常');
						}
					}).catch(error => {
						console.log('获取异常：' + error);
					});

				})
			}else{
				console.log('评论异常');
			}
		}).catch(error => {
			console.log('评论异常：'+error);
		});
	}

	_addToCollection = () => {
		let tgoodItem = {...this.state.goodItem};
		tgoodItem.fav = !tgoodItem.fav;
		if(tgoodItem.fav){
			//加入收藏
			// TODO 执行保存收藏方法
			let formData = new FormData();
			formData.append('flowerId', this.state.goodId);
			formData.append('usersId', Global.userId);
			console.log(formData);
			fetch(Path + 'collection/save.do', {
				method: 'POST',
				body: formData
			}).then((response) => {
				return response.json();
			}).then((responseText) => {
				console.log('加入收藏夹');
				console.log(responseText);
				if (responseText.status == 'success') {
					console.log(responseText);
					this.setState({
						goodItem: tgoodItem
					});
				} else {
					console.log('加入收藏夹异常');
				}
			}).catch(error => {
				console.log('加入收藏夹异常：' + error);
			});
		}else{
			//取消收藏
			let formData = new FormData();
			formData.append('id', this.state.goodId);
			console.log(formData);
			fetch(Path + 'collection/deleteByFlowerId.do', {
				method: 'POST',
				body: formData
			}).then((response) => {
				return response.json();
			}).then((responseText) => {
				console.log('加入收藏夹');
				console.log(responseText);
				if (responseText.status == 'success') {
					console.log(responseText);
					this.setState({
						goodItem: tgoodItem
					});
				} else {
					console.log('加入收藏夹异常');
				}
			}).catch(error => {
				console.log('加入收藏夹异常：' + error);
			});
		}
	};

	_addToCart = () => {
		let formData = new FormData();
		formData.append('num', 1);
		formData.append('sTotal', this.state.goodItem.price);
		formData.append('flowerId', this.state.goodId);
		formData.append('usersId', Global.userId);
		console.log(formData);
		fetch(Path + 'cart/save.do', {
			method: 'POST',
			body: formData
		}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('加入购物车');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText);
				this.props.navigation.navigate('Cart');
			} else {
				console.log('加入购物车异常');
			}
		}).catch(error => {
			console.log('加入购物车异常：' + error);
		});
	}

	_addComment = () => {

		let formData = new FormData();
		formData.append('content', this.state.content);
		formData.append('mjUsersId', this.state.goodItem.mjUserId);
		formData.append('flowerId', this.state.goodId);
		formData.append('usersId', Global.userId);
		console.log(formData);
		fetch(Path + 'comment/save.do', {
			method: 'POST',
			body: formData
		}).then((response) => {
			return response.json();
		}).then((responseText) => {
			console.log('增加评论');
			console.log(responseText);
			if (responseText.status == 'success') {
				console.log(responseText);
				this.setState({
					content: ''
				},()=>{
					this._getCommentList();
				});
			} else {
				console.log('增加评论异常');
			}
		}).catch(error => {
			console.log('增加评论异常：' + error);
		});
	}

	render() {
		const {goodItem, content} = this.state;
		return (
			<View style={[styles.container]}>
				<Image
					source={{uri: Path + goodItem.img}}
					style={{height: 200}}
					resizeMode={'contain'}
				/>
				<Divider/>
				<ScrollView style={{flex: 1, paddingLeft: 15, paddingRight: 15, overflow:'hidden'}}>
					<View>
						<Text h4 style={{color: '#ff6348'}}>{`¥ ${goodItem.price}`}</Text>
					</View>
					<View>
						<Text style={{
							color: '#333333',
							fontSize: 18,
						}}>{`${goodItem.describes}`}</Text>
					</View>
					<Divider style={{marginTop: 10,marginBottom:10}}/>
					{/* 评论 */}
					<View style={{flexDirection:'row'}}>
						<Icon name={'comment'} type='material' size={24} color={'#2089DC'}/>
						<Text style={{fontSize: 20,color: '#333333',marginBottom: 10}}>
							{` 评论区`}
						</Text>
					</View>
					{this.state.commentList.map((comment,index)=>{
						return (
							<View key={comment.id} style={{paddingBottom: 15}}>
								<Text style={{
									color: '#666666',
									fontSize: 18,
								}}>{`${comment.username}：${comment.content}`}</Text>
							</View>
						)
					})}
					<View style={{
						width: '100%',
						height: 44,
						flexDirection: 'row',
					}}>
						<Input
							style={{width: '50%'}}
							placeholder='请输入评论'
							onChangeText={(text) => {
								this.setState({
									content: text,
								});
							}}
							value={content}
							returnKeyType={'send'}
							returnKeyLabel={'发送'}
							onSubmitEditing={()=>{
								this._addComment();
							}}
						/>
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
						onPress={()=>{
							this._addToCart();
						}}
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
