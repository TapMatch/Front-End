import React, {useContext, useEffect} from 'react';
import branch from 'react-native-branch';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';

const DeepLinkHandler = ({
    children, navigation, route,
    focusMapToLatLng, eventDetailsModalVisible
}: any) => {
    const {selectedCommunityData, eventMarkers, selectedMarkerData, upcomingEvents} = useContext(MainStackContext);
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
        let lastParams = await branch.getLatestReferringParams(); // params from last open
        if (route.name === 'Home') {
            if (lastParams) {
                console.log('05498750394OOOOOOOOOOOUUU', lastParams.tapmatch_data.coordinates);
                // setTimeout(
                //     () =>
                //         focusMapToLatLng(lastParams.tapmatch_data.coordinates)
                //     , 500);
                selectedMarkerData[1](lastParams.tapmatch_data);
                eventDetailsModalVisible[1](true);
            }
        } else {
            navigation.navigate('Home');
        }

    };
    return <>{children}</>;
};

export default DeepLinkHandler;
