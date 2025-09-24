import { post } from "@/app/(root)/page";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const StartupCard = ({ post }: { post: post }) => {
  const {
    _createdAt,
    _id,
    category,
    author,
    description,
    image,
    name,
    title,
    views,
  } = post;

  const { id, image: AuthorImage } = author;

  return (
    <div className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] w-full shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 group">
      <div className="flex items-center justify-between">
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1 5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-medium">{views}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${id}`}>
            <p className="font-medium text-[16px] text-black line-clamp-1">
              {name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="font-semibold text-[26px] text-black line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
          <Link href={`/user/${id}`}>
            <Image
              src={AuthorImage}
              unoptimized
              alt={description}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">
          {description}
        </p>
        <Image
          src={image}
          alt={description}
          className="w-full h-[164px] rounded-[10px] object-cover"
          unoptimized
          width={82}
          height={164}
        />
      </Link>
      <div className="flex items-center justify-between gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="font-medium text-[16px] text-black">{category}</p>
        </Link>
        <Button
          className="rounded-full bg-black-200 font-medium text-[16px] text-white px-5 py-3"
          asChild
        >
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default StartupCard;
