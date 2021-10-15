
import CreateDataContext from './CreateDataContext';

const shopMemberReuscer = (state,action) => {
    
   
    switch(action.type){
        case 'getShopMember':
            return{...state,shopMember:action.payload};
        case 'getShopMember':
            return{...state,shopProfile:action.payload};
        case 'getShopProduct':
            return{...state,shopProduct:action.payload};
        case 'getProductCobrand':
            return{...state,productCobrand:action.payload};
        case 'getPriceOff':
            return{...state,priceOff:action.payload};
        case 'getBuy1Get1':
            return{...state,buy1Get1:action.payload};
        case 'getBuy2Cheaper':
            return{...state,buy2Cheaper:action.payload};
        case 'getBuy2Free1':
            return{...state,buy2Free1:action.payload};
        default:
            return state;
    }
    
};

const getShopMember = (dispatch) =>  (data) => {
     dispatch({type:'getShopMember',payload:data});
      console.log("getShopMember")
    console.log(data)
    console.log("getShopMember")
};

const getShopProfile = (dispatch) =>  (data) => {
    dispatch({type:'getShopProfile',payload:data});
        console.log("getShopProfile")
    console.log(data)
    console.log("getShopProfile")
};


const getShopProduct = (dispatch) =>  (data) => {
    dispatch({type:'getShopProduct',payload:data});
    // console.log("getShopProduct")
    // console.log(data)
    // console.log("getShopProduct")
};

const getProductCobrand = (dispatch) =>  (data) => {
    dispatch({type:'getProductCobrand',payload:data});
    // console.log("getProductCobrand")
    // console.log(data)
    // console.log("getProductCobrand")

};

const getPriceOff = (dispatch) =>  (data) => {
    dispatch({type:'getPriceOff',payload:data});
    // console.log("getPriceOff")
    // console.log(data)
    // console.log("getPriceOff")
};

const getBuy1Get1 = (dispatch) =>  (data) => {
    dispatch({type:'getBuy1Get1',payload:data});
};

const getBuy2Cheaper = (dispatch) =>  (data) => {
    dispatch({type:'getBuy2Cheaper',payload:data});
    // console.log("getBuy2Cheaper")
    // console.log(data)
    // console.log("getBuy2Cheaper")
};

const getBuy2Free1 = (dispatch) =>  (data) => {
    dispatch({type:'getBuy2Free1',payload:data});
};

export const {Provider,Context} = CreateDataContext(
    shopMemberReuscer,
    {getShopMember,getShopProfile,getShopProduct,getProductCobrand,getPriceOff,getBuy1Get1,getBuy2Cheaper,getBuy2Free1},
    {   shopMember:[],
        shopProfile:[],
        shopProduct:[],
        productCobrand:[],
        priceOff:[],
        buy1Get1:[],
        buy2Cheaper:[],
        buy2Free1:[],
    }
);
