
import CreateDataContext from './CreateDataContext';
import BrandPointData from '../Data/Brand'

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
    // console.log("userProfile")
    // console.log(userProfile)
    // console.log("userProfile")
};




export const {Provider,Context} = CreateDataContext(
    customerReducer,
    {fetchUserProfile},
    {   customerProfile:[]
    }
);

