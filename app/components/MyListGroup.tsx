import React from 'react'
import {motion,AnimatePresence} from "framer-motion"
import { DocumentData } from "firebase/firestore"
import Link from 'next/link'
import { listVarType } from './Sidebar'



type Props = {
  data:DocumentData[] | undefined,
  HandleOpen: (item: DocumentData | null) => void
}

const MyListGroup = ({data,HandleOpen}:Props) =>  {

  if (data) {
    return (
      <motion.ul initial="hidden"
      animate="visible"
      variants={listVarType} className='OutSideLog grid gap-5  max-w-md mx-5 my-8 overflow-y-auto  overflow-x-hidden  h-[15rem] md:h-[24rem]  '>
      {data && data?.map((item, index) => (
        <Link key={index} href={`/chat/${item.id}`}><motion.li  key={index} onClick={()=>HandleOpen(item)}  variants={item.myItems} className='OutSideLog hover:bg-[#3c393f]  rounded-md cursor-pointer flex items-center gap-2'><span className='OutSideLog flex items-center justify-center bg-[#3c393f] text-center w-12 h-10 rounded-md '><p>{item.image}</p></span> <p className='OutSideLog text-sm font-bold uppercase'>{item.name}</p></motion.li></Link>
      ))}
    </motion.ul>

    )
  }
}

export default MyListGroup


