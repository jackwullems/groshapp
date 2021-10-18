import { createReducer } from "@reduxjs/toolkit"
import { login } from "reduxsaga/actions"
interface UserStore {
}

const initialUser: UserStore = {
}
export default createReducer(initialUser, builder=>{
    builder.addCase(login, (state, action)=>{
    })
})