
import moment from 'moment';
import React from 'react'


type Props ={
    createdAt:{
        seconds:number,
        nanoseconds:number
    }
}
function TimeStamp({createdAt}:Props) {
    //{"seconds":1696995365,"nanoseconds":842000000}
    const unixTimestamp = createdAt && createdAt.seconds + createdAt.nanoseconds / 1e9;
    const momentObj = moment.unix(unixTimestamp);
    const now = moment();
    const hoursDiff = now.diff(momentObj, 'hours');
    const daysDiff = now.diff(momentObj, 'days');
    let formattedTime;

    if (hoursDiff <= 1) {
      formattedTime = momentObj.format('LT');
    } else if (hoursDiff > 1 && hoursDiff <= 12) {
      formattedTime = momentObj.startOf('hour').fromNow();
    } else if (hoursDiff > 12 && hoursDiff <= 24) {
      formattedTime = momentObj.calendar();
    } else if (daysDiff > 2) {
      formattedTime = momentObj.format('LL');
    } else {
      // Si ninguno de los casos anteriores se cumple, usa un formato predeterminado
      formattedTime = momentObj.format('LLL');
    }
  

  return (
    <p className='text-sm '>
        {formattedTime}
    </p>
  )
}

export default TimeStamp
