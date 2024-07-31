"use client";

import { useQuery } from "@tanstack/react-query";
import { MessageCircleMore, ThumbsUpIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

import Comment, {
  CommentProperties,
} from "~/components/common/comment-component";
import { sampleComments } from "~/components/common/comment-component/sample-comments";
import { useUser } from "~/hooks/user/use-user";
import { ISingleBlogResponse } from "~/types/blog.model";
import { getSingleBlog } from "~/utils/blogApiRequests";
import BlogLabel from "../../_components/label";
import RelatedArticle from "../RelatedArticle";

const mockSession: Session = {
  user: {
    id: "12345",
    name: "Current User",
    first_name: "Current",
    last_name: "User",
    email: "user@example.com",
    image: "path/to/image",
    role: "user",
    access_token: "some-token",
  },
  expires: "2100-01-01T00:00:00.000Z",
};

interface IProperties {
  id: string;
  blogInitial: ISingleBlogResponse;
}

const dateFormated = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(newDate);
  return formattedDate;
};

const readingTimeCalc = (sentence: string, wordsPerMinute: number = 150) => {
  const words = sentence.split(" ").length;
  const timeMinutes = words / wordsPerMinute;

  if (timeMinutes < 1) {
    const timeSeconds = timeMinutes * 60;
    return `${timeSeconds.toFixed(0)} secs`;
  } else if (timeMinutes < 60) {
    return `${timeMinutes.toFixed(0)} mins`;
  } else {
    const timeHours = timeMinutes / 60;
    return `${timeHours.toFixed(0)} hrs`;
  }
};

const BlogDetailsPage: FC<IProperties> = ({ id, blogInitial }) => {
  const { user } = useUser();
  const {
    data: { data: post },
  }: { data: ISingleBlogResponse } = useQuery({
    queryKey: ["single-blog", id],
    queryFn: () => getSingleBlog(id),
    initialData: blogInitial,
    staleTime: 5 * 1000,
  });

  const [newComment, setNewComment] = useState("");

  const [comments, setComments] =
    useState<Omit<CommentProperties, "session">[]>(sampleComments);

  const handleSubmit = () => {
    if (newComment.trim()) {
      const comment: Omit<CommentProperties, "session"> = {
        id: (comments.length + 1).toString(),
        avatar: "",
        name: mockSession.user?.name || "Anonymous",
        username:
          mockSession.user?.name?.toLowerCase().replace(" ", "") || "anonymous",
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleKeyDown = (event_: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event_.key === "Enter" && !event_.shiftKey) {
      event_.preventDefault();
      handleSubmit();
    }
  };

  if (!post) {
    return (
      <div>
        something went wrong
      </div>
    )
  }

  return (
    <>
      {post ? (
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-[120px]">
          <div className="mb-6 flex flex-col items-center justify-center gap-6 py-5 md:mb-12 md:flex-row md:justify-between">
            <div>
              <div className="mb-2.5 flex justify-start">
                <BlogLabel label={post?.blog_category?.name} />
              </div>
              <h1 className="mb-6 text-2xl font-bold text-neutral-dark-2 sm:text-3xl md:text-5xl md:leading-[56px]">
                {post?.title}
              </h1>
              <div className="flex items-stretch justify-start gap-3">
                <div className="flex items-center justify-center">
                  {/* <Image
                    src={`${post?. as string}`}
                    alt="Nora Nora"
                    className="mr-3 h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10"
                    width={40}
                    height={40}
                  /> */}
                  <span className="flex size-10 items-center justify-center rounded-full bg-border text-lg font-bold capitalize">
                    {post?.author.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-lg font-medium text-neutral-dark-2 sm:mb-3 sm:text-xl">
                    {post?.author as string}
                  </p>
                  <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center">
                    <p className="text-xs text-neutral-dark-1 sm:text-sm">
                      {readingTimeCalc(post?.content) as string} Read{" "}
                      {"   •   "} {dateFormated(post.created_at)}
                    </p>
                    <div className="flex items-center justify-start">
                      <div className="mr-4 flex items-center">
                        <ThumbsUpIcon className="mr-1 h-4 w-4" />
                        <span className="text-sm">77k</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircleMore className="mr-1 h-4 w-4" />
                        <span className="text-sm">44</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[620px]">
              <div className="mb-3 h-[300px] w-full overflow-hidden">
                <Image
                  src={
                    post?.image
                      ? `https://deployment.api-php.boilerplate.hng.tech${post?.image?.image_url}`
                      : "https://unsplash.com/photos/a-large-mountain-with-a-lake-below-it-3vimzs5Yai8"
                  }
                  alt="ENIAC computer, one of the first general-purpose electronic digital computers"
                  className="h-full w-full object-cover"
                  width={629}
                  height={300}
                />
              </div>
              <p className="neutral-dark-1">
                Image: ENIAC computer was the first general-purpose electronic
                digital computer.
              </p>
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 justify-items-center gap-16 sm:gap-10 md:grid-cols-[1fr_285px] lg:gap-[100px]">
            <div>
              <p className="p-2 font-sans text-lg font-semibold leading-7 tracking-widest text-neutral-dark-1">
                &ldquo;{post?.content.split("\n\n")[0]}
                &ldquo;
              </p>
              <div className="prose mb-12 max-w-none p-1 leading-7 tracking-wider text-neutral-dark-1 sm:text-base">
                <p className="mb-4 font-sans text-lg font-normal">
                  {post?.content.split("\n\n").slice(1, -1).join(",")}
                </p>
              </div>
            </div>
            <RelatedArticle />
          </div>
          <div className="mx-auto mt-12 w-full max-w-[1000px]">
            {user && (
              <>
                <h1 className="font-inter text-left text-xl font-bold leading-[29.05px] text-[#525252] sm:text-2xl">
                  Add Comments
                </h1>
                <textarea
                  className="w-full rounded-lg border bg-white p-2 shadow-sm"
                  rows={4}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(event_) => setNewComment(event_.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}
            <div className="mt-8 w-full space-y-6">
              <div className="flex justify-between">
                <p className="font-inter text-left text-2xl font-bold leading-[29.05px] text-[#525252]">
                  Comments
                </p>
                <Link
                  href={`/blog/comments`}
                  className="font-inter text-xs font-normal text-[#525252] sm:text-sm"
                >
                  See more
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-6">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    session={mockSession}
                    className="w-full rounded-lg bg-white shadow-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-24 flex h-full items-center justify-center">
          <div className="text-center text-xl font-semibold text-gray-700">
            Blog post not found
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetailsPage;
