
import React from 'react'
import SendMesages from '@/app/components/SendMesages';
import ChatContent from '@/app/components/ChatContent';

type Props = {
    params: {
        id: string
    }
}

function Chat({ params }: Props) {
    const { id } = params
  
    return (
        <div className='w-full h-screen pt-14 bg-[#252329] text-white'>
            <div className='flex flex-col h-full  overflow-hidden '>
                <ChatContent id={id} />
                <SendMesages chatId={id} />
            </div>
        </div>
    )
}

export default Chat
