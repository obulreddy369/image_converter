import React, { useContext } from 'react'
import {assets} from '../assets/assets';
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const {user,setShowLogin}=useContext(AppContext)
  const navigate=useNavigate();

  const onClickHandler=()=>{
    if(user){
      navigate('/result')
    }
    else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-19'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
      <motion.div className='inline-flex text-stone-500 text-center gap-2 bg-white py-5 px-2 rounded-full border border-neutral-200'
      initial={{opacity:0,y:-20}}
      transition={{delay:0.2,duration:0.8}}
      animate={{opacity:1,y:0}}
      >
        <p>Best text to generate image</p>
        <img src={assets.star_icon} alt="" />

      </motion.div>
      
      <motion.h1 className='text-4xl sm:text-7xl max-w-[300px] sm:max-w-[590px] mx-auto mt-10 text-center'>Turn Text to <span className='text-blue-500'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.4,duration:2}}
      >image</span> in seconds</motion.h1>
      <p className='text-center max-w-xl mx-auto mt-5'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.6,duration:2}}
      >Unleash your creativity with AI,Turn your imagination into visual art in seconds </p>
      <motion.button onClick={()=>onClickHandler()} className='w-auto flex items-center gap-2 text-white bg-black rounded-full sm:text-lg px-12 py-1.5 mt-8'
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
      >
        Generate image
        <img className='h-6' src={assets.star_group} alt="" />
      </motion.button>
      <div className='flex flex-wrap justify-center mt-14 gap-3'>
        {Array(6).fill('').map((item,index)=>(
            <img className='rounded hover:scale-105 transition-all cursor-pointer duration-300 max-sm:w-10' src={index%2===0?assets.sample_img_1:assets.sample_img_2} key={index} alt="" width={70}/>
        ))}
        
      </div>
      <p className='text-neutral-600 mt-2'>Generated images from imagify</p>
    </motion.div>
  )
}

export default Header
