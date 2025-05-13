import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";

const ProfilePage = () => {
    return (
      <div className="flex gap-5">
        <div className="hidden xl:block w-[20%]">
          <LeftMenu type="profile" />
        </div>

        <div className="w-full lg:w-[70%] xl:w-[70%]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center justify-center bg-slate-400 rounded-md">
              <div className="w-full h-64 relative ">
                <Image
                  src="https://images.pexels.com/photos/31840057/pexels-photo-31840057/free-photo-of-misty-forest-road-in-ocypel-poland.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                  fill
                  className="rounded-md object-cover"
                />
                <Image
                  src="https://images.pexels.com/photos/29825257/pexels-photo-29825257/free-photo-of-scenic-winter-aerial-view-of-bavarian-landscape.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
                />
              </div>
              <h1 className="mt-20 mb-4 text-2xl font-medium">User name</h1>
              <div className="flex items-center justify-center gap-12 mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-medium">123</span>
                  <span className="test-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">1.2k</span>
                  <span className="test-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">1.7k</span>
                  <span className="test-sm">Following</span>
                </div>
              </div>
            </div>
            <Feed />
          </div>
        </div>

        <div className="hidden lg:block w-[30%]">
          {" "}
          <RightMenu userId="test" />{" "}
        </div>
      </div>
    );
}

export default ProfilePage