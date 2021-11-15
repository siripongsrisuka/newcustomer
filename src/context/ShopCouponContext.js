import {fetchShopCoupon as firebaseFetchSC} from '../../db/firestore'
import CreateDataContext from './CreateDataContext';

const ShopCouponReducer = (state,action) => {
    switch(action.type){
        case 'fetchShopCoupon':
            return [...action.payload];
        default:
            return state;
    }
};


const fetchShopCoupon = (dispatch) => async () => {

    dispatch({type:'fetchShopCoupon',payload:await firebaseFetchSC()})
    let datedae = await firebaseFetchSC()
/*     console.log("chexkDate")
    console.log(datedae)
    console.log("chexkDate") */
    
}


export const {Provider,Context} = CreateDataContext(
    ShopCouponReducer,
    {fetchShopCoupon},
    []
);