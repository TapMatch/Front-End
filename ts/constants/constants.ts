import {DEV_MODE} from 'ts/tools/devModeTrigger';

export const constants = {
  termsOfUseUrl_EN: 'https://vradov.space/',
  privacyPolicy_EN: 'https://www.blender.org/',
  requestCommunityURL: 'https://www.tapmatchapp.com/community',
  feedbackURL: 'https://www.tapmatchapp.com/support'
};

export const tapMatchServerUrl = DEV_MODE ? 'http://194.147.32.47/' : 'http://159.65.199.71/';
