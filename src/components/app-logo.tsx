import Image from "next/image";

export default function AppLogo() {
  return (
    <>
      <div className='text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md'>
        <Image src={"/images/logo.webp"} alt='Purple box logo' width={384} height={18} className='brightness-200' />
      </div>
      <div className='ml-1 grid flex-1 text-left text-sm'>
        <span className='mb-0.5 truncate font-semibold'>Purple Box</span>
      </div>
    </>
  );
}
