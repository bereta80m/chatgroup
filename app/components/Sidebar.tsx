"use client"
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, ChevronDownIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react"
import ChannelSelected from './ChannelSelected';
import ModalAdd from './ModalAdd';
import MyListGroup from './MyListGroup';
import { UseGlobal } from '../Context/GlobalContext';
import { UseDialogModal } from '../Context/DialogAndModalContext';

function Sidebar() {
  const [IsOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const {isModalOpen, setIsModalOpen,HandleCloseModal,HandleOpen,isDialogOpen,HandleClose,selectedGroup} = UseDialogModal()
  const {datos} = UseGlobal()


  useEffect(() => {
    const HandleWhenClick = (e:MouseEvent) =>{
      if (IsOpen && e.target instanceof Element && e.target.classList.contains('OutSideLog')) {
        setIsOpen(false);
      }
    }
    window.addEventListener('click', HandleWhenClick)
    return ()=>{
      window.removeEventListener('click', HandleWhenClick)
    }
  }, [IsOpen])


  const HandleModal = ()=>{
    setIsModalOpen(true)
  }


  return (
    <div className='bg-[#120f13] OutSideLog relative text-white md:block hidden h-screen  md:min-w-[20rem]'>

      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{
        duration: 0.3, ease: [0, 0.71, 0.2, 1.01], scale: {
          type: "spring",
          damping: 8,
          stiffness: 100,
          restDelta: 0.001
        }
      }} className='OutSideLog flex w-full px-5 justify-between drop-shadow-xl pb-5 text-white shadow-2xl  z-20 top-0 left-0 border-b-2 border-black/25 items-center p-2'>
        <p className='text-md font-semibold select-none  OutSideLog'>Channels</p>
        <span onClick={()=>HandleModal()} className='bg-[#252329] p-2 rounded-md cursor-pointer OutSideLog'> <PlusIcon className='w-4 h-4 z-30 text-white OutSideLog' /> </span>

      </motion.div>
      
      <div className='OutSideLog Search flex rounded-xl gap-2  items-center justify-center bg-[#3c393f] max-w-md py-2 px-4 mx-5'>
        <MagnifyingGlassIcon className='w-6 h-6' />
        <input type='text' className='flex-1 OutSideLog border-none outline-none bg-transparent' placeholder='Search...' />
      </div>
      <MyListGroup HandleOpen={HandleOpen} data={datos} />
      <div className='OutSideLog flex w-full absolute  bottom-0 left-0 bg-[#120f13]  px-4 py-3 z-50 '>
        <div className='flex  items-center w-full justify-between  '>
          {session && (<div className='flex gap-5 items-center space-x-2'>
            <Image src={session.user?.image!} className="object-cover w-10 h-10 rounded-md" alt='' width={500} height={500} />
            <p>{session.user?.name}</p>
          </div>)}
          {session && <motion.span animate={IsOpen ? "open" : "closed"} variants={{ open: { rotate: 180 }, closed: { rotate: 0 }}}  onClick={()=>setIsOpen(!IsOpen)}><ChevronDownIcon className='cursor-pointer w-8 h-8' /></motion.span> }
        </div>
      </div>
      {IsOpen && (<div className='absolute  bottom-12 right-0 px-4 py-3  w-[16rem] h-[15.5rem] z-40'>
        <motion.ul initial="hidden"
        animate="visible"
        variants={listVarType} className=' flex flex-col gap-2 bg-[#252329] w-full h-full px-3 py-3 rounded-lg'>
          <motion.li variants={ItemSVar} className='flex cursor-pointer rounded-lg gap-2 items-center py-3 hover:bg-[#3C393F] px-2 select-none'><UserCircleIcon className='w-6 h-6'/>My Profile</motion.li>
          <motion.li variants={ItemSVar} className='flex cursor-pointer rounded-lg gap-2 items-center py-3 hover:bg-[#3C393F] px-2 select-none'><div className='bg-polygon-conic bg-contain bg-no-repeat w-6 h-6 '/>Tweeter </motion.li>
          <motion.li variants={ItemSVar} className='border border-b-0 mt-5 border-white/25 rounded-xl '/>
          <motion.li onClick={()=>signOut()} variants={ItemSVar} className='flex cursor-pointer rounded-lg gap-2 items-center py-3 hover:bg-[#3C393F] px-2 text-red-500 select-none'><ArrowRightOnRectangleIcon className='h-6 w-6'/> Logout</motion.li>
        </motion.ul>
      </div>)}
      <ChannelSelected HandleClose={HandleClose} selectedGroup={selectedGroup} HandleOpen={HandleOpen} isDialogOpen={isDialogOpen} />
      {isModalOpen && <ModalAdd session={session} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} HandleCloseModal={HandleCloseModal} />}
    
    </div>
  )
}

export default Sidebar



export const listVarType = {
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05
    }
  },
  hidden: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  },
}

export const ItemSVar = {
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  hidden: { opacity: 0, x: 20, transition: { duration: 0.2 } },
}

