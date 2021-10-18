export interface HouseholdModel {
    id: number
    name: string
    adminName: string
    adminId: number
    settings: number
    fav: number
    useCategories: boolean
    size: number
}

export interface GroceryModel {
    id: number
    amount: number
    name: string
    note: string
    groceryId: number
    image?: string
}

export interface CategoryModel {
    category: number
    groceries: GroceryModel[]
}