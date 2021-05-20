import {combineReducers} from 'redux';
import userdata from './UserData'
import conversationlist from './ConversationList'

const rootReducer = combineReducers({
    userdata,
    conversationlist
});

export default rootReducer;