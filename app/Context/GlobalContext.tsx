"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import {DocumentData,collection,query,orderBy} from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSession, signOut } from "next-auth/react"
import { db } from '../Firebase/FireConfig';

interface Props {
    chatSelected: DocumentData | null,
    setChatSelected:React.Dispatch<React.SetStateAction<DocumentData | null>>,
    datos: DocumentData[] | undefined
}
const GlobalContext = createContext<Props>({
    chatSelected: null,
    setChatSelected:() => {},
    datos: undefined,
})


function GlobalProvider({children}:{children:React.ReactNode}) {
    const [chatSelected, setChatSelected] = useState<DocumentData | null>(null)
    const { data: session } = useSession()
    const [chats, loading, error] = useCollection(session && query(collection(db,"chatgroups"), orderBy('createdAt', 'desc')))
    const datos:DocumentData[] | undefined = chats?.docs.map((i) => ({id:i.id, ...i.data()}));


  return (
    <GlobalContext.Provider value={{setChatSelected,chatSelected,datos}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
export const UseGlobal = ()=> useContext(GlobalContext)
