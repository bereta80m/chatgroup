"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import {DocumentData,collection,query,orderBy} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { db } from '../Firebase/FireConfig';
import Message from './Message';
import {motion} from "framer-motion"
import { listVarType } from './Sidebar';
import moment from 'moment';
type Props = {
    id:string;
}
function ChatContent({id}:Props) {
    const { data: session } = useSession()                      
    const [messages,loading] = useCollection(session && query(collection(db,"chatgroups", id, 'messages'),
    orderBy('createdAt', 'asc')))
    const ScreenRef = useRef<HTMLDivElement | null>(null)

    const ScrollToBottom = ()=>{
      if (ScreenRef?.current) {
        const Container = ScreenRef.current
        Container.scrollTo({
          top:Container.scrollHeight,
          behavior:'smooth'
        })
      }
    }
    useEffect(() => {
      ScrollToBottom()
    }, [messages])
  


      return (
        <motion.div ref={ScreenRef} initial="hidden"animate="visible" variants={listVarType} className='ClickOutsideBox flex-1 overflow-y-auto overflow-x-hidden '>
          {messages?.empty && ( 
            <>
            <p className='mt-10 text-center text-white'>Type A message below to get started!</p>
            </>
          )}
          {messages && messages?.docs.map((message)=>(
            <Message key={message.id} message={message.data()} user={session?.user} />
          ))}
        </motion.div>
      )

}

export default ChatContent
