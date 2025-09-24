"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    form.reset();
  };

  return (
    <button
      type="button"
      className="flex justify-center items-center size-12 rounded-full bg-black text-white"
      onClick={reset}
    >
      <Link href={"/"}>
        <X />
      </Link>
    </button>
  );
};

export default SearchFormReset;
