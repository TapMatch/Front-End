import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import * as RNLocalize from "react-native-localize";
import {useDimensions, useKeyboard} from '@react-native-community/hooks';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CloseBlack from 'assets/svg/close-black.svg';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';

interface AutocompleteModalProps {
    modalVisible: [boolean, (x: boolean) => void];

}
const AutocompleteModal = ({
    modalVisible,
}: AutocompleteModalProps) => {
    const {coordinates, address} = useContext(CreateEventScreenContext);
    const {width, height} = useDimensions().screen;
    const {keyboardHeight} = useKeyboard();
    const language = useState<string>(RNLocalize.getLocales()[0].languageCode);
    const txt = useLocalizedTxt();
    const {top, bottom} = useSafeAreaInsets();
    return (
        <Modal
            animationIn={'slideInUp'}
            animationInTiming={600}
            animationOut={'fadeOut'}
            animationOutTiming={600}
            isVisible={modalVisible[0]}
            style={[_s.modal, {paddingTop: top, paddingBottom: bottom}]}>
            <View style={_s.container}>
                <View style={_s.closeBtnContainer}>
                    <TouchableOpacity onPress={() => modalVisible[1](false)} style={_s.closeBtn} >
                        <CloseBlack height={_fs.xxl} width={_fs.xxl} />
                    </TouchableOpacity >
                </View>
                <GooglePlacesAutocomplete
                    onFail={(e) => console.log(e)}
                    minLength={3}
                    numberOfLines={1}
                    autoFillOnNotFound={true}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    listViewDisplayed={true}
                    styles={{
                        textInput: _s.textInput,
                        listView: {
                            backgroundColor: _c.white,
                            position: 'absolute',
                            top: 50,
                            left: 0,
                            maxHeight: height - keyboardHeight - vs(49) - 180,
                            minWidth: width,
                            zIndex: 500000
                        },
                    }}
                    placeholder='Event address'
                    onPress={(data, details: any = null) => {
                        const {formatted_address, geometry} = details;
                        address[1](formatted_address);
                        coordinates[1]({
                            longitude: geometry.location.lng,
                            latitude: geometry.location.lat,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        });
                        modalVisible[1](false);
                    }}
                    query={{
                        key: 'AIzaSyBI-erIASkJmmIjkNGN0_EIsgBVPCSIxng',
                        language,
                    }}
                />

            </View>
        </Modal>
    );
};

export default AutocompleteModal;

const _s = StyleSheet.create({
    modal: {margin: 0},
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: _c.white,
        position: 'relative'
    },
    textInput: {
        borderRadius: 0,
        backgroundColor: _c.greyLight,
        overflow: 'visible',
        paddingLeft: 5,
        height: 50,
        textAlign: 'left',
        textAlignVertical: 'center',
        flex: 1,
    },
    closeBtn: {
        flex: 1,
        maxWidth: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnContainer: {
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 60,
        minWidth: '100%'
    }
});
