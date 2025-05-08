import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";


const Profile = () => {
    return (
        <div className="flex gap-5">


      <div className="hidden xl:block w-[20%]"> <LeftMenu/> </div>

      <div className="w-full lg:w-[70%] xl:w-[70%]">

          <div className="flex flex-col gap-5">
            
            <Feed/>
          </div>

      </div>

      <div className="hidden lg:block w-[30%]"> <RightMenu userId="test"/> </div>
      

    </div>
    )
}

export default Profile