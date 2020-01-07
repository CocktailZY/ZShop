import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import LoginScreen from './src/Login';
import DetailScreen from './src/Detail';
import Orders from './src/Orders';

import HomeScreen from './src/Home';
import Cart from './src/Cart';
import OrderList from './src/OrderList';
import Collection from './src/Collection';
import Users from './src/Users';


import {Icon} from 'react-native-elements';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const DrawerNavigator = createDrawerNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({navigation}) => ({
			drawerLabel: '首页',
			drawerIcon: ({ tintColor }) => (
				<Icon name={'home'} type='antdesign' size={24} color={tintColor}/>
			),
		}),
	},
	Cart: {
		screen: Cart,
		navigationOptions: ({navigation}) => ({
			drawerLabel: '购物车',
			drawerIcon: ({ tintColor }) => (
				<Icon name={'shoppingcart'} type='antdesign' size={24} color={tintColor}/>
			),
		}),
	},
	Order: {
		screen: OrderList,
		navigationOptions: ({navigation}) => ({
			drawerLabel: '我的订单',
			drawerIcon: ({ tintColor }) => (
				<Icon name={'carryout'} type='antdesign' size={24} color={tintColor}/>
			),
		}),
	},
	Collection: {
		screen: Collection,
		navigationOptions: ({navigation}) => ({
			drawerLabel: '我的收藏',
			drawerIcon: ({ tintColor }) => (
				<Icon name={'star'} type='antdesign' size={24} color={tintColor}/>
			),
		}),
	},
	UCenter: {
		screen: Users,
		navigationOptions: ({navigation}) => ({
			drawerLabel: '个人中心',
			drawerIcon: ({ tintColor }) => (
				<Icon name={'user'} type='antdesign' size={24} color={tintColor}/>
			),
		}),
	}
}, {
	initialRouteName: 'Home',
	drawerWidth:  300, // 展示的宽度
	drawerPosition: 'left', // 抽屉在左边还是右边
	drawerType: 'front',
	contentOptions: {
		activeTintColor: '#2089DC',
	},
});

const AppNavigator = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: ({navigation}) => ({
			header: null,
		}),
	},
	Index: {
		screen: DrawerNavigator,
		navigationOptions: ({navigation}) => ({
			title:`花卉批发`,
			headerLeft: (
				<TouchableOpacity style={{
					flex:1,
					marginLeft: 10,
					justifyContent:'center',
					alignItems:'center',
				}} onPress={()=>{
					navigation.openDrawer();
				}}>
					<Icon name={'ios-menu'} type='ionicon' size={30}/>
				</TouchableOpacity>
			),
		}),
	},
	Detail: {
		screen: DetailScreen,
		navigationOptions: ({navigation}) => ({
			title: `${navigation.state.params.title}`,
			headerBackTitle: true,
		}),
	},
	Order: {
		screen: Orders,
		navigationOptions: ({navigation}) => ({
			title: `订单`,
			headerBackTitle: true,
		}),
	},

}, {
	initialRouteName: 'Login',
	defaultNavigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
		// title:'消息',
		// header: null,
		// headerStyle:{backgroundColor:'tomato'},
		gesturesEnabled: false,

	},
	mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
	headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
	onTransitionStart: (transitionProps, prevTransitionProps) => {
	},
	onTransitionEnd: (transitionProps, prevTransitionProps) => {
		// ConsoleUtil.console('路由变化后');
		// ConsoleUtil.console(transitionProps.navigation.state.routes);
	},
});

export default createAppContainer(AppNavigator);
