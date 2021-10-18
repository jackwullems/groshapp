import React, { useEffect, useState } from "react"
import { appStyles, HEIGHT, WIDTH } from "assets"
import { FlatList, Text, View, ActivityIndicator, Pressable } from "react-native"
import { useTranslation } from 'react-i18next'
import en from 'dist/en.json'
import { getCurrent, getHouseholds } from "modules/api"
import { CategoryModel, HouseholdModel } from "models"
import { Divider, Image } from "react-native-elements"
import { AllScreenProps, CurrentScreenProps } from "../App"
import { handleException } from "modules/functions"

export const HouseHoldsCurrentScreen = ({route}: CurrentScreenProps) => {
    const id = route.params.id
    const { t, i18n } = useTranslation()
    const [categories, setCategories] = useState<CategoryModel[]>([])
    useEffect(()=>{
        getCurrent(id).then(result=>{
            setCategories(result)
        }).catch(exception=>handleException(exception))
    }, [])
    return (
        <View style={appStyles.container}>
            <FlatList
                data={categories}
                style={{margin: WIDTH(8)}}
                keyExtractor={(item, index)=>index.toString()}
                ListEmptyComponent={<ActivityIndicator/>}
                ItemSeparatorComponent={()=><Divider/>}
                renderItem={data=>{
                    const category = data.item
                    return (
                        <Pressable>
                            <Text>{`category: ${category.category}`}</Text>
                            {
                                category.groceries.map(grocery=>{
                                    return (
                                        <View key={grocery.id}>
                                            <Text>{`name: ${grocery.name}`}</Text>
                                            <Text>{`amount: ${grocery.amount}`}</Text>
                                            {grocery.image && <Image style={{width: '100%', height: HEIGHT(200), resizeMode: 'cover'}} source={{uri: grocery.image}}/>}
                                        </View>
                                    )
                                })
                            }
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}
export const HouseHoldsAllScreen = ({navigation}: AllScreenProps) => {
    const { t, i18n } = useTranslation()
    const [households, setHouseholds] = useState<HouseholdModel[]>([])
    useEffect(()=>{
        getHouseholds().then(result=>{
            setHouseholds(result)
        }).catch(exception=>handleException(exception))
    }, [])
    return (
        <View style={appStyles.container}>
            <FlatList
                data={households}
                style={{margin: WIDTH(8)}}
                keyExtractor={item=>item.id.toString()}
                ListEmptyComponent={<ActivityIndicator/>}
                ItemSeparatorComponent={()=><Divider/>}
                renderItem={data=>{
                    const household = data.item
                    return (
                        <Pressable
                            onPress={()=>{
                                navigation.push('Current', {id: household.id})
                            }}
                        >
                            <Text>{`name: ${household.name}`}</Text>
                            <Text>{`adminName: ${household.adminName}`}</Text>
                            <Text>{`size: ${household.size}`}</Text>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}