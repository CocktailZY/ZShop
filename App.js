import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {theme} from './src/styles/theme';

import HomeScreen from './src/Home';
import DetailScreen from './src/Detail';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: `首页`,
      headerBackTitle: null,
    }),
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
      headerBackTitle: true,
    }),
  },
},{
  initialRouteName: 'Home',
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
  }
});

export default createAppContainer(AppNavigator);
