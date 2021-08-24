import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as BrandMemberContext} from '../context/BrandMemberContext'




const BrandMemberHook = () => {
    const {state : {brandMember,brandProfile},getBrandMember,getBrandProfile}= useContext(BrandMemberContext)

    const fetchBrandMember = async () => {
        await db.collection('brandMember').where("userId","==","GkZhwokCkUgdKrmqhxRw").get().then(function(snapshot){
            snapshot.forEach(function(docs){
                let addId = docs.data()
                addId.brandMemberDocId = docs.id
                db.collection('brand').where("brandId","==",addId.brandId).get().then(function(snapshot){
                    snapshot.forEach(function(docs){
                        let brand = docs.data()
                        addId.brandAdsImage = brand.brandAdsImage
                        addId.brandLogoId = brand.brandLogoId
                        
                        brandProfile.push(docs.data())
                        getBrandProfile(brandProfile);
                        
                    })
                    
                })
                brandMember.push(addId)
                getBrandMember(brandMember);     
            })
        });
        
    }

    return [fetchBrandMember];
}

export {BrandMemberHook};