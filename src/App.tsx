import { NavigationContainer } from "@react-navigation/native"
import { appColors } from "assets"
import React from "react"
import { SafeAreaView, StatusBar } from "react-native"
import rootSaga from 'reduxsaga/saga'
import { RootState } from "reduxsaga/reducers"
import {store, sagaMiddleware} from 'reduxsaga/store'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import { HouseHoldsAllScreen, HouseHoldsCurrentScreen } from "screens"
import {i18n} from "assets"
import Toast from "react-native-toast-message"

sagaMiddleware.run(rootSaga)

type RootStackParam = {
    All: undefined
    Current: {
        id: number
    }
}
const Stack = createStackNavigator<RootStackParam>()
export type AllScreenProps = StackScreenProps<RootStackParam, 'All'>
export type CurrentScreenProps = StackScreenProps<RootStackParam, 'Current'>

const Root = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Group screenOptions={{headerShown: true}}>
                            <Stack.Screen name='All' component={HouseHoldsAllScreen}/>
                            <Stack.Screen name='Current' component={HouseHoldsCurrentScreen}/>
                        </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}
export default () => {
	return (
		<>
			<SafeAreaView style={{flex: 0, backgroundColor: appColors.background}}/>
			<SafeAreaView style={{flex: 1, backgroundColor: appColors.background}}>
				<StatusBar barStyle='dark-content' hidden={false} backgroundColor={appColors.background}/>
				<Root/>
                <Toast ref={(ref) => Toast.setRef(ref)} position='bottom' />
			</SafeAreaView>
		</>
	)
}

