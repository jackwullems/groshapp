import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const windowsFontScale = Dimensions.get('window').fontScale

export const HEIGHT = (h: number)=>{
    return (windowHeight/812)*h
}

export const WIDTH = (w: number)=>{
    return (windowWidth/375)*w
}

export const FONT = (f: number)=>{
    return f/windowsFontScale
}