import { store } from "reduxsaga/store"
import { apiBase } from "."
import base64 from 'react-native-base64'
import { CategoryModel, HouseholdModel } from "models"

interface GetPayload {
    url: string
    headers?: any,
    authorization?: boolean
}

interface PostPayload extends GetPayload {
    body?: FormData
}

export interface ApiException {
    code: string | undefined
    message: string
}

const setHeaderAuthrization = (headers: any)=>{
    const ret = headers?headers:{}
    ret['Authorization'] = `Basic ${base64.encode('john@groshapp.com:Jd1234')}`
    return ret
}

const checkStatus = async (response: Response) => {
    if (response.status != 200) {
        throw await response.json() as ApiException
    }
}

const checkError = (json: any) => {
    const errors = json['errors']
    var exception: ApiException
    if (errors) {
        const status = json['status']
        switch (status) {
            default:
                exception = {code: undefined, message: 'Unknown error'}
                break
        }
        throw exception
    }
}

export const getAPI = async ({url, headers, authorization}: GetPayload) => {
    console.log('url:', url)
    const response = await fetch(url, {
        method: 'GET',
        headers: authorization==false?headers:setHeaderAuthrization(headers),
    })
    await checkStatus(response)
    const json = await response.json()
    checkError(json)
    return json
}

const postAPI = async ({url, body, headers, authorization}: PostPayload) => {
    console.log('url:', url)
    const response = await fetch(url, {
        method: 'POST',
        headers: authorization==false?headers:setHeaderAuthrization(headers),
        body
    })
    await checkStatus(response)
    const json = await response.json()
    checkError(json)
    return json
}

export const getHouseholds = async () => {
    return await getAPI({url: `${apiBase}/users/me/households`}) as HouseholdModel[]
}

export const getCurrent = async (id: number) => {
    return await getAPI({url: `${apiBase}/households/${id}/current`}) as CategoryModel[]
}