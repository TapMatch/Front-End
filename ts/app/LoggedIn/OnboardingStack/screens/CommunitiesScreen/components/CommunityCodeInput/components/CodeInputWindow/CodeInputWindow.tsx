import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import WindowHeader from './components/WindowHeader';
import CodeInput from './components/CodeInput';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {useDimensions} from '@react-native-community/hooks';

interface CodeInputWindowProps {
  community: any;
}

const CodeInputWindow = ({community}: CodeInputWindowProps) => {
  const code = useState<string>('');
  const errorState = useState<boolean>(false);
  const txt = useLocalizedTxt();
  const {height} = useDimensions().screen;
  const {city, name, id} = community;

  return (
    <View style={[_s.container, {maxHeight: height * 0.52}]}>
      <WindowHeader />
      <View style={_s.content}>
        <View style={_s.txtContainer}>
          <Text style={[_s.txt, _s.title]}>{name}</Text>
          <Text style={[_s.txt, _s.city]}>{city}</Text>
        </View>
        <Text style={[_s.txt, _s.errorState, {opacity: errorState[0] ? 1 : 0}]}>
          {txt.errorWrongCode}
        </Text>
        <CodeInput code={code} communityId={id} errorState={errorState} />
      </View>
    </View>
  );
};

export default CodeInputWindow;

const _s = StyleSheet.create({
  container: {
    paddingVertical: _fs.m,
    paddingHorizontal: _fs.xs,
    flex: 1,
    backgroundColor: _c.white,
    width: '80%',
    borderRadius: 20,
  },
  errorState: {
    marginBottom: 10,
    fontSize: _fs.m,
    color: _c.main_red,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regularAlt,
  },
  content: {
    flex: 1,
    minWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txtContainer: {
    height: '30%',
    minWidth: '100%',
    marginVertical: '13%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: _fs.x5l * 1.3,
    color: _c.black,
    marginBottom: 2,
  },
  city: {
    fontSize: _fs.xxl * 1.1,
    color: _c.grey,
  },
});
