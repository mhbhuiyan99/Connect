import Image from "next/image";
import NextLink from 'next/link'; 

const ProfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/30029972/pexels-photo-30029972/free-photo-of-snow-capped-mountain-range-in-winter.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/30403731/pexels-photo-30403731/free-photo-of-sunset-view-of-mount-teide-in-tenerife.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col items-center">
        <span className="font-semibold">M. J. BH.</span>
        <div className="flex items-center gap-4 ">
          <div className="flex">
          <Image
          src="https://images.pexels.com/photos/30403731/pexels-photo-30403731/free-photo-of-sunset-view-of-mount-teide-in-tenerife.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={12}
          height={12}
          className="rounded-full object-cover w-3 h-3 "
        />
        <Image
          src="https://images.pexels.com/photos/30403731/pexels-photo-30403731/free-photo-of-sunset-view-of-mount-teide-in-tenerife.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={12}
          height={12}
          className="rounded-full object-cover w-3 h-3 "
        />
        <Image
          src="https://images.pexels.com/photos/30403731/pexels-photo-30403731/free-photo-of-sunset-view-of-mount-teide-in-tenerife.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={12}
          height={12}
          className="rounded-full object-cover w-3 h-3 "
        />
          </div>
          <span className="text-xs text-gray-500">100 Followers</span>
        </div>
        <NextLink href="\profile\1"> {/* Use NextLink and specify the path */}
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md"> My Profile</button>
        </NextLink>
      </div>
    </div>
  );
};

export default ProfileCard;