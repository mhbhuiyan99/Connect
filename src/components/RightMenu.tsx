import FriendRequests from "./FriendRequests";
import Birthdays from "./BIrthdays";
import Ad from "./Ad";

const RightMenu = ({userId}:{userId?:string}) =>{
    return(
        <div className="flex flex-col gap-6"> 
        <FriendRequests />
        
        
        </div>
    );
};

export default RightMenu;