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
import PrevBtn from './components/PrevBtn';
import Title from './components/Title';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import CloseIcon from 'assets/svg/close-black.svg';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

interface TapperScreenProps {
    navigation: any;
}

const TapperScreen = ({ navigation }: TapperScreenProps) => {
    const { width } = useWindowDimensions();
    const { top } = useSafeAreaInsets();
    const txt = useLocalizedTxt();
    const iconSize = _fs.xxl * 0.5;

    return (
        <View style={[_s.container]}>
            <View style={[_s.top, { paddingTop: top }]}>
                <Title />
                <PrevBtn />
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
            <ScrollableTabView
                style={{ marginTop: 8 }}
                initialPage={1}
                tabBarTextStyle={{ fontSize: _fs.s, fontFamily: _f.regularAlt }}
                tabBarActiveTextColor={_c.black}
                tabBarUnderlineStyle={{ backgroundColor: _c.greyLight, borderWidth: 0, }}
                renderTabBar={() => <DefaultTabBar style={{ borderWidth: 0 }} />}
            >
                <View tabLabel='UCL' style={{ flex: 1, margin: formatHeight(20) }}>
                    <>
                        <Text style={_s.txt_Head}>Friends @UCL</Text>
                        <View style={_s.friend_hcl_row}>
                            <AvatarBtn />
                            <Text style={_s.txt_friend_hcl_name}>Fred</Text>
                        </View>
                        <View style={_s.friend_hcl_row}>
                            <AvatarBtn />
                            <Text style={_s.txt_friend_hcl_name}>Leon</Text>
                        </View>
                        <View style={_s.friend_hcl_row}>
                            <AvatarBtn />
                            <Text style={_s.txt_friend_hcl_name}>Sarah</Text>
                        </View>
                    </>

                    <Text style={[_s.txt_Red, { textAlign: "center" }]}>See All</Text>
                    <View style={{ margin: formatHeight(16) }} />
                    <Text style={_s.txt_Head}>Tappers @UCL</Text>
                    <>
                        <View style={_s.mainflexrow}>
                            <View style={_s.flexRow}>
                                <AvatarBtn />
                                <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                    <Text style={_s.txt_Head}>Fred</Text>
                                    <Text style={_s.txt_Grey}>friends with Ben & sarah</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={_s.red_Border} >
                                <Text style={_s.txt_Red}>+ Add</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={_s.borderView} />
                        <View style={_s.mainflexrow}>
                            <View style={_s.flexRow}>
                                <AvatarBtn />
                                <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                    <Text style={_s.txt_Head}>Samantha</Text>
                                    <Text style={_s.txt_Grey}>no connection</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={_s.red_Border} >
                                <Text style={_s.txt_Red}>+ Add</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    <Text style={[_s.txt_Red, { textAlign: "center" }]}>See All</Text>

                </View>
                <View tabLabel='ADD FRIENDS' style={{ flex: 1, margin: formatHeight(20) }}>
                    <Text style={_s.txt_Head}>Friend Request (3)</Text>
                    <>
                        <View style={_s.mainflexrow}>
                            <View style={_s.flexRow}>
                                <AvatarBtn />
                                <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                    <Text style={_s.txt_Head}>Fred</Text>
                                    <Text style={_s.txt_Grey}>friends with Ben & sarah</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={{ alignSelf: "center", marginRight: 16 }}>
                                    <CheckCircleRed height={_fs.xxl} width={_fs.xxl} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignSelf: "center" }}>
                                    <CloseIcon height={iconSize} width={iconSize} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={_s.borderView} />
                        <View style={_s.mainflexrow}>
                            <View style={_s.flexRow}>
                                <AvatarBtn />
                                <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                    <Text style={_s.txt_Head}>Samantha</Text>
                                    <Text style={_s.txt_Grey}>no connection</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={{ alignSelf: "center", marginRight: 16 }}>
                                    <CheckCircleRed height={_fs.xxl} width={_fs.xxl} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignSelf: "center" }}>
                                    <CloseIcon height={iconSize} width={iconSize} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                    <Text style={_s.txt_Head}>Suggested (10)</Text>
                    <>
                        <View style={_s.mainflexrow}>
                            <View style={_s.flexRow}>
                                <AvatarBtn />
                                <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                    <Text style={_s.txt_Head}>Fred</Text>
                                    <Text style={_s.txt_Grey}>friends with Ben & sarah</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={_s.red_Border} >
                                    <Text style={_s.txt_Red}>+ Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignSelf: "center", marginLeft: 12 }}>
                                    <CloseIcon height={iconSize} width={iconSize} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={_s.borderView} />
                        <View style={_s.mainflexrow}>
                            <View style={_s.flexRow}>
                                <AvatarBtn />
                                <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                    <Text style={_s.txt_Head}>Samantha</Text>
                                    <Text style={_s.txt_Grey}>no connection</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={_s.red_Border} >
                                    <Text style={_s.txt_Red}>+ Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignSelf: "center", marginLeft: 12 }}>
                                    <CloseIcon height={iconSize} width={iconSize} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                    <Text style={_s.txt_Head}>Invite Contacts (10)</Text>
                    <>
                        <View style={_s.mainflexrow}>
                            <View style={_s.flexRow}>
                                <AvatarBtn />
                                <View style={{ alignSelf: "center", marginLeft: formatHeight(20) }}>
                                    <Text style={_s.txt_Head}>Fred</Text>
                                    <Text style={_s.txt_Grey}>friends with Ben & sarah</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={_s.red_Border} >
                                <Text style={_s.txt_Red}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    <Text style={[_s.txt_Red, { textAlign: "center" }]}>See All</Text>
                </View>

            </ScrollableTabView>
        </View>

    );
};

export default TapperScreen;

const _s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _c.white,
    },
    top: {
        paddingBottom: formatHeight(25),
        backgroundColor: _c.white,
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
        paddingVertical: formatHeight(14),
        paddingHorizontal: formatHeight(12),
    },
    flexRow: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignSelf: "center"
    },
    friend_hcl_row: {
        flexDirection: "row",
        marginTop: formatHeight(20),
        marginLeft: formatHeight(12)
    },
    txt_friend_hcl_name: {
        alignSelf: "center",
        marginLeft: formatHeight(20),
        color: _c.black,
        fontFamily: _f.regularAlt,
        fontSize: _fs.m
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: _c.white,
        width: formatWidth(300),
        paddingTop: formatWidth(56),
        paddingLeft: formatWidth(47),
        paddingRight: formatWidth(50),
        paddingBottom: formatWidth(56),
    },
    txt_Red: {
        color: _c.main_red,
        fontFamily: _f.regularAlt,
        fontSize: _fs.s,
        alignSelf: "center"
    },
    txt_Grey: {
        color: _c.black,
        marginTop: formatHeight(4),
        fontFamily: _f.regular,
        fontSize: _fs.xs,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: _c.white,
    },
    txt: {
        color: _c.secondaryText,
        fontSize: _fs.xl,
        fontFamily: _f.bold,
        lineHeight: formatWidth(23),
    },
    red_Border: {
        width: 80,
        padding: formatHeight(8),
        alignSelf: "center",
        borderColor: _c.main_red,
        borderWidth: 1,
        borderRadius: 12,
    },
    borderView: {
        backgroundColor: _c.grey,
        height: 0.4,
        marginLeft: 80
    },
});
