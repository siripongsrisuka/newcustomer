
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
                addId.shopMemberDocId = docs.id
                shopMember.push(addId)
                db.collection('shopProduct').where("shopId","==",addId.shopId).where("type","==","coBrand").get().then(function(snapshot){
                    snapshot.forEach(function(docs){
                        let shop = docs.data()
                        let filter = productCobrand.filter((item)=>{return(item.sku == shop.sku )})
                        if(filter.length == 1){
                            shop.imageId = filter[0].imageId
                            shop.shopImageId = addId.shopImageId
                            shop.shopName = addId.shopName
                            shop.shopTel = addId.shopTel
                            shopProduct.push(shop)
                            getShopProduct(shopProduct);
                        } else {
                            db.collection('productCobrand').where("sku","==",shop.sku).get().then(function(snapshot){
                                snapshot.forEach(function(docs){
                                    let xxx = docs.data()
                                    let promotion = xxx.promotion
                                    if(promotion.length > 0){
                                        shop.promotionDetail = promotion[0].detail
                                        if(promotion[0].detail == 'ลดราคา'){
                                            priceOff.push(docs.data())
                                            getPriceOff(priceOff)
                                        } else if(promotion[0].detail == 'ซื้อ 1 แถม 1'){
                                            buy1Get1.push(docs.data())
                                            getBuy1Get1(buy1Get1)
                                        } else if(promotion[0].detail == 'ซื้อ 2 ชิ้นถูกกว่า'){
                                            buy2Cheaper.push(docs.data())
                                            getBuy2Cheaper(buy2Cheaper)
                                        } else {
                                            buy2Free1.push(docs.data())
                                            getBuy2Free1(buy2Free1)
                                        }
                                    }
                                    shop.imageId = xxx.imageId
                                    shop.shopName = addId.shopName
                                    shop.shopImageId = addId.shopImageId
                                    shop.shopTel = addId.shopTel
                                    shopProduct.push(shop)
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