import {Platform, Share} from 'react-native';
import callAlert from 'ts/utils/callAlert';
import branch from 'react-native-branch';
import {constants} from 'ts/constants/constants';

const shareContent = async (data: any, userProfile: any) => {
  try {
    let branchUniversalObject = await branch.createBranchUniversalObject(
      `event-${data.name}-${data.id}`,
      {
        locallyIndex: true,
        title: 'TapMatch',
        contentDescription: 'TapMatch',
        contentMetadata: {
          customMetadata: {
            tapmatch_community_id: `${data.community_id}`,
            tapmatch_event_data: JSON.stringify(data),
          },
        },
      },
    );
    let linkProperties = {
      feature: 'share',
      channel: `TapMatch ${Platform.OS} app`,
    };
    let controlParams = {
      $url_redirect_mode: 2,
      $deeplink_path: 'Home',
      $desktop_url: constants.websiteURL,
    };
    let {url} = await branchUniversalObject.generateShortUrl(
      linkProperties,
      controlParams,
    );

    const community = userProfile[0].communities[0].find(
      (el: any) => el.id === data.community_id,
    );

    if (community) {
      const {access: communityAccessCode, name: communityName} = community;
      const result = await Share.share({
        message: generateMsg(url, communityAccessCode, communityName),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result, 'result-on');
        } else {
          console.log(result, 'result-off');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissedAction');
      }
    }
  } catch (error) {
    console.log(error, '::: shareContent');
    callAlert(undefined, error.message);
  }
};

function generateMsg(url: string, code: string, name: string) {
  if (code) {
    return `${name}\nJoin our event!\nThe access code to enter the community is ${code} \n ${url}`;
  } else {
    return `Lets go to ${name}:\n${url}\nThe Access Code to ${name} is ${code}\n`;
  }
}

export default shareContent;
