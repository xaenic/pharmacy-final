"use client";
import HolyLoader from "holy-loader";
export default function Provider({ children }: any) {
  return (
    <>
      <HolyLoader
        color="#0EA5E9"
        height="4.5px"
        speed={250}
        easing="linear"
        showSpinner
      />
      {children}
    </>
  );
}
