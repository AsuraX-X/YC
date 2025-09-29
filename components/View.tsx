import { formatNumber } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit()
  );

  return (
    <div className="fixed bottom-3 right-3 flex justify-end items-center mt-5">
      <div className=" absolute -top-1 -right-1 animate-ping size-[11px] bg-primary rounded-full" />

      <div className="absolute -top-1 -right-1 size-[11px] bg-primary rounded-full" />
      <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">
        <span className="font-black">{formatNumber(views)}</span>
      </p>
    </div>
  );
};

export default View;
