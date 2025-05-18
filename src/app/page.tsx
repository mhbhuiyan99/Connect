"use client"

import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";
import UserButton from "@/components/user-button";
import { SessionProvider } from "next-auth/react";


const Homepage = () => {
  return(
    <div className="flex gap-5">


      <div className="hidden xl:block w-[20%]"> <LeftMenu type="home"/> </div>

      <div className="w-full lg:w-[70%] xl:w-[70%]">

          <div className="flex flex-col gap-5">
            {/*<AddPost/>*/}
            <Feed/>
          </div>

      </div>

      <div className="hidden lg:block w-[20%]"> <RightMenu/> </div>
      

    </div>
  );
}

export default Homepage;