import React, {Component, PropTypes} from 'react'
import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	Dimensions,
	PixelRatio,
	Image,
	TouchableOpacity,
	DeviceEventEmitter
} from 'react-native';
import {Icon} from 'react-native-elements';
import Path from './config';

let pixel = PixelRatio.get();
let screenW = Dimensions.get('window').width;

export default class ShopCarCell extends Component {

	constructor(props) {
		super(props);

		this.state = {
			disabled: this.props.entity.num == 0 ? true : false,
			num: this.props.entity.num
		}
	}

	render() {

		return (
			<View style={styles.contentStyle}>
				<Image style={styles.imgStyle}
					   source={{uri: Path + this.props.entity.img}}
				/>

				<View style={{marginLeft: 10, justifyContent: 'space-around', height: 100}}>
					<Text style={{fontSize: 18}}>{this.props.entity.name}</Text>
					<Text style={{fontSize: 15, color: 'red', textAlign: 'left'}}>¥{this.props.entity.price}</Text>
				</View>

				<View style={{position: 'absolute', right: 10, flexDirection: 'row'}}>
					<TouchableOpacity onPress={this._removeGood.bind(this)}
									  disabled={this.state.disabled}
					>
						<Text style={styles.textStyle}>－</Text>
					</TouchableOpacity>

					<Text style={styles.textStyle}>{this.props.entity.num}</Text>

					<TouchableOpacity onPress={this._addGood.bind(this)}
					>
						<Text style={styles.textStyle}>＋</Text>
					</TouchableOpacity>

					<TouchableOpacity style={{
						borderWidth:1/pixel,
						borderColor: 'rgb(200,200,200)',
						justifyContent:'center',
						alignItems:'center',
						backgroundColor:'#fb3444',
						width: 30,
						height: 30,
						marginLeft: 5,
						borderRadius: 3
					}} onPress={()=>{
						DeviceEventEmitter.emit('_delGood', this.props.entity);
					}}>
						<Icon name={'delete'} type='antdesign' size={20} color={'#ffffff'}/>
					</TouchableOpacity>
				</View>

			</View>
		)
	}

	//逻辑处理
	_removeGood() {
		let num = this.props.entity.num;
		num -= 1;

		let disabled = false;
		if (num <= 1) {
			num = 1;
			disabled = true;
		}

		this.props.entity.num = num;

		this.setState({
			num: num,
			disabled: disabled
		});

		DeviceEventEmitter.emit('_removeGood', this.props.entity);
	}

	_addGood() {
		let num = this.props.entity.num;
		console.log(num);
		num += 1;
		let disabled = false;
		this.props.entity.num = num;
		this.setState({
			num: num,
			disabled: disabled
		});
		DeviceEventEmitter.emit('_addGood', this.props.entity);
	}
}

let styles = StyleSheet.create({
	contentStyle: {
		backgroundColor: 'white',
		width: screenW,
		height: 140,
		flexDirection: 'row',
		borderBottomWidth: 1/pixel,
		borderBottomColor: 'rgb(220,220,220)',
		alignItems: 'center',
	},

	imgStyle: {
		width: 100,
		height: 100,
		marginLeft: 20,
		borderRadius: 5
	},

	textStyle: {
		borderWidth:1/pixel,
		borderColor: 'rgb(200,200,200)',
		width: 30,
		height: 30,
		textAlign: 'center',
		lineHeight: 30,
	}

});
