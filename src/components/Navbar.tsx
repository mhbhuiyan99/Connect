
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from 'next/image';
import {buttonVariants} from './ui/button'
import UserButton from "./user-button";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[10%]">
        <Link href="/" className="font-bold text-xl text-red-800">
          {" "}
          Connect{" "}
        </Link>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center justify-between w-[60%]">
        {/* LINKS */}
        <div className="flex gap-6 text-red-800 font-semibold">

          <Link href="/" className="flex items-center gap-2">
            <Image src="/image/home.png" alt = "Home" width={25} height={25} className="w-4 h-4"/>
            <span> Home </span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image src = "/image/network.png" alt = "Network" width={25} height={25} className="w-4 h-4"/>
            <span> Network </span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image src = "/image/job.png" alt = "Job" width={25} height={25} className="w-4 h-4" />
            <span> Job </span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image src = "/image/gem.png" alt = "Gem" width={25} height={25} className="w-5 h-5"/>
            <span> Gem </span>
          </Link>

          <div className="hidden md:flex p-1 items-center rounded-xl border border-red-800 font-medium">

            <input type = "text" placeholder="search..." className="bg-transparent outline-none"/>
            {/*<Image src = "/image/search.png" alt = "" width={100%} height={100%} />*/}
          </div>          

        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[-30%] flex items-center gap-4 xl:gap-8 justify-end">

        
      <Link className={buttonVariants() } href='/sign-in'> <UserButton/> </Link>
        

      {/*<Link className={buttonVariants() } href='/sign-in'> Sign In </Link>
          <SignedIn>
              <div className="cursor-pointer">
                <Image src = "/image/people.png" alt = "" width={25} height={25}></Image>
              </div>

              <div className="cursor-pointer">
                <Image src = "/image/chat-box.png" alt = "" width={25} height={25}></Image>
              </div>

              <div className="cursor-pointer">
                <Image src = "/image/notification.png" alt = "" width={25} height={25}></Image>
              </div>
          </SignedIn>

          <SignedOut>
            <div className = "flex items-center gap-2 font-bold text-sm text-red-800">
              <Image src="/image/login.png" alt = "" width = {20} height = {20} />
              <Link href = "/sign-in"> LogIn / SignUp </Link>
            </div>
          </SignedOut>
        */}
        
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;