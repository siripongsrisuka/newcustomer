import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'

const CustomerHook = () => {
    const {state : {customerProfile},fetchUserProfile}= useContext(CustomerProfileContext)
    const fetchCustomerProfile = async () => {
        let userId = 'GkZhwokCkUgdKrmqhxRw'
        await db.collection('customer').where("customerId","==",userId).get().then(function(snapshot){
            snapshot.forEach(function(docs){
                customerProfile.push(docs.data())
                fetchUserProfile(customerProfile)
            })
        });
        
        
    };
    
    return [fetchCustomerProfile];
}

export {CustomerHook};