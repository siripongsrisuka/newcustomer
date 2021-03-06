import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as BrandMemberContext} from '../context/BrandMemberContext'
import { AuthContext } from '../context';




const BrandMemberHook = () => {
    const {state : {brandProfile},getBrandMember,getBrandProfile}= useContext(BrandMemberContext)
    const {state: {token}} = useContext(AuthContext);

    const fetchBrandMember = async () => {
        let res = []
        await db.collection('brandMember').where("userId","==",token).get().then(function(snapshot){
            snapshot.forEach(function(docs){
                
                let addId = docs.data()
                addId.doc = docs.id
                db.collection('brand').where("brandId","==",addId.brandId).get().then(function(snapshot){
                    snapshot.forEach(function(doc){
                        let brand = doc.data()
                        addId.brandAdsImage = brand.brandAdsImage
                        addId.brandLogoId = brand.imageId
                        brandProfile.push({...doc.data(),id:doc.id})
                        getBrandProfile(brandProfile); 
                    })
                })
                res.push(addId)
                   
            })
        });
        getBrandMember(res);  
        
    }

    return [fetchBrandMember];
}

export {BrandMemberHook};