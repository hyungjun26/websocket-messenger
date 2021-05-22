import {combineReducers} from 'redux';
import userdata from './UserData'
import conversationlist from './ConversationList'

require('dotenv').config();

const rootReducer = combineReducers({
    userdata,
    conversationlist
});

export default rootReducer;