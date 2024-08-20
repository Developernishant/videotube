import React from 'react'

const ChatMessage = ({name,message}) => {
  return (
    <div className='flex m-2 items-center shadow-sm'>
        <img className='w-6 h-6 mr-1' alt='img' src='https://iili.io/dMFq2X2.md.png' />
        <span className='font-bold mr-1 text-lg'> {name} </span>
        <span>{message}</span>
    </div>
  )
}
export default ChatMessage