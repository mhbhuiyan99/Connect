import Link from "next/link";
import Image from "next/image";

const UserInfoCard = ({userId}:{userId:string}) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">User Information</span>
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col gap-4 text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-xl text-black">M. H.</span>
            <span className="text-sm">@Bhuiyan</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. At quidem
            ratione facere cum, illum eligendi earum repudiandae maiores.
          </p>
          <div className="flex items-center gap-2">
            <Image src="/image/map.png" alt="" width={16} height={16} />
            <span>
              Living in <b>Dhaka</b>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/image/school.png" alt="" width={16} height={16} />
            <span>
              Went to <b>MBSTU</b>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/image/work.png" alt="" width={16} height={16} />
            <span>
              Works at <b>XYZ Inc.</b>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <Image src="/image/link.png" alt="" width={16} height={16} />
              <Link href="https://mj.dev" className="text-blue-500 font-medium">
                mj.dev
              </Link>
            </div>
            <div className="flex gap-1 items-center">
            <Image src="/image/date.png" alt="" width={16} height={16} />
            <span>Joined May 2025</span>
            </div>
          </div>
          <button className="bg-blue-500 text-white text-sm rounded-md p-2">Follow</button>
          <span className="text-red-400 self-end text-xs cursor-pointer">Block User</span>
        </div>
      </div>
    );
}

export default UserInfoCard