'use client';

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from 'next/image';
import { buttonVariants } from './ui/button'
import UserButton from "./user-button";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const { session } = useAuth();

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
      <div className="hidden md:flex items-center justify-between w-[70%]">
        {/* LINKS */}
        <div className="flex gap-6 text-red-800 font-semibold">
          <Link href="/" className="flex items-center gap-2">
            {/*<Image
              src="/image/home.png"
              alt="Home"
              width={25}
              height={25}
              className="w-4 h-4"
            />*/}
            <span> Home </span>
          </Link>
          <Link href="/notice" className="flex items-center gap-2">
            {/*<Image
              src="/image/network.png"
              alt="Network"
              width={25}
              height={25}
              className="w-4 h-4"
            />*/}
            <span>Notice</span>
          </Link>
          <Link href="/alumni" className="flex items-center gap-2">
            {/*<Image
              src="/image/job.png"
              alt="Job"
              width={25}
              height={25}
              className="w-4 h-4"
            />*/}
            <span> Member Info </span>
          </Link>
         
          {
            session?.accessToken && (
              <Link href="/alumni/form" className="flex items-center gap-2">
                {/*<Image
                  src="/image/job.png"
                  alt="Gem"
                  width={25}
                  height={25}
                  className="w-5 h-5"
                />*/}
                <span>Alumni Form</span>
              </Link>
            )
          }
          <Link href="/events" className="flex items-center gap-2">
            <span>Events</span>
          </Link>
           <Link href="/" className="flex items-center gap-2">
            <span>Gallery</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <span>Reunion</span> {/*re.. reg*/}
          </Link>
          <Link href="/admin_approval" className="flex items-center gap-2">
            <span>Admin Approval</span> {/*re.. reg*/}
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[-30%] flex items-center gap-4 xl:gap-8 justify-end">
        {" "}<UserButton />{" "}
        {/* <Link className={buttonVariants()} href="/sign-in">
          {" "}
          <UserButton />{" "}
        </Link> */}

        

        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;