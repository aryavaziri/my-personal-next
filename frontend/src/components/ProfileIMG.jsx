"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileIMG = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  const { resolvedTheme } = useTheme();
  return (
    <>
      {resolvedTheme === "dark" ? (
        <Image
          className={`md:object-cover object-contain object-right-top`}
          src="/images/ee-min.png"
          fill
          alt="Profile picture"
        />
      ) : (
        <Image
          className={`md:object-cover object-contain object-right-top`}
          src="/images/eee-min.png"
          fill
          alt="Profile picture"
        />
      )}
    </>
  );
};

export default ProfileIMG;
