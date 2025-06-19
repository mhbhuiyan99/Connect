import Image from "next/image";
import Comments from "./Comments";

const Post = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* User */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image src="/image/addPhoto.png" alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium"> User </span>
                </div>
                <Image src="/image/more.png" width={16} height={16} alt="" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image src="/image/temp.webp"
                        fill
                        className="object-cover rounded-md"
                        alt=""
                    />
                </div>
                <p> Homepage temp. </p>
            </div>

            {/* Interraction */}
            <div className="flex items-center justify-between text-sm my-4">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/image/like.png"
                            width={16}
                            height={16}
                            alt=""
                            className="cursor-pointer"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123 <span className="hidden md:inline">Likes</span></span>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/image/comment.png"
                            width={16}
                            height={16}
                            alt=""
                            className="cursor-pointer"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123 <span className="hidden md:inline">Comments</span></span>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/image/share.png"
                            width={16}
                            height={16}
                            alt=""
                            className="cursor-pointer"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123 <span className="hidden md:inline">Shares</span></span>
                    </div>
                </div>
            </div>
            <Comments />
        </div>
    )
}
export default Post;