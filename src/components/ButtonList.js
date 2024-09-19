import React from 'react'
import Button from './Button'
import { useSelector } from 'react-redux'

const ButtonList = () => {
  const isMenuOpen = useSelector((state)=> state.app.isMenuOpen)
  
  return (
    <div className={`mt-12 ${isMenuOpen ? 'ml-40' : ''}`}>
      <Button/>
    </div>
  )
}

export default ButtonList