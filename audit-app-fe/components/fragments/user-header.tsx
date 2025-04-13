"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function UserHeader() {
  return (
    <NavigationMenu className="h-[4rem]">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/user/add-invoice" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Add Invoice
            </NavigationMenuLink>
          </Link>
          <Link href="/user" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Get Invoices
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
