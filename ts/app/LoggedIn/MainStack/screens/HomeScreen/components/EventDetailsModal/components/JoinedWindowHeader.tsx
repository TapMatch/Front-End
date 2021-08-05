import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { _fs } from 'ts/UIConfig/fontSizes';
import { _c } from 'ts/UIConfig/colors';
import { _f } from 'ts/UIConfig/fonts';
import { MainStackContext } from 'ts/app/contexts/MainStackContext';
import shareContent from 'ts/app/common/services/shareContent';
import FastImage from 'react-native-fast-image';
import { TapMatchContext } from 'ts/app/contexts/TapMatchContext';

interface HeaderProps {
}

const JoinedWindowHeader = (props: HeaderProps) => {
	const { selectedMarkerData } = useContext(MainStackContext);
	const { userProfile } = useContext(TapMatchContext);
	const { name } = selectedMarkerData[0];

	return (
		// <View style={_s.container}>
		//     <TouchableOpacity onPress={() => shareContent(selectedMarkerData[0], userProfile)} style={_s.btn}>
		//         <View style={[_s.side]} />
		//         <View style={[_s.middle, _s.center]}>
		//             <Text numberOfLines={1} style={[_s.title, _s.share]}>Share</Text>
		//             <Text numberOfLines={1} style={[_s.title, _s.eventName]}>{name}</Text>
		//         </View>
		//         <View style={[_s.side, _s.center, _s.right]}>
		//             <FastImage
		//                 style={_s.img}
		//                 resizeMode={FastImage.resizeMode.contain}
		//                 source={require('assets/png/forward-black.png')}
		//             />
		//         </View>
		//     </TouchableOpacity>
		// </View>
		<View style={_s.container}>
			<View style={_s.center}>
				<FastImage
					style={_s.img}
					resizeMode={FastImage.resizeMode.contain}
					source={require('assets/png/forward-black.png')}
				/>
				<Text>Edit</Text>
			</View>
			<View style={[_s.middle]}>
				<View style={[_s.shadow, _s.titleBlock]}>
					<Text numberOfLines={1} style={[_s.title, _s.eventName]}>{name}</Text>
				</View>
			</View>
			<View style={_s.center}>
				<FastImage
					style={_s.img}
					resizeMode={FastImage.resizeMode.contain}
					source={require('assets/png/forward-black.png')}
				/>
				<Text>Share</Text>
			</View>
		</View>
	);
};

export default JoinedWindowHeader;

const _s = StyleSheet.create({
	container: {
		height: '22%',
		minWidth: '100%',
		paddingHorizontal: '5%',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 8
	},
	titleBlock: {
		backgroundColor: _c.white,
		borderRadius: 16,
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	side: {
		flex: 1,
		maxWidth: '15%'
	},
	middle: {
		flex: 1,
		maxWidth: '70%',
	},
	right: {
		paddingRight: 15
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		height: _fs.xl,
		width: _fs.xl,
	},
	title: {
		fontFamily: _f.regularAlt,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: _c.black,
	},
	share: {
		fontSize: _fs.xxl,
		lineHeight: _fs.x3l
	},
	eventName: {
		fontSize: _fs.x4l,
		lineHeight: _fs.x9l,
	},
	shadow: {
		shadowColor: _c.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},

});
