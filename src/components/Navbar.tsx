import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
            <Image src = "/image/search.png" alt = "" width={14} height={14} />
          </div>          

        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[-30%] flex items-center gap-4 xl:gap-8 justify-end">

        <ClerkLoading>
          <div className ="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-red-800" role="status"> </div>
        </ClerkLoading>

        <ClerkLoaded>

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
              <UserButton/>
          </SignedIn>

          <SignedOut>
            <div className = "flex items-center gap-2 font-bold text-sm text-red-800">
              <Image src="/image/login.png" alt = "" width = {20} height = {20} />
              <Link href = "/sign-in"> LogIn / SignUp </Link>
            </div>
          </SignedOut>

        </ClerkLoaded>
        
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;