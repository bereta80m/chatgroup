
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { db } from '../Firebase/FireConfig';
import { collection, addDoc,serverTimestamp } from "firebase/firestore"; 
import { toast } from 'react-toastify';

interface Props {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    HandleCloseModal: () => void;
    session:any
}
type MyInputs = {
    name:string,
    description:string
}

function ModalAdd({ HandleCloseModal, setIsModalOpen, isModalOpen,session }: Props) {
    const [InputValues, setInputValues] = useState<MyInputs>({
        name:'',
        description:''
    })
    const notify = (response:string) => toast(response);

    const HandleAddNewChannel =async(e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
  
        if (InputValues.name !== '' && InputValues.description !== '') {
            const docRef = await addDoc(collection(db, "chatgroups" ), {
                name: `${InputValues?.name}`,
                description: `${InputValues.description}`,
                createdAt:serverTimestamp(),
                myItems: {
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                    hidden: { opacity: 0, x: 20, transition: { duration: 0.2 } },
                  },
                  image:`${InputValues?.name.split(' ').map((i) => i.charAt(0).toUpperCase()).slice(0, 2) || ''} `,
                  route:`/${InputValues?.name}`
              });
              setInputValues({ 
            name:'',
              description:''})
              notify('Group Added Successfully');
              HandleCloseModal()
              console.log("Document written with ID: ", docRef.id);
        }
          
    } 


    return (
        <div className='grid place-items-center w-full h-screen  bg-black/25 fixed inset-0 z-50'>
            <AnimatePresence>
                <motion.div className='bg-[#120f13] w-[30%] h-[24rem] relative aspect-3/2  rounded-md shadow-xl '>
                    <XMarkIcon onClick={() => HandleCloseModal()} className='w-8 h-8 cursor-pointer absolute right-0 top-0 m-2' />
                    <div className='Container w-full h-full px-5 py-5 rounded-md'>
                        <form onSubmit={HandleAddNewChannel} className='grid gap-5'>
                            <p className='text-lg font-semibold'>NEW CHANNEL</p>
                            <input value={InputValues.name} name="name" onChange={(e)=>setInputValues((Prev)=> ({...Prev, [e.target.name]:e.target.value}))} type="text" className="py-2 px-2 outline-none border-none bg-[#3c393f] rounded-md max-w-md " placeholder='Channel name' />
                            <textarea rows={5} value={InputValues.description} onChange={(e)=>setInputValues((Prev)=> ({...Prev, [e.target.name]:e.target.value}))}  name="description" className="resize-none py-2 px-2 bg-[#3c393f] border-none outline-none rounded-md max-w-md" placeholder="Channel Description" />
                            <div className='flex items-center justify-end'>
                                <button onClick={(e)=>HandleAddNewChannel(e)}  className='bg-[#2f80ed] px-8 py-2 rounded-md'>Save</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    )
}

export default ModalAdd
