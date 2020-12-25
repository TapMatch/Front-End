import React, {useContext} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';

interface ParagraphProps { }

const Paragraph = (props: ParagraphProps) => {
    const {selectedMarkerData} = useContext(MainStackContext);
    const {description} = selectedMarkerData[0];
    return (
        <View style={_s.container}>
            <Text numberOfLines={2} style={_s.txt}>{description}</Text>
        </View>
    );
};

export default Paragraph;

const _s = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '100%',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    txt: {
        maxWidth: '100%',
        fontSize: _fs.m,
        fontFamily: _f.regularAlt,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: _c.grey,
    },
});
