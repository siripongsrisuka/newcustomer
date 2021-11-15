import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as BrandMemberContext} from '../context/BrandMemberContext'




const BrandMemberHook = () => {
    const {state : {brandMember,brandProfile},getBrandMember,getBrandProfile}= useContext(BrandMemberContext)

    const fetchBrandMember = async () => {
        let res = []
        await db.collection('brandMember').where("userId","==","GkZhwokCkUgdKrmqhxRw").get().then(function(snapshot){
            snapshot.forEach(function(docs){
                
                let addId = docs.data()
                addId.doc = docs.id
                db.collection('brand').where("brandId","==",addId.brandId).get().then(function(snapshot){
                    snapshot.forEach(function(docs){
                        let brand = docs.data()
                        addId.brandAdsImage = brand.brandAdsImage
                        addId.brandLogoId = brand.imageId
                        brandProfile.push(docs.data())
                        getBrandProfile(brandProfile);
                        
                    })
                    
                })
                res.push(addId)
                   
            })
        });
        getBrandMember(res);  
        console.log("res")
        console.log(res)
        console.log("res")
        
    }

    return [fetchBrandMember];
}

export {BrandMemberHook};