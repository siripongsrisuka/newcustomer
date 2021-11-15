
import CreateDataContext from './CreateDataContext';

const customerReducer = (state,action) => {
   
    switch(action.type){
        case 'fetchUserProfile':
            return{...state,customerProfile:action.payload};
        default:
            return state;
    } 
};



const fetchUserProfile = (dispatch) => async (userProfile) => {
    await dispatch({type:'fetchUserProfile',payload:userProfile});
};




export const {Provider,Context} = CreateDataContext(
    customerReducer,
    {fetchUserProfile},
    {   customerProfile:[]
    }
);

