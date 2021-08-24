import {DEV_MODE} from 'ts/tools/devModeTrigger';

export const constants = {
  termsOfUseUrl_EN: 'https://www.tapmatchapp.com/general-3',
  privacyPolicy_EN: 'https://www.tapmatchapp.com/general-2',
  requestCommunityURL: 'https://www.tapmatchapp.com/community',
  feedbackURL: 'https://www.tapmatchapp.com/support',
  websiteURL: 'https://www.tapmatchapp.com',
};

export const tapMatchServerUrl = DEV_MODE
  ? 'http://192.168.108.131:8000/' // development server
  : 'http://159.65.199.71/'; // production server
