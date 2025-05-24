import getProfileReducer from '../slice/getProfileSlice';
import getListUserReducer from '../slice/getListUserSlice';
import addNewUserReducer from '../slice/addNewUserSlice';
import deleteUserReducer from '../slice/deleteUserSlice';

export const combineUserReducers = {
    get_rofile: getProfileReducer,
    get_list_user: getListUserReducer,
    add_new_user: addNewUserReducer,
    delete_user: deleteUserReducer,
};