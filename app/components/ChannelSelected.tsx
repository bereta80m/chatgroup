"use client"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon,ChevronDownIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { UseGlobal } from '../Context/GlobalContext'
import { useCollection } from 'react-firebase-hooks/firestore';
import {DocumentData,collection,query,orderBy} from "firebase/firestore"
import { db } from '../Firebase/FireConfig'

type Props = {
    isDialogOpen: boolean,
    HandleOpen: (item: DocumentData | null) => void;
    HandleClose: () => void;
    selectedGroup: DocumentData | null
}

 
const ChannelSelected = ({ HandleOpen, selectedGroup, isDialogOpen, HandleClose }: Props) => {
    const scrollRef = useRef<HTMLUListElement | null>(null)
    const [hasReachedBottom, setHasReachedBottom] = useState(false)
    const [messages,loading] = useCollection(selectedGroup && query(collection(db,"chatgroups", selectedGroup?.id, 'messages'),
    orderBy('createdAt', 'asc')))
    const {datos} = UseGlobal()
    const NewData = messages && messages?.docs.flatMap((i)=> i.data())
    const uniqueUserIds:DocumentData = new Set();
    const NewArray:DocumentData[]  = [];

    const FiltroReduce = NewData?.forEach((data)=>{
        const username:DocumentData = data.user._id
        if (!uniqueUserIds.has(username)) {
            uniqueUserIds.add(username);
            NewArray.push(data.user);
        }
    })



    useEffect(() => {
        const HandleScroll = ()=>{
            if (scrollRef.current) {
                const {scrollHeight, clientHeight,scrollTop} = scrollRef.current
                if (scrollTop + clientHeight === scrollHeight) {
                    setHasReachedBottom(true)
                }
                else{
                    setHasReachedBottom(false)
                }
            }
        }
        scrollRef?.current?.addEventListener("scroll", HandleScroll)
        return ()=> scrollRef?.current?.removeEventListener("scroll", HandleScroll)
    }, [selectedGroup])

    const ScrollToBottom = ()=>{
        if (scrollRef?.current) {
            const Container = scrollRef.current
            Container.scrollTo({
                top:Container.scrollHeight,
                behavior:'smooth'
            })
        }
    }

    const HandleSendEmails = async()=>{
        /*const payload = {
            to:['santiagomatias@gmail.com'],
            subject:"Hello my friend",
        }

        try {
            const data = await fetch('/api/send',{
                method:'POST',
                body: JSON.stringify(payload)
            })
            const response = await data.json()
            if (response) {
             console.log(response)   
            }
        } catch (error) {
            console.log(error)
        }*/
    }

    return (
        <>
            {isDialogOpen && (
                <div className='absolute w-full h-screen top-0 left-0  bg-[#120f13] overflow-y-auto OutSideLog '>
                    <AnimatePresence>
                        <motion.div className="bg-[#120f13] w-full h-screen OutSideLog relative" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} >
                            <div className='Dialog-content pt-3 px-3 OutSideLog'>
                                <span onClick={() => HandleClose()} className='flex items-center gap-3 cursor-pointer OutSideLog'>
                                    <ChevronLeftIcon className='w-6 h-6  ' />
                                    <p className='font-semibold '>All Channels</p>
                                </span>
                                <div className=' flex flex-col gap-3 px-3  pt-8  OutSideLog'>
                                    <h1 className='text-lg font-bold OutSideLog'>{selectedGroup?.name}</h1>
                                    <div className='max-h-44 overflow-y-auto rounded-md'>
                                    <p className='OutSideLog text-justify pr-2'>{selectedGroup?.description}</p>
                                    </div>
                                </div>
                                <div className='px-3 pt-8  OutSideLog mx-auto'>
                                    <h1 className='font-bold text-xl pb-5 OutSideLog'>Members</h1>
                                    <ul ref={scrollRef} style={{overflow: "auto", scrollbarWidth: "none",msOverflowStyle: "none"}}  className='mx-auto OutSideLog flex flex-col overflow-y-auto rounded-md gap-5 h-[14rem] my-auto md:h-[24rem] overflow-x-hidden  '>
                                        {!loading && NewArray?.map((item, index) => (
                                            <motion.li key={index} initial={{ opacity: 0, x: 100 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ root: scrollRef }} className='flex items-center gap-5 OutSideLog cursor-pointer '>
                                                <Image src={item?.avatar!} className='w-12 h-12 object-cover rounded-md OutSideLog' alt='' width={500} height={500} />
                                                <p className='text-lg font-semibold OutSideLog'>{item?.name}</p>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                            {!hasReachedBottom && <div className="w-full flex items-center justify-center bottom-20 md:bottom-20 h-7  absolute z-30 "><ChevronDownIcon className='h-8 w-8 cursor-pointer' onClick={()=>ScrollToBottom()}/></div>}

                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </>
    )
}

export default ChannelSelected

interface People {
    image?: string;
    name: string;
}

const AllMembers: People[] = [{
    image: 'https://firebasestorage.googleapis.com/v0/b/chatgroup-452c7.appspot.com/o/flowers-276014_1280.jpg?alt=media&token=23fc8303-26dc-4d54-a127-84dcb55c314f&_gl=1*tl5yg3*_ga*MTM5MjA2MTgyNy4xNjkyMDI1NzI5*_ga_CW55HF8NVT*MTY5Njg1ODI1Ni4yOC4xLjE2OTY4NTg0NDMuMzkuMC4w',
    name: 'Frabian Eli'
}, {
    image: 'https://firebasestorage.googleapis.com/v0/b/chatgroup-452c7.appspot.com/o/flowers-276014_1280.jpg?alt=media&token=23fc8303-26dc-4d54-a127-84dcb55c314f&_gl=1*tl5yg3*_ga*MTM5MjA2MTgyNy4xNjkyMDI1NzI5*_ga_CW55HF8NVT*MTY5Njg1ODI1Ni4yOC4xLjE2OTY4NTg0NDMuMzkuMC4w',
    name: 'Frabian Eli'
}, {
    image: 'https://firebasestorage.googleapis.com/v0/b/chatgroup-452c7.appspot.com/o/flowers-276014_1280.jpg?alt=media&token=23fc8303-26dc-4d54-a127-84dcb55c314f&_gl=1*tl5yg3*_ga*MTM5MjA2MTgyNy4xNjkyMDI1NzI5*_ga_CW55HF8NVT*MTY5Njg1ODI1Ni4yOC4xLjE2OTY4NTg0NDMuMzkuMC4w',
    name: 'Frabian Eli'
}]

