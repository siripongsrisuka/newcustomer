import {useContext} from 'react';
import db from '../../db/firestore'
import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'
import { AuthContext } from '../context';

const CustomerHook = () => {
    const {state : {customerProfile},fetchUserProfile}= useContext(CustomerProfileContext)
    const {state: {token}} = useContext(AuthContext);
    const fetchCustomerProfile = async () => {
        await db.collection('customer').where("customerId","==",token).get().then(function(snapshot){
            snapshot.forEach(function(docs){
                customerProfile.push({...docs.data(),id:docs.id})
                fetchUserProfile(customerProfile)
            })
        });  
    };
    
    return [fetchCustomerProfile];
}

export {CustomerHook};