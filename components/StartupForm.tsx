"use client";

import { useState } from "react";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form action={() => {}} className="w-full my-10 space-y-8 px-6">
      <div className="flex w-full flex-col">
        <label
          htmlFor="title"
          className="font-bold text-[18px] text-black uppercase"
        >
          Title
        </label>
        <input
          placeholder="Startup Title"
          type="text"
          name="title"
          id="title"
          required
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
        />
        {errors.title && (
          <p className="text-red-500 mt-2 ml-5">{errors.title}</p>
        )}
      </div>
    </form>
  );
};

export default StartupForm;
