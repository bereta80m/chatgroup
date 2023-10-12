import Image from 'next/image';
import React from 'react'
import {DocumentData,collection,query,orderBy} from "firebase/firestore"
import {motion} from "framer-motion"
import { ItemSVar } from './Sidebar';
import TimeStamp from './TimeStamp';
import moment from 'moment';


type Props = {
  message:DocumentData | undefined,
  user: { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; } | undefined; 
}


function Message({message,user}:Props) {
  const IsMyMessage  = message?.user._id === user?.email

  return (
    <>
    <motion.div variants={ItemSVar} className={`ClickOutsideBox py-5 text-white ${IsMyMessage && ''}`}>
          <div className='ClickOutsideBox flex space-x-5 px-10 max-w-2xl '>
            <Image src={message?.user.avatar} className="object-cover w-10 h-10 rounded-md" alt="" width={500} height={500} />
            <div className='ClickOutsideBox flex flex-col'>
            <div className='ClickOutsideBox flex items-center space-x-3 text-[#828282] '><p className='text-md font-semibold'>{message?.user.name}</p>  <TimeStamp createdAt={message?.createdAt} /> <p>{IsMyMessage && "Me"}</p></div>
            <p className='ClickOutsideBox pt-1 text-sm'>{message?.text}</p>
            </div>
          </div>
    </motion.div>
             {/*'formattedDate' && <div className="ClickOutsideBox date-divider  px-10">
             <div className="line"></div>
             <span className="date text-[#828282]">{'formattedDate'}</span>
             <div className="line"></div>
  </div>*/}
    </>
  )
}

export default Message
