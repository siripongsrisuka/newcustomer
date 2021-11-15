
import CreateDataContext from './CreateDataContext';

const brandMemberReducer = (state,action) => {
    
   
    switch(action.type){
        case 'getBrandMember':
            return{...state,brandMember:action.payload};
        case 'getBrandProfile':
            return{...state,brandProfile:action.payload};
        default:
            return state;
    }
    
};

const getBrandMember = (dispatch) =>  (data) => {
     dispatch({type:'getBrandMember',payload:data});
};

const getBrandProfile = (dispatch) =>  (data) => {
    dispatch({type:'getBrandProfile',payload:data});
};




export const {Provider,Context} = CreateDataContext(
    brandMemberReducer,
    {getBrandMember,getBrandProfile},
    {   brandMember:[],
        brandProfile:[],
    }
);
