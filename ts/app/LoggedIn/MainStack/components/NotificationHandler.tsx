import React, {useContext, useEffect} from 'react';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import OneSignal from 'react-native-onesignal';
import {useNavigation} from '@react-navigation/native';

const NotificationHandler = ({
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
        OneSignal.addEventListener('opened', onOpened);
        return () => {
            OneSignal.removeEventListener('opened', onOpened);
        };
    }, []);

    const onOpened = ({notification}: any) => {
        if (notification.hasOwnProperty('payload')) {
            if (notification.payload.hasOwnProperty('additionalData')) {
                if (notification.payload.additionalData.hasOwnProperty('event')) {
                    processNotification(notification.payload.additionalData.event);
                }
            }
        }
    };

    const processNotification = (event_data: any) => {
        console.log(route.name, 'HJHJHJHJHJHJHJHJHJHJHJHJHJHJ');
        if (route.name === 'Home') {
            const dlUserCommunity = userProfile[0].communities[0].find((el: any) => +el.id === +event_data.community_id);
            if (dlUserCommunity) {
                if (selectedCommunityData[0].id !== dlUserCommunity.id) {
                    selectedCommunityData[1](dlUserCommunity);
                }
            } else {
                const dlCommunity = allCommunities[0].find((el: any) => +el.id === +event_data.community_id);
                if (dlCommunity) {
                    communitySelectedForJoin[1](dlCommunity);
                    communitiesModalVisible[1](true);
                    communityCodeInputVisible[1](true);
                } else {
                    console.log('no such community');
                }
            }
            selectedMarkerData[1](event_data);
            if (eventDetailsModalVisible) {
                eventDetailsModalVisible[1](true);
            }
        } else {
            navigate('Home');
        }
    };
    return <>{children}</>;
};

export default NotificationHandler;
