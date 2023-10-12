"use client"
import React, { useEffect, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import {serverTimestamp} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { Message } from '@/typings'
import { useCollection } from 'react-firebase-hooks/firestore';
import {DocumentData,collection,query,addDoc} from "firebase/firestore"
import { db } from '../Firebase/FireConfig'
import { UseGlobal } from '../Context/GlobalContext'

type Props ={
    chatId:string
}
function SendMesages({chatId}:Props) {
    const [inputMessage, setInputMessage] = useState('')
    const { data: session } = useSession() 

    const HandleSendMessages = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!inputMessage) return;

        const message: Message ={
            text:inputMessage.trim(),
            createdAt:serverTimestamp(),
            user:{
                _id:session?.user?.email!,
                name:session?.user?.name!,
                avatar:session?.user?.image!
            }
        }
        await addDoc(
            collection(db, 'chatgroups', chatId, "messages"),
            message
        )
        setInputMessage('')
    } 


   
  
      return (
        <div className='w-full ClickOutsideBox text-sm rounded-lg'>
          <form onSubmit={HandleSendMessages} className='ClickOutsideBox flex mx-10 my-5 space-x-5 items-center bg-[#3c393f] rounded-md pl-2'>
            <input value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)} type="text" placeholder=" Type a message here " className='ClickOutsideBox flex-1 outline-none border-none  bg-transparent' />
            <span className='bg-[#2f80ed] p-2 rounded-md cursor-pointer ClickOutsideBox '><PaperAirplaneIcon className='w-6 h-6 '/></span>
          </form>
        </div>
      )
     

}

export default SendMesages
