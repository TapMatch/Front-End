import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import branch from 'react-native-branch';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {getAllCommunities} from 'ts/app/common/api/getAllCommunities';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';
import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import logAxiosError from 'ts/utils/logAxiosError';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';

const DeepLinkHandler = ({
    children, route,
    eventDetailsModalVisible
}: any) => {
    const {
        selectedCommunityData,
        selectedMarkerData,
        allCommunities,
        eventMarkers,
        communitiesModalVisible,
        communitySelectedForJoin,
        communityCodeInputVisible,
        eventToGoToAfterDeeplinkCommunityJoin
    } = useContext(MainStackContext);
    const {userProfile, user_has_passed_onboarding, LoggedIn, userToken} = useContext(TapMatchContext);
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

    // console.log(userToken[0], 'userToken[0]');
    const processDeepLink = async () => {
        let lastParams = await branch.getLatestReferringParams();
        if (typeof lastParams?.tapmatch_event_data === 'string') {
            if (route.name === 'Home') {

                try {
                    const options: AxiosRequestConfig = {
                        method: 'GET',
                        url: `${tapMatchServerUrl}api/profile`,
                        headers: {
                            'X-Auth-Token': userToken[0],
                            'Content-Type': 'application/json',
                        },
                    };
                    // axios
                    //     .request(options)
                    //     .then(async ({data}: any) => {
                    //         if (data) {

                    const {data} = await axios.request(options);
                    const c = data.communities[0];
                    const dlUserCommunity = await c.find((el: any) => +el.id === +lastParams.tapmatch_community_id);

                    if (typeof dlUserCommunity !== 'undefined') {
                        // console.log('SCENARIO 1');
                        if (selectedCommunityData[0].id !== dlUserCommunity.id) {
                            await selectedCommunityData[1](dlUserCommunity);
                        }
                        selectedMarkerData[1](JSON.parse(lastParams.tapmatch_event_data));
                        if (eventDetailsModalVisible) {
                            await eventDetailsModalVisible[1](true);
                        }
                        await getEventMarkers({
                            id: selectedCommunityData[0].id,
                            userToken: userToken[0],
                            eventMarkers,
                        });
                    } else {// user is not a member of the community, that deep link is referring to
                        // console.log('SCENARIO 2');

                        if (allCommunities[0].length === 0) {
                            await getAllCommunities({
                                userToken: userToken[0],
                                communities: allCommunities,
                                LoggedIn,
                                userProfile,
                                user_has_passed_onboarding
                            }).then((x) => {
                                processCommunityJoin(lastParams, x);
                            });
                        } else {
                            await processCommunityJoin(lastParams, allCommunities[0]);
                        }
                    }
                    // }
                    // }).catch(error => {
                    //     logAxiosError(error, '---deeplink');
                    // });

                } catch (error) {
                    if (DEV_MODE) {
                        console.log(error, '=========deeplink');
                    }
                }
            } else {
                navigate('Home');
            }
        }

    };

    const processCommunityJoin = (lastParams: any, arr: any) => {
        const dlCommunity = arr.find((el: any) => +el.id === +lastParams.tapmatch_community_id);
        if (dlCommunity) {
            communitySelectedForJoin[1](dlCommunity);
            communitiesModalVisible[1](true);
            communityCodeInputVisible[1](true);
            eventToGoToAfterDeeplinkCommunityJoin[1](JSON.parse(lastParams.tapmatch_event_data));
        } else {
            console.log('no such community');
        }

    };

    return <>{children}</>;
};

export default DeepLinkHandler;
