import {DEV_MODE} from 'ts/tools/devModeTrigger';

export const constants = {
  termsOfUseUrl_EN: 'https://www.tapmatchapp.com/general-3',
  privacyPolicy_EN: 'https://www.tapmatchapp.com/general-2',
  requestCommunityURL: 'https://www.tapmatchapp.com/community',
  feedbackURL: 'https://www.tapmatchapp.com/support',
};

export const tapMatchServerUrl = DEV_MODE
  ? 'http://194.147.32.47/' // development server
  : 'http://159.65.199.71/'; // production server
