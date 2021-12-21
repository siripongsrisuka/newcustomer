export const stringDateTime = () => {
    const today = new Date();
    const cDateTime =
        today.getDate().toString().padStart(2,"0") + "/"+
        parseInt(today.getMonth()+1).toString().padStart(2,"0") +"/"+
        today.getFullYear().toString().padStart(4,"0")+" " +
        today.getHours().toString().padStart(2,"0")+":"+
        today.getMinutes().toString().padStart(2,"0")+":"+
        today.getSeconds().toString().padStart(2,"0");

    return cDateTime;  // 27/06/2021 00:25:26
}

export const stringDateTime2 = (today) => {
    // const today = new Date();
    const cDateTime =
        today.getDate().toString().padStart(2,"0") + "/"+
        parseInt(today.getMonth()+1).toString().padStart(2,"0") +"/"+
        today.getFullYear().toString().padStart(4,"0")
    return cDateTime;  // 27/06/2021 
}
export function getDuration(date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }

export const stringDtNumOnly = (today) => {
    // const today = new Date();
    const cDateTime =
        today.getDate().toString().padStart(2,"0") +
        parseInt(today.getMonth()+1).toString().padStart(2,"0") +
        today.getFullYear().toString().padStart(4,"0")+
        today.getHours().toString().padStart(2,"0")+
        today.getMinutes().toString().padStart(2,"0")+
        today.getSeconds().toString().padStart(2,"0");

    return cDateTime;  // 27062021002526
}

export const stringDtNumOnly2 = (today) => {
    // const today = new Date();
    const cDateTime =
        today.getFullYear().toString().padStart(4,"0")+
        parseInt(today.getMonth()+1).toString().padStart(2,"0") +
        today.getDate().toString().padStart(2,"0") +
        today.getHours().toString().padStart(2,"0")+
        today.getMinutes().toString().padStart(2,"0")+
        today.getSeconds().toString().padStart(2,"0");

    return cDateTime;  // 20210612002526
}




export const stringYMDHMS = () => {
    const today = new Date();
    const cDateTime =
        today.getFullYear().toString().padStart(4,"0")+
        parseInt(today.getMonth()+1).toString().padStart(2,"0") +
        today.getDate().toString().padStart(2,"0") +
        today.getHours().toString().padStart(2,"0")+
        today.getMinutes().toString().padStart(2,"0")+
        today.getSeconds().toString().padStart(2,"0");

    return cDateTime;  // 20210627002526
}







export const stringDate = () => {
    const today = new Date();
    const cDate =
        today.getDate() + "/"+
        parseInt(today.getMonth()+1) +"/"+
        today.getFullYear();

    return cDate;
}

export const stringYMD = () => {
    const today = new Date();
    const Y = today.getFullYear().toString();
    const preM = parseInt(today.getMonth()+1).toString();
    const M = preM.length === 1 ? '0' + preM :preM;
    const D = today.getDate().toString();

    const YMD = Y + M + D;

    return YMD;
}

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];