'use client';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';

import { CommentValidation } from '@/lib/validations/thread';
// import { createThread } from '@/lib/actions/thread.actions';
import React from 'react'
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({
  threadId,
  currentUserImg,
  currentUserId
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
      className="comment-form"
      onSubmit={form.handleSubmit(onSubmit)}
      >
      <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className='flex items-center w-full gap-3'>
            <FormLabel>
              <Image
                src={currentUserImg}
                alt="Profile image"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </FormLabel>
            <FormControl className='border-none bg-transparent'>
              <Input
                type='text'
                {...field}
                placeholder="Comment..."
                className="no-focus text-light-1 outline-none"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit" className="comment-form_btn">
        Reply
      </Button>
      </form>
    </Form>
  )
}

export default Comment
