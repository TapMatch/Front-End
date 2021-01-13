import {Share} from "react-native";
import callAlert from "ts/utils/callAlert";
import branch from 'react-native-branch';

const shareContent = async (data: any) => {
    try {
        let branchUniversalObject = await branch.createBranchUniversalObject(`event-${data.name}-${data.id}`, {
            locallyIndex: true,
            title: 'TabMatch',
            contentDescription: 'TabMatch',
            // contentMetadata: {data}
        });
        let linkProperties = {
            feature: 'share',
            channel: 'TabMatch app'
        };

        let controlParams = {
            $url_redirect_mode: 2,
            $deeplink_path: 'Home',
            tapmatch_data: data
            // $desktop_url: 'http://desktop-url.com/monster/12345'
        };

        let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams);
        console.log(url, '🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸');
        const result = await Share.share({
            message: `TabMatch is a cool app!\n ${url}`,
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
    } catch (error) {
        console.log(error, '::: shareContent');
        callAlert(undefined, error.message);
    }
};

export default shareContent;