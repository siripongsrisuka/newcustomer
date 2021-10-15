import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'

const CustomerHook = () => {
    const {state : {customerProfile},fetchUserProfile}= useContext(CustomerProfileContext)
    const fetchCustomerProfile = async () => {
        let userId = ' bpAX4bbGeYpD2mlPmhEj'
        await db.collection('customer').where("customerId","==",userId).get().then(function(snapshot){
            snapshot.forEach(function(docs){
                let object = docs.data()
                object.doc = docs.id
                customerProfile.push(object)
                fetchUserProfile(customerProfile)
            })
        });
        
        
    };
    
    return [fetchCustomerProfile];
}

export {CustomerHook};