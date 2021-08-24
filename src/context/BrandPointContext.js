import CreateDataContext from './CreateDataContext';
import BrandPointData from '../Data/Brand'

const BrandReducer = (state,action) => {

    switch(action.type){
        case 'getBrandData':
            return [...state,...action.payload];
        case 'decreasePoint':
            return state.map((brand) => {
                return brand.brandId === action.payload.brandId
                    ? action.payload
                    : brand; });
         default:
            return state;
    }
};


const getBrandData = (dispatch) => async() => {
    await dispatch({type:'getBrandData',payload:BrandPointData});
};


const decreasePoint = (dispatch) => (redeem) => {
    dispatch({type:'decreasePoint',payload: redeem })

}



export const {Context,Provider} = CreateDataContext(
    BrandReducer,
    {getBrandData,decreasePoint},
    []
)