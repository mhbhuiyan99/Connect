import Image from 'next/image';
const Ad = ({size}:{size: "sm" | "md" | "lg"}) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg shadow-md text-sm">
        {/* TOP */}
        <div className="flex item-center justify-between text-gray-500 font-medium">
          <span>Sponsored Ads</span>
          <Image src="/image/more.png" alt="" width={16} height={16} />
        </div>
        {/* BOTTOM */}
        <div
          className={`flex flex-col mt-4 ${size == "sm" ? "gap-2" : "gap-4"}`}
        >
          <div className={`relative w-full ${size=="sm" ? "h-24" : size=="md" ? "h-36" : "h-48"}`}>
            <Image
              src="https://images.pexels.com/photos/17200811/pexels-photo-17200811/free-photo-of-great-bougainvillea-flowers-growing-on-tree.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              //src="/image/network.png"
              alt=""
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div>

          </div>
        </div>
      </div>
    );
 
 }
 
 export default Ad