import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {vs} from 'react-native-size-matters';
import WindowHeader from './components/WindowHeader';
import CodeInput from './components/CodeInput';

interface CodeInputWindowProps {}

const CodeInputWindow = (props: CodeInputWindowProps) => {
  const code = useState<string>('');
  const txt = useLocalizedTxt();
  return (
    <View style={_s.container}>
      <WindowHeader />
      <View style={_s.content}>
        <View style={_s.txtContainer}>
          <Text style={[_s.txt, _s.title]}>UvA</Text>
          <Text style={[_s.txt, _s.city]}>Amsterdam</Text>
        </View>
        <CodeInput code={code} />
      </View>
    </View>
  );
};

export default CodeInputWindow;

const _s = StyleSheet.create({
  container: {
    paddingVertical: _fs.m,
    paddingHorizontal: _fs.xs,
    flex: 0.6,
    maxHeight: '60%',
    backgroundColor: _c.white,
    width: '80%',
    borderRadius: 20,
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
    fontSize: _fs.xxxxxl,
    color: _c.black,
    marginBottom: 2,
  },
  city: {
    fontSize: _fs.xxl,
    color: _c.grey,
  },
});
