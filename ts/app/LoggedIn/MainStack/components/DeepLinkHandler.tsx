import React, {useContext, useEffect} from 'react';
import branch from 'react-native-branch';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

const DeepLinkHandler = ({
    children, navigation, route,
    eventDetailsModalVisible
}: any) => {
    const {
        selectedCommunityData,
        selectedMarkerData,
        allCommunities,
        communitiesModalVisible,
        communitySelectedForJoin,
        communityCodeInputVisible
    } = useContext(MainStackContext);
    const {userProfile} = useContext(TapMatchContext);

    useEffect(() => {
        branch.subscribe(({error, params, uri}: any) => {
            if (error) {
                console.error('Error from Branch: ' + error);
                return;
            }
            return processDeepLink();
        });
    });

    const processDeepLink = async () => {
        let lastParams = await branch.getLatestReferringParams();
        if (route.name === 'Home') {
            if (lastParams.tapmatch_event_data) {
                const dlUserCommunity = userProfile[0].communities[0].find((el: any) => el.id === lastParams.tapmatch_community_id);
                if (dlUserCommunity) {
                    if (selectedCommunityData[0].id !== dlUserCommunity.id) {
                        selectedCommunityData[1](dlUserCommunity);
                    }
                } else {
                    const dlCommunity = allCommunities[0].find((el: any) => el.id === lastParams.tapmatch_community_id);
                    if (dlCommunity) {
                        communitySelectedForJoin[1](dlCommunity);
                        communitiesModalVisible[1](true);
                        communityCodeInputVisible[1](true);
                    } else {
                        console.log('no such community');
                    }
                }

                // const dlEvent = eventMarkers[0].find((el: any) => el.id === lastParams.tapmatch_event_data);
                // console.log('05498750394OOOOOOOOOOOUUU', lastParams.tapmatch_event_data.coordinates);
                selectedMarkerData[1](lastParams.tapmatch_event_data);
                eventDetailsModalVisible[1](true);
            }
        } else {
            navigation.navigate('Home');
        }

    };
    return <>{children}</>;
};

export default DeepLinkHandler;
