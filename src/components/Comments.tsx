import Image from 'next/image'

const Comments = () => {
  return (
    <div>
      {/* write */}
      <div className="flex items-center gap-4">
        <Image
          src="/image/addPhoto.png"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex-1 flex item-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
        <input
          type="text"
          placeholder="Write a comment...."
          className="bg-transparent outline-none flex-1"
        />
        {/* emoji comment
        <Image
          src="/image/emoji.png"
          alt=""
          width={16}
          height={16}
          className="cursor-pointer"
        />
        */}
      </div>

      {/* comments */}
      <div className="">
        {/*Comment*/}
        <div className="flex gap-4 justify-between mt-6">
          {/*AVATAR*/}
          <Image
            src="/image/addPhoto.png"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          {/*DESC*/}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">M. Bhuiyan</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quae
              distinctio quisquam aspernatur voluptatum, vitae nulla fugit
              laudantium accusantium laboriosam modi numquam aperiam totam nihil
              a omnis facilis? Cum, tempore.
            </p>
            <div className="flex item-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex item-center gap-4">
                <Image
                  src="/image/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>
              <div className=''>Reply</div>
            </div>
          </div>
          {/*ICON*/}
          <Image
            src="/image/more.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Comments
