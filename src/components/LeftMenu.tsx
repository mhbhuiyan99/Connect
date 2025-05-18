import ProfileCard from "./ProfileCard";
import Link from "next/link";
import Image from "next/image";

const LeftMenu = ({type}:{type:"home" | "profile"}) =>{
    return (
      <div className="flex flex-col gap-6">
        {type == "home" && <ProfileCard />}
        <div className="p-4 bg-white rounded-lg shadow-lg text-sm text-gray-500 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
          >
            <Image src="/image/posts.png" alt="" width={20} height={20} />
            <span>My Posts</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />

          <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
          >
            <Image src="/image/activity.png" alt="" width={20} height={20} />
            <span>Activity</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />

          {/*<Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
          >
            <Image src="/image/events.png" alt="" width={20} height={20} />
            <span>Events</span>
          </Link>*/}
          <hr className="border-t-1 border-gray-50 w-36 self-center" />

          <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
          >
            <Image src="/image/albums.png" alt="" width={20} height={20} />
            <span>Albums</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />

          <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
          >
            <Image src="/image/videos.png" alt="" width={20} height={20} />
            <span>Videos</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />

          <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
          >
            <Image src="/image/news.png" alt="" width={20} height={20} />
            <span>News</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
           
          <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
          >
            <Image src="/image/settings.png" alt="" width={20} height={20} />
            <span>Settings</span>
          </Link>
          <hr className="border-t-1 border-gray-50 w-36 self-center" />
           
        </div>
      </div>
    );
}

export default LeftMenu;