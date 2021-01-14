import React, {useContext} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';

interface ParagraphProps {}

const Paragraph = (props: ParagraphProps) => {
    const {selectedMarkerData} = useContext(MainStackContext);
    const {description} = selectedMarkerData[0];
    return (
        <View style={_s.container}>
            <Text numberOfLines={2} style={_s.txt}>{description.trim()}</Text>
        </View>
    );
};

export default Paragraph;

const _s = StyleSheet.create({
    container: {
        height: _fs.l * 2,
        width: '100%',
        paddingHorizontal: '5%',
        marginTop: 8,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    txt: {
        maxWidth: '100%',
        fontSize: _fs.l,
        lineHeight: _fs.l,
        fontFamily: _f.regularAlt,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: _c.grey,
    },
});
