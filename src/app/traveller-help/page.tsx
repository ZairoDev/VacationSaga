import React from 'react'
import Input from "@/shared/Input";
function page() {
  return (
    <div className='w-full justify-center m-4 p-4 flex items-center'>
        <div className='w-1/2'>
           <Input className='mr-10 ' type="text" placeholder="what to ask....?" />
        </div>
        
    </div>
  )
}

export default page
