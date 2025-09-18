import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="flex h-12 items-center px-6 bg-white font-work-sans text-black">
      <nav className="flex w-full items-center justify-between">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
        </Link>
        <div className="flex item-center gap-5">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>
              <button
                onClick={async () => {
                  "use server";
                  await signOut({redirectTo:"/"});
                }}
              >
                <span>Logout</span>
              </button>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
