import {combineReducers} from 'redux'
import userReducer from './User/userReducer'
import menuReducer from './Menu/menuReducers'
import cartReducer from './Cart/cartReducer'

export default combineReducers({
    user : userReducer,
    menu : menuReducer,
    cart : cartReducer
})