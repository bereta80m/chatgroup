"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { DocumentData } from 'firebase/firestore'

interface Props {
    HandleOpen: (item: DocumentData | null) => void;
    isDialogOpen: boolean;
    setIsDialogOpen:React.Dispatch<React.SetStateAction<boolean>>;
    HandleClose:()=>void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    HandleCloseModal: () => void;
    setSelectedGroup: React.Dispatch<React.SetStateAction<null>>;
    selectedGroup: DocumentData | null;
    handleCloseMainDialog: () => void;
    openMainDialog:boolean;
    setOpenMainDialog:React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogAndModalContext = createContext<Props>({
    isDialogOpen:false,
    HandleOpen:()=>{},
    setIsDialogOpen:()=>{},
    HandleClose:()=>{},
    setIsModalOpen:()=>{},
    isModalOpen: false,
    HandleCloseModal:()=>{},
    setSelectedGroup:()=>{},
    selectedGroup:null,
    handleCloseMainDialog:()=>{},
    openMainDialog:false,
    setOpenMainDialog:()=>{},
})


function DialogAndModalProvider({ children }: { children: ReactNode }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<DocumentData | null>(null)
    const [openMainDialog, setOpenMainDialog] = useState(false)

    const handleCloseMainDialog = () =>{
        if (openMainDialog) {
            setOpenMainDialog(false)
        }
    }

    const HandleOpen = (item: DocumentData | null) => {
        if (!isDialogOpen) {
            setIsDialogOpen(true)
            setSelectedGroup(item)
        }
    }
    const HandleClose = () => {
        if (isDialogOpen) {
            setIsDialogOpen(false)
        }
    }
    const HandleCloseModal = ()=>{
        if (isModalOpen) {
            setIsModalOpen(false)
        }
    }

    return (
        <DialogAndModalContext.Provider value={{openMainDialog, setOpenMainDialog,handleCloseMainDialog,selectedGroup,setSelectedGroup,HandleCloseModal,isModalOpen,setIsModalOpen,HandleOpen,HandleClose,setIsDialogOpen,isDialogOpen}}>
            {children}
        </DialogAndModalContext.Provider>
    )
}

export default DialogAndModalProvider

export const UseDialogModal = () => useContext(DialogAndModalContext)