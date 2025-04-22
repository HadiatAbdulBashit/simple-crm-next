import axiosInstance from "@/apis/axiosInstance";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/components/user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserMenuContent() {
  const cleanup = useMobileNavigation();
  const router = useRouter();

  const handleLogout = () => {
    cleanup();

    const promise = axiosInstance.post("/logout");

    toast.promise(promise, {
      loading: "Logging out...",
      success: () => {
        router.push("/login");
        return "You have been logged out.";
      },
      error: "Logout failed. Please try again.",
    });
  };

  return (
    <>
      <DropdownMenuLabel className='p-0 font-normal'>
        <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
          <UserInfo />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <div className='block w-full' onClick={handleLogout}>
          <LogOut className='mr-2' />
          Log out
        </div>
      </DropdownMenuItem>
    </>
  );
}
