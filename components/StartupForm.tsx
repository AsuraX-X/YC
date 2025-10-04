"use client";

import MDEditor from "@uiw/react-md-editor";
import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";

const StartupForm = () => {
  const [pitch, setPitch] = useState("");

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      link: formData.get("link") as string,
      pitch,
    };

    try {
      await formSchema.parseAsync(formValues);

      console.log("✅ Validation passed:", formValues);

      // Success: clear errors
      return { errors: {}, status: "SUCCESS" };

      // const res = await createDiffieHellman(prevState, formData, pitch)

      // console.log(res);
    } catch (error: any) {
      console.log("❌ Validation failed:", error);
      if (error?.issues) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue: any) => {
          if (issue.path?.[0]) {
            fieldErrors[issue.path[0]] = issue.message;
          }
        });
        console.log("📋 Field errors:", fieldErrors);
        return { errors: fieldErrors, status: "ERROR" };
      }
      return { errors: {}, status: "ERROR" };
    }
  };

  const [state, formaction, isPending] = useActionState(handleFormSubmit, {
    errors: {},
    status: "INITIAL",
  });

  console.log("🔍 Current state:", state);

  return (
    <form
      action={formaction}
      className="w-full my-10 space-y-8 px-6 mx-auto max-w-180"
    >
      <div className="flex w-full flex-col">
        <label
          htmlFor="title"
          className="font-bold text-[18px] text-black uppercase"
        >
          Title
        </label>
        <Input
          placeholder="Startup Title"
          type="text"
          name="title"
          id="title"
          required
          className="border-[3px] border-black px-4 py-6 text-[18px] text-black font-semibold rounded-full mt-3 focus-visible:ring-[#9dc0fa] focus-visible:ring-1 placeholder:text-black-300"
        />
        {state.errors?.title && (
          <p className="text-red-500 mt-2 ml-5">{state.errors.title}</p>
        )}
      </div>
      <div className="flex w-full flex-col">
        <label
          htmlFor="description"
          className="font-bold text-[18px] text-black uppercase"
        >
          Description
        </label>
        <Textarea
          placeholder="Startup Description"
          name="description"
          id="description"
          required
          className="border-[3px] min-h-30 border-black  p-4 text-[18px] text-black font-semibold rounded-2xl mt-3 focus-visible:ring-[#9dc0fa] focus-visible:ring-1 placeholder:text-black-300"
        />
        {state.errors?.description && (
          <p className="text-red-500 mt-2 ml-5">{state.errors.description}</p>
        )}
      </div>
      <div className="flex w-full flex-col">
        <label
          htmlFor="category"
          className="font-bold text-[18px] text-black uppercase"
        >
          Category
        </label>
        <Input
          placeholder="Startup Category"
          type="text"
          name="category"
          id="category"
          required
          className="border-[3px] border-black px-4 py-6 text-[18px] text-black font-semibold rounded-full mt-3 focus-visible:ring-[#9dc0fa] focus-visible:ring-1 placeholder:text-black-300"
        />
        {state.errors?.category && (
          <p className="text-red-500 mt-2 ml-5">{state.errors.category}</p>
        )}
      </div>
      <div className="flex w-full flex-col">
        <label
          htmlFor="link"
          className="font-bold text-[18px] text-black uppercase"
        >
          Image URL
        </label>
        <Input
          placeholder="Startup Image URL"
          type="text"
          name="link"
          id="link"
          required
          className="border-[3px] border-black px-4 py-6 text-[18px] text-black font-semibold rounded-full mt-3 focus-visible:ring-[#9dc0fa] focus-visible:ring-1 placeholder:text-black-300"
        />
        {state.errors?.link && (
          <p className="text-red-500 mt-2 ml-5">{state.errors.link}</p>
        )}
      </div>
      <div data-color-mode="light " className="flex w-full flex-col">
        <label
          htmlFor="pitch"
          className="font-bold text-[18px] text-black uppercase"
        >
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden", padding: 5 }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves.",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        <MDEditor.Markdown source={pitch} style={{ whiteSpace: "pre-wrap" }} />
        {state.errors?.pitch && (
          <p className="text-red-500 mt-2 ml-5">{state.errors.pitch}</p>
        )}
      </div>
      <div>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary border-[4px] border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]"
        >
          {isPending ? (
            <p>Submitting...</p>
          ) : (
            <p className="flex items-center justify-center">
              <span>Submit Your Pitch</span>
              <Send className="size-6 ml-2" />
            </p>
          )}
        </Button>
      </div>
    </form>
  );
};

export default StartupForm;
