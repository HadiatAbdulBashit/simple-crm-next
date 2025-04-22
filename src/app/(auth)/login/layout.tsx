import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col items-center gap-4'>
            <Link href={"/"} className='flex flex-col items-center gap-2 font-medium'>
              <div className='mb-1 flex max-w-24 items-center justify-center rounded-md'>
                <Image src={"/images/logo.webp"} alt='Purple box logo' width={384} height={328} />
              </div>
              <span className='sr-only'>Log in to your account</span>
            </Link>

            <div className='space-y-2 text-center'>
              <h1 className='text-xl font-medium'>Log in to your account</h1>
              <p className='text-muted-foreground text-center text-sm'>Enter your email and password below to log in</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
