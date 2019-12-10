import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import { ListItem } from 'react-native-elements'

const list = [
	{
		name: 'Amy Farha',
		avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
		subtitle: 'Vice President'
	},
	{
		name: 'Chris Jackson',
		avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
		subtitle: 'Vice Chairman'
	},
	... // more items
]
export default class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {

		this.setState({});
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<View style={styles.container}>
				{
					list.map((l, i) => (
						<ListItem
							key={i}
							leftAvatar={{ source: { uri: l.avatar_url } }}
							title={l.name}
							subtitle={l.subtitle}
							bottomDivider
						/>
					))
				}
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
