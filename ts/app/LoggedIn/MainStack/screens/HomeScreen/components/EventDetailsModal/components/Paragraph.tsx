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
            {/* <Text numberOfLines={2} style={_s.txt}>{description.trim()}</Text> */}
                <Text style={_s.txt}>A marathon free for anyone to join.Charity run for xyz school.</Text>
                <Text style={[_s.txt, _s.mt_2]}>Invite your friends and bring your energy !</Text>
        </View>
    );
};

export default Paragraph;

const _s = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: '5%',
        paddingHorizontal: 12,
        marginTop: 8,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: _c.greyLight,
        borderRadius: 12
    },

    txt: {
        maxWidth: '100%',
        fontSize: _fs.m,
        lineHeight: _fs.l,
        fontFamily: _f.regularAlt,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: _c.black,
    },
    mt_2: {
        marginTop: 10
    }
});
