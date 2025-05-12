import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'
import { useContext} from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const GenerateBtn = () => {
  const {user,setShowLogin}=useContext(AppContext)
  const navigate=useNavigate;

  const onClickHandler=()=>{
    if(user){
      navigate('/result')
    }
    else{
      setShowLogin(true)
    }
  }
  return (
    <motion.div className='flex flex-col items-center justify-center'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
      <h1 className='text-3xl font-semibold'>See the magic.Try now</h1>
      <button onClick={onClickHandler} className='flex items-center gap-2 text-white bg-black rounded-full sm:text-lg px-12 py-4 mb-6 mt-2 '>
        Generate Images
        <img className='h-6' src={assets.star_group} alt="" />
      </button>
    </motion.div>
  )
}

export default GenerateBtn
