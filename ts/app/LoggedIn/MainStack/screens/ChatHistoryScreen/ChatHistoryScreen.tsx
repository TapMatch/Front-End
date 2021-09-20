import React from 'react';
import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import { _c } from 'ts/UIConfig/colors';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import { _fs } from 'ts/UIConfig/fontSizes';
import { _f } from 'ts/UIConfig/fonts';
import { formatWidth, formatHeight } from 'ts/utils/format-size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AvatarBtn from './components/AvatarBtn';
import MultipleAvatarBtn from './components/MultipleAvatarBtn';
import { useNavigation } from '@react-navigation/native';
import Title from './components/Title';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import CloseIcon from 'assets/svg/close-black.svg';
import { vs } from 'react-native-size-matters';

interface ChatHistoryScreenProps {
    navigation: any;
}

const ChatHistoryScreen = ({ navigation }: ChatHistoryScreenProps) => {
    const { top } = useSafeAreaInsets();
    const { navigate } = useNavigation();

    return (
        <View style={[_s.container]}>
            <View style={[_s.top, { paddingTop: top }]}>
                <Title />

            </View>
            <View style={{ margin: formatHeight(6) }} />
            <TextInput
                autoCompleteType={'off'}
                autoCorrect={false}
                autoFocus={false}
                maxLength={12}
                style={_s.input}
                placeholder={"Search"}
                value={""}
            />
            <View style={{ flex: 1, margin: formatHeight(16) }}>
                <>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { navigate("ChatScreen") }} style={[_s.mainflexrow, { backgroundColor: _c.orangelight, borderRadius: 20 }]}>
                        <View style={_s.flexRow}>
                            <MultipleAvatarBtn />
                            <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                <Text style={_s.txt_Head}>Bball</Text>
                                <Text style={_s.txt_Grey}>let'go</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={_s.txt_time}>2 hous ago</Text>
                            <View style={_s.recent_dot} />
                        </View>
                    </TouchableOpacity>

                    <View style={[_s.mainflexrow, { backgroundColor: _c.orangelight, borderRadius: 20 }]}>
                        <View style={_s.flexRow}>
                            <MultipleAvatarBtn />
                            <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                <Text style={_s.txt_Head}>Bball</Text>
                                <Text style={_s.txt_Grey}>hello</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={_s.txt_time}>2 hous ago</Text>
                            <View style={_s.recent_dot} />
                        </View>
                    </View>

                    <View style={_s.mainflexrow}>
                        <View style={_s.flexRow}>
                            <AvatarBtn />
                            <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                <Text style={_s.txt_Head}>Fred</Text>
                                <Text style={_s.txt_Grey}>let'go</Text>
                            </View>
                        </View>
                        <Text style={_s.txt_time}>2 hous ago</Text>
                    </View>

                    <View style={_s.borderView} />
                    <View style={_s.mainflexrow}>
                        <View style={_s.flexRow}>
                            <AvatarBtn />
                            <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                <Text style={_s.txt_Head}>Leon</Text>
                                <Text style={_s.txt_Grey}>let'go</Text>
                            </View>
                        </View>
                        <Text style={_s.txt_time}>2 hous ago</Text>

                    </View>
                    <View style={_s.borderView} />
                </>
            </View>
        </View>

    );
};

export default ChatHistoryScreen;

const _s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _c.white,
    },
    top: {
        height: vs(120),
        minWidth: '100%',
        justifyContent: "center",
    },
    txt_Head: {
        color: _c.black,
        fontFamily: _f.regularAlt,
        fontSize: _fs.s,
    },
    input: {
        height: '5%',
        width: '85%',
        borderRadius: 24,
        alignSelf: "center",
        overflow: 'visible',
        //textAlign: 'left',
        textAlignVertical: 'center',
        paddingVertical: 0,
        paddingHorizontal: 16,
        fontFamily: _f.eRegular,
        fontSize: _fs.s,
        backgroundColor: "#f8fafd"
    },
    mainflexrow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: formatHeight(5),
        paddingVertical: formatHeight(14),
        paddingHorizontal: formatHeight(12),
    },
    flexRow: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignSelf: "center"
    },
    txt_time: {
        color: _c.secondarylight,
        marginTop: formatHeight(4),
        fontFamily: _f.regular,
        fontSize: _fs.xs,
    },
    recent_dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: _c.redDark,
        alignSelf: "flex-end",
        marginTop: 16,
        marginRight: 16
    },
    txt_Grey: {
        color: _c.black,
        marginTop: formatHeight(4),
        fontFamily: _f.regular,
        fontSize: _fs.xs,
    },
    txt: {
        color: _c.secondaryText,
        fontSize: _fs.xl,
        fontFamily: _f.bold,
        lineHeight: formatWidth(23),
    },

    borderView: {
        backgroundColor: _c.secondarylight,
        height: 0.4,
        marginLeft: 80
    },
});
