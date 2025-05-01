import Image from 'next/image';


const AddPost = () =>{
    return(
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm"> 
            {/* avatar */}
            <Image 
                src="" 
                alt="" 
                className='w-12 h-12 object-cover rounded-full'
                width={45}
                height={45}
            />
            {/* post */ }
            <div className="bg-red-100 flex-1">
                {/* text */} 
                <div className="flex">
                    <textarea placeholder="What's on your mind?" className='flex-1 bg-slate-100 rounded-lg p-2'> </textarea>
                    <Image
                        src="/image/emoji.png"
                        alt=""
                        width={20}
                        height={20}
                        className='w-5 h-5 curosr-pointer self-end'
                    />
                </div>
                {/* post options */}
                <div className='flex gap-6 it'>
                    <div className="flex items-center gap-4 mt-4 text-black">
                        <Image src="/image/addPhoto.png" alt="" width={20} height={20} />
                        Photo
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-black">
                        <Image src="/image/addVideo.png" alt="" width={20} height={20} />
                        Video
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-black">
                        <Image src="/image/poll.png" alt="" width={20} height={20} />
                        Poll
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-black">
                        <Image src="/image/addEvent.png" alt="" width={20} height={20} />
                        Event
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddPost;