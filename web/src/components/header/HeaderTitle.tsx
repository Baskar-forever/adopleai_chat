"use client";

import React from "react";

export function HeaderTitle({
  children,
  backgroundToggled,
}: {
  children: JSX.Element | string;
  backgroundToggled?: boolean;
}) {
  const isString = typeof children === "string";
  const textSize = isString && children.length > 10 ? "text-xl" : "text-2xl";

  return (
    <h1
      className={`${textSize} ${
        backgroundToggled
          ? "text-white"
          : "text-black"
      } break-words line-clamp-2 ellipsis text-strong leading-none font-bold`}
    >
      ADOPLE AI
    </h1>
  );
}
