
import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as ShopMemberContext} from '../context/ShopMemberContext'
import { AuthContext } from '../context';

const ShopMemberHook = () => {
    const {
        state : {
            shopMember,
            shopProduct,
            productCobrand,
        },
        getShopMember,
        getShopProduct,
        getProductCobrand,
    }= useContext(ShopMemberContext)
    const {state: {token}} = useContext(AuthContext);

    const fetchShopMember = async () => {
        // shopProduct = productของทุกร้าน
        // shopMember = shopmember ของทุกร้าน
        // shopCobrand = รายละเอียดของสินค้า
        await db.collection('shopMember').where("userId","==",token).get().then(function(snapshot){
            snapshot.forEach(function(docs){
                let addId = docs.data()
                addId.doc = docs.id
                shopMember.push(addId)
                db.collection('shopProduct').where("shopId","==",addId.shopId).where("type","==","coBrand").get().then(function(snapshot){
                    snapshot.forEach(function(docs){
                        let product = docs.data()
                        let filter = productCobrand.filter((item)=>{return(item.sku == product.sku )})
                        if(filter.length == 1){
                            shopProduct.push(product)
                            getShopProduct(shopProduct);
                        } else {
                            db.collection('productCobrand').where("sku","==",product.sku).get().then(function(snapshot){
                                snapshot.forEach(function(docs){
                                    shopProduct.push(product)
                                    getShopProduct(shopProduct); 
                                    productCobrand.push(docs.data())
                                    getProductCobrand(productCobrand);
                                })
                            })
                            
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