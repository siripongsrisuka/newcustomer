
import * as firebase from 'firebase';

import 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// import {initializeApp} from 'firebase/app'

const configuration = {
    apiKey: "AIzaSyCsbx70zCFK-kQH64Na70LcBOPxuW1jkH4",
    authDomain: "authetication-72ec4.firebaseapp.com",
    projectId: "authetication-72ec4",
    storageBucket: "authetication-72ec4.appspot.com",
    messagingSenderId: "107386561764",
    appId: "1:107386561764:web:42f54ece7393e2565038f1",
    measurementId: "G-YH668X91W6"
}

firebase.initializeApp(configuration);
// initializeApp(configuration)

const db = firebase.firestore();
export const firebaseAuth = firebase.auth();


export const getCustomerProfile = () => {
    return db.collection('customerProfile')
    .get()
    .then(result => result.docs)
    .then(docs => docs.map(doc => ({
        customerId: doc.data().customerId,
        customerName: doc.data().customerName,
        email: doc.data().email,
        imageId: doc.data().imageId,
        detail: doc.data().detail,
        tel: doc.data().tel,
        address: doc.data().address,
        tombon: doc.data().tombon,
        district: doc.data().district,
        province: doc.data().province,
        state: doc.data().state,
        postcode: doc.data().postcode,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
        birthday: doc.data().birthday,
    })))


}

export const fetchBrandMember = () => {
    let data = []
    // console.log(data)
    return db.collection('brandMember').where("userId","==","siripong").where("brandId","==","pepsi").get().then(function(snapshot){
        snapshot.forEach(function(docs){
            data.push(docs.data())
            // console.log(data)
        })
    });

    
   
}

export const fetchCarousel = () => {
  let data = []
    // console.log(data)
    return db.collection('AdminSetting').doc('customerCarousel').get().then(function(snapshot){
        snapshot.forEach(function(docs){
          let xx = docs.data()
            data.push(xx.picture[0])
            // console.log(data)
        })
    });
    
      // return db
      // .collection('Carousel')
      // .get()
      // .then((qsnapshot) => {
      //   let arrObject = []
      //   if (qsnapshot.docs.length > 0) {
      //     qsnapshot.forEach(doc=>{
      //       arrObject.push(doc.data())
      //     })
      //     return arrObject[0].picture
      //   }
      // })
  }

  export const fetchShopCoupon = () => {
    const promise = new Promise((resolve,reject)=>{
      db
      .collection('AdminSetting')
      .doc('shopCoupon')
      .get()
      .then((qsnapshot) => {
        let arrObject = []
            arrObject.push(qsnapshot.data())
          return arrObject[0]?.picture
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
    });
    
    return promise
  }


export const signOut = async () => {
    await firebaseAuth.signOut();
}

export default db;