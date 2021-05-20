const LOGIN = 'userdata/LOGIN';
const INSERT = 'userdata/INSERT';
const REMOVE = 'userdata/REMOVE';
const MESSAGE = 'userdata/MESSAGE';
const SETUSERID = 'userdata/SETUSERID';
const SETLIST = 'userdata/SETLIST'

export const login = () => ({type: LOGIN, payload:true});
export const insert = (input) => ({type:INSERT, payload:input});
export const remove = (partner) => ({type:REMOVE, payload:partner});
export const message = (msg) => ({type:MESSAGE, payload:msg});
export const userid = (id) => ({type:SETUSERID, payload:id});
export const setlist = (conversation) => ({type:SETLIST, payload:conversation});

const initialState = {isLogin:false, userId:"", conversation:[]};

const UserData = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, isLogin:action.payload};
        case SETUSERID:
            return {...state, userId:action.payload}
        case INSERT:
            let temp = {};
            temp[action.paylod.partner] = {photo:action.payload.photo,list:[]}
            return {...state, conversation:{...state.conversation, temp}}; 
        case REMOVE:  
            return {...state, conversation:{...state.conversation.filter(user=> user !== action.payload)}}; 
        case MESSAGE:
            // let target = {};
            for (const key in state.conversation) {
                if (state.conversation[key].partner===action.payload.partner) {
                    state.conversation[key].list.push(action.payload);
                    return {...state, conversation:{...state.conversation}};                    
                }
            }
            return;            
        case SETLIST:            
            state.conversation.push(action.payload);
            return {...state, conversation:[...state.conversation]}
        default:
            return state;
    }
}

export default UserData;