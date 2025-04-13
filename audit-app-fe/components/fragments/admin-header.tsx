"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { logout } from "../api/authenticated/user/logout";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  return (
    <NavigationMenu className="h-[4rem]">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/admin"
          >
            See Audit
          </NavigationMenuLink>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle() + " cursor-pointer"}
            onClick={async () => {
              await logout();
              router.push("/");
            }}
          >
            Logout
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
