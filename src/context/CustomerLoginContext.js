
import CreateDataContext from './CreateDataContext';
import db from '../../db/firestore'
const customerLoginReducer = (state,action) => {

    switch(action.type){
        case 'fetchCustomerLogin':
            return[...action.payload];
        default:
            return state;
    }
    
};

const fetchCustomerLogin = (dispatch) => async () => {
    db.collection('AdminSetting')
    .doc('customerLogin')
    .get()
    .then((qsnapshot) => {
        let xx = qsnapshot.data()
        dispatch({type:'fetchCustomerLogin',payload:xx.picture});
    })
};


export const {Provider,Context} = CreateDataContext(
    customerLoginReducer,
    {fetchCustomerLogin},
    []
);
