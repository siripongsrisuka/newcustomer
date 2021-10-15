
import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as ShopMemberContext} from '../context/ShopMemberContext'

const ShopMemberHook = () => {
    const {
        state : {
            shopMember,
            shopProduct,
            productCobrand,
            priceOff,
            buy1Get1,
            buy2Cheaper,
            buy2Free1
        },
        getShopMember,
        getShopProduct,
        getProductCobrand,
        getPriceOff,
        getBuy1Get1,
        getBuy2Cheaper,
        getBuy2Free1
    
    }= useContext(ShopMemberContext)

    const fetchShopMember = async () => {
        await db.collection('shopMember').where("userId","==","GkZhwokCkUgdKrmqhxRw").get().then(function(snapshot){
            snapshot.forEach(function(docs){
                let addId = docs.data()
                addId.doc = docs.id
                shopMember.push(addId)
                db.collection('shopProduct').where("shopId","==",addId.shopId).where("type","==","coBrand").get().then(function(snapshot){
                    snapshot.forEach(function(docs){
                        let product = docs.data()
                        let filter = productCobrand.filter((item)=>{return(item.sku == product.sku )})
                        if(filter.length == 1){
                            product.imageId = filter[0].imageId
                            product.shopImageId = addId.shopImageId
                            product.shopName = addId.shopName
                            product.shopTel = addId.shopTel
                            shopProduct.push(product)
                            getShopProduct(shopProduct);
                        } else {
                            db.collection('productCobrand').where("sku","==",product.sku).get().then(function(snapshot){
                                snapshot.forEach(function(docs){
                                    let xxx = docs.data()
                                    let promotion = xxx.promotion
                                    if(promotion.length > 0){
                                        if(promotion[0].detail == 'Price off'){
                                            priceOff.push(docs.data())
                                            getPriceOff(priceOff)
                                        } else if(promotion[0].detail == 'Buy 1 get 1'){
                                            buy1Get1.push(docs.data())
                                            getBuy1Get1(buy1Get1)
                                        } else if(promotion[0].detail == 'Buy 2 Cheaper'){
                                            buy2Cheaper.push(docs.data())
                                            getBuy2Cheaper(buy2Cheaper)
                                        } else {
                                            buy2Free1.push(docs.data())
                                            getBuy2Free1(buy2Free1)
                                        }
                                    }
                                    product.imageId = xxx.imageId
                                    product.shopName = addId.shopName
                                    product.shopImageId = addId.shopImageId
                                    product.shopTel = addId.shopTel
                                    shopProduct.push(product)
                                    getShopProduct(shopProduct); 
                                })
                            })
                            productCobrand.push(docs.data())
                            getProductCobrand(productCobrand);
                        }
                    });
                })
            });
            getShopMember(shopMember);
        })
    }
    return [fetchShopMember];
}
export {ShopMemberHook};