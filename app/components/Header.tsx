"use client"
import { useEffect } from 'react'
import { MagnifyingGlassIcon,Bars3Icon } from '@heroicons/react/24/solid'
import { UseGlobal } from '../Context/GlobalContext'
import { usePathname } from 'next/navigation'
import { UseDialogModal } from '../Context/DialogAndModalContext'

function Header() {
    const {chatSelected,datos} = UseGlobal()
    const { openMainDialog, setOpenMainDialog, handleCloseMainDialog } = UseDialogModal()
    const pathname = usePathname()
    const Filtro = datos?.filter((i)=> i.id === pathname.split('/')[2])[0]

    return (
        <header className='ClickOutsideBox absolute flex bg-[#252329] drop-shadow-xl text-white shadow-2xl z-20 top-0 left-0 border-b-2 border-black/25   w-full items-center p-4'>
            <Bars3Icon onClick={()=>setOpenMainDialog(!openMainDialog)} className='w-6 h-6 md:hidden block cursor-pointer  '/>
            <p className='ClickOutsideBox text-sm font-semibold px-10'>{Filtro?.name || 'No chats Selected'}</p>

        </header>
    )
}

export default Header




/*
        <header className='flex flex-col h-screen p-2'>
            <div className='flex-1'>
                <div>
                    NewChats 
                    <NewChat />
                    <div>ModelSelection </div>

                    Map through the ChatRows 

                </div>
            </div>
        </header>

*/