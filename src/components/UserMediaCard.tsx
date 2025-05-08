import Link from "next/link";
import Image from "next/image";

const UserMediaCard = ({userId}:{userId:string}) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">User Media</span>
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        </div>
        {/* Bottom */}
        <div className="flex gap-4 justify-between flex-wrap">
            
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/11739438/pexels-photo-11739438.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          
        </div>
      </div>
    );
}

export default UserMediaCard