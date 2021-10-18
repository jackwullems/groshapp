import {createAction} from '@reduxjs/toolkit'
import { UserModel } from 'models'

export const login = createAction<UserModel>('LOGIN')
