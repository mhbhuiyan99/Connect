import Image from 'next/image'

const Comments = () => {
  return (
    <div>
      {/* write */}
      <div className='flex items-center gap-4'>
        <Image src="/image/addPhoto.png" alt="" width={32} height={32} className = "w-8 h-8 rounded-full"/>
      </div>



      {/* comments */}
    </div>
  )
}

export default Comments
