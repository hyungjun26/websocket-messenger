const NEWPARTNER = 'conversationlist/NEWPARTNER';
const NEWMESSAGE = 'conversationlist/NEWMESSAGE';
const RECEIVED = 'conversationlist/RECEIVED';

export const insertPartner = (partner) => ({type:NEWPARTNER, payload:partner});
export const insertMessage = (msg) => ({type:NEWMESSAGE, payload:msg});
export const receive = (msg) => ({type:RECEIVED, payload:msg});

const initialState = [];

const ConversationList = (state=initialState, action) => {
    switch (action.type) {
        case NEWPARTNER:       
            state[action.payload.partner] = [...action.payload.list];
            return {...state};
        case NEWMESSAGE:
            state[action.payload.to] = [...state[action.payload.to], action.payload];
            return {...state};
        case RECEIVED:
            state[action.payload.author] = [...state[action.payload.author], action.payload];
            return {...state};
        default:
            return state;
    }
}

export default ConversationList;