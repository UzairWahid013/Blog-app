import React from 'react'
import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Author, Startup } from '@/sanity/types';
import { auth } from '@/auth';
export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author};

const StartupCard = async ({post} : {post: any}) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    description,
    image,
    category,
    title,
  } = post;
  console.log(image);

  const authorId = author?._id || '';
  const session = await auth();
  const githubProfileImg = session?.user?.image;
  const displayName = author?.name || session?.user?.name || 'Anonymous';
  return (
    <Card className="group bg-neutral-200">
      <CardHeader className="space-y-0 pb-2">
        <div className='flex justify-between'>
          <p className="text-black">
            {_createdAt ? formatDate(_createdAt) : 'No date'}
          </p>
          <div className="flex gap-1.5">
            <EyeIcon className='size-6 text-primary' />
            <span>{views}</span>
          </div>
        </div>

        <div className="flex justify-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${authorId}`}>
              <p className='text-1xl font-bold line-clamp-1'>{displayName}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
              <p className='text-2xl font-bold line-clamp-1'>{title}</p>
            </Link>
          </div>
          <Link href={`/user/${authorId}`}>
            <Image src={githubProfileImg || 'https://avatars.githubusercontent.com/u/74147338?v=4&size=64'}  alt="placeholder" width={48} height={48} className="rounded-full" />
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Link href={`/startup/${_id}`}>
          <p className="line-clamp-3 mb-4">
            {description}
          </p>
          {image && (
            <img src={image} alt="image" className="w-full h-[200px] object-cover rounded-lg" />
          )}
        </Link>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">
            {category}
          </p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default StartupCard