import CreateDataContext from './CreateDataContext';

const BrandReducer = (state,action) => {

    switch(action.type){
        case 'fetchBrandPoint':
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


const fetchBrandPoint = (dispatch) => async() => {
    await dispatch({type:'fetchBrandPoint',payload:BrandPointData});
};


const decreasePoint = (dispatch) => (redeem) => {
    dispatch({type:'decreasePoint',payload: redeem })

}



export const {Context,Provider} = CreateDataContext(
    BrandReducer,
    {fetchBrandPoint,decreasePoint},
    []
)