# Tap Match

## how project is organized

first of all you need to add `credentials.json` here you can store different IDs for various react-native SDKs

fonts are linked to android and ios projects via `npm run link` from `assets/fonts`
since font names formats are not same in ios and android,so I've added platform handling for that in `ts/UIConfig/fonts.ts` 

inside `ts/UIConfig` fou can find project's color palette and standardized font sizes


`ts/tools` folder contains scripts, that extend dev menu on ios/android various other development helpers, 

    !!! WARNING: before building release inside `ts/TopAppWrapper.tsx` you MUST switch `DEV_MODE` variable to `false`, ignoring this will cause ios app crash!!!

in project you can find various `package.json` files those are needed for shortening import routes, like this `import {_c} from 'ts/UIConfig/colors';`




















                                                                                                                                            
,--.           ,---.                                       ,--.                                  ,--.             ,--.  ,--.     ,--.            
|  |-.  ,---. /  .-' ,---. ,--.--. ,---.     ,--.--. ,---. |  |,---.  ,--,--. ,---. ,---.      ,-|  | ,---.     ,-'  '-.|  ,---. `--' ,---. .--. 
| .-. '| .-. :|  `-,| .-. ||  .--'| .-. :    |  .--'| .-. :|  | .-. :' ,-.  |(  .-'| .-. :    ' .-. || .-. |    '-.  .-'|  .-.  |,--.(  .-' '--' 
| `-' |\   --.|  .-'' '-' '|  |   \   --.    |  |   \   --.|  \   --.\ '-'  |.-'  `)   --.    \ `-' |' '-' '      |  |  |  | |  ||  |.-'  `).--. 
 `---'  `----'`--'   `---' `--'    `----'    `--'    `----'`--'`----' `--`--'`----' `----'     `---'  `---'       `--'  `--' `--'`--'`----' '--' 
                                                                                                                                                 




* remind Vlad to turn on community double join in joinCommunity


FILES WITH TESTER SECRETS THAT MUST BE REMOVED BEFORE PRODUCTION RELEASE
ts/app/LoggedIn/OnboardingStack/screens/CommunitiesScreen/CommunitiesScreen.tsx
ts/app/LoggedIn/OnboardingStack/screens/CommunitiesScreen/components/RequestCommunityBtn.tsx
ts/app/LoggedIn/OnboardingStack/screens/CommunitiesScreen/components/FeedbackBtn.tsx
ts/app/LoggedIn/MainStack/screens/HomeScreen/components/StdHeader/components/CommunityBtn.tsx

list of secrets
-- goto secret screen on CommunityBtn onlongpress
--  goto secret screen on RequestCommunityBtn onlongpress
-- make communities clickable with FeedbackBtn onlongpress (state comes from parent that is CommunitiesScreen)

SECRET SCREENS THAT HAVE TO BE REMOVED IN PRODUCTION
--- dont forget to remove them from navigators as well
ts/app/LoggedIn/MainStack/screens/SecretScreen.tsx
ts/app/LoggedIn/OnboardingStack/screens/SecretScreen.tsx