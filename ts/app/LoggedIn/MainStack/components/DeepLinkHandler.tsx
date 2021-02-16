import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import branch from 'react-native-branch';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

const DeepLinkHandler = ({
    children, route,
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
    const {navigate} = useNavigation();

    useEffect(() => {
        branch.subscribe(({error, params, uri}: any) => {
            if (error) {
                console.log('Error from Branch: ' + error);
                return;
            }
            return processDeepLink();
        });
    }, []);

    const processDeepLink = async () => {
        let lastParams = await branch.getLatestReferringParams();
        if (typeof lastParams?.tapmatch_event_data === 'string') {
            if (route.name === 'Home') {
                const dlUserCommunity = userProfile[0].communities[0].find((el: any) => +el.id === +lastParams.tapmatch_community_id);
                if (dlUserCommunity) {
                    if (selectedCommunityData[0].id !== dlUserCommunity.id) {
                        selectedCommunityData[1](dlUserCommunity);
                    }
                } else {
                    const dlCommunity = allCommunities[0].find((el: any) => +el.id === +lastParams.tapmatch_community_id);
                    if (dlCommunity) {
                        communitySelectedForJoin[1](dlCommunity);
                        communitiesModalVisible[1](true);
                        communityCodeInputVisible[1](true);
                    } else {
                        console.log('no such community');
                    }
                }
                selectedMarkerData[1](JSON.parse(lastParams.tapmatch_event_data));
                if (eventDetailsModalVisible) {
                    eventDetailsModalVisible[1](true);
                }
            } else {
                navigate('Home');
            }
        }

    };
    return <>{children}</>;
};

export default DeepLinkHandler;
