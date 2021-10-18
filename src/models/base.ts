export interface QBModel {
    id: number
    qbId: number
    name: string
}

export interface TypeModel {
    id: number
    name: string
    sequence: number
    active: boolean
}

export interface ApiException {
    code: string | undefined
    message: string
}

