"use client";

import Link from "next/link";
import LinkComponent from "./link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <LinkComponent
            href={"/"}
            className="text-xl font-bold text-primary"
          >
            PC Part Visualizer
          </LinkComponent>
          <div className="flex items-center space-x-4">
            <LinkComponent href="/community" className="font-medium">
              Community
            </LinkComponent>
            <LinkComponent href="/guides" className="font-medium">
              Guides
            </LinkComponent>
            <LinkComponent href="/parts" className="font-medium">
              Parts
            </LinkComponent>
            <ThemeToggle />
            {session ? (
              <Button
                className="font-medium"
                variant="outline"
                onClick={() => router.push("/profile")}
              >
                Profile
              </Button>
            ) : (
              <Button
                className="font-medium"
                variant="outline"
                onClick={() => router.push("/auth/signin")}
              >
                Login
              </Button>
            )}
            <Button className="font-medium"
              variant ="outline"
              onClick={() => router.push("/auth/register")}
              >Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
