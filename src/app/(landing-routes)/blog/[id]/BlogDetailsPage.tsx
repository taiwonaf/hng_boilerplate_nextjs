"use client";

import { MessageCircleMore, ThumbsUpIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

import Comment, {
  CommentProperties,
} from "~/components/common/comment-component";
import { sampleComments } from "~/components/common/comment-component/sample-comments";
import BlogLabel from "../_components/label";
import { articlesData } from "../data/dummy-article-data";
import RelatedArticle from "./RelatedArticle";

// interface BlogPost {
//   id: number;
//   title: string;
//   date: string;
//   readTime: string;
//   category: string;
//   image: string;
//   labelClassName: string;
//   author: string;
// }

const mockSession: Session = {
  user: {
    name: "Current User",
    email: "user@example.com",
  },
  expires: "2100-01-01T00:00:00.000Z",
};

interface IProperties {
  id: string;
}

const BlogDetailsPage: FC<IProperties> = ({ id }) => {
  // const [post, setPost] = useState<BlogPost | undefined>();
  // const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const [comments, setComments] =
    useState<Omit<CommentProperties, "session">[]>(sampleComments);
  const post = articlesData.find((item) => item.id === id);
  // useEffect(() => {
  //   const fetchPost = () => {
  //     setTimeout(() => {
  //       const storedPost = localStorage.getItem("currentBlogPost");
  //       if (storedPost) {
  //         try {
  //           const parsedPost = JSON.parse(storedPost) as BlogPost;
  //           if (parsedPost.id === Number.parseInt(id as string, 10)) {
  //             setPost(parsedPost);
  //           } else {
  //             setPost(undefined);
  //           }
  //         } catch (error) {
  //           throw new Error("Error parsing stored blog post", { cause: error });
  //         }
  //       } else {
  //         setPost(undefined);
  //       }
  //       setIsLoading(false);
  //     }, 1000);
  //   };

  //   if (typeof window !== "undefined") {
  //     fetchPost();
  //   }
  // }, [id]);

  // if (isLoading || !post) {
  //   return (
  // <div className="my-24 flex h-full items-center justify-center">
  //   <div className="text-center text-xl font-semibold text-gray-700">
  //     {isLoading ? (
  //       <>
  //         <span className="animate-pulse">Loading ...</span>
  //         <LoadingSpinner className="size-4 animate-spin sm:size-5" />
  //       </>
  //     ) : (
  //       "Blog post not found"
  //     )}
  //   </div>
  // </div>
  //   );
  // }

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

  return (
    <>
      {post ? (
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-[120px]">
          <div className="mb-6 flex flex-col items-center justify-center gap-6 py-5 md:mb-12 md:flex-row md:justify-between">
            <div>
              <div className="mb-2.5 flex justify-start">
                <BlogLabel label={post?.tag as string} />
              </div>
              <h1 className="mb-6 text-2xl font-bold text-neutral-dark-2 sm:text-3xl md:text-5xl md:leading-[56px]">
                {post?.title}
              </h1>
              <div className="flex items-stretch justify-start">
                <div className="flex items-center justify-center">
                  <Image
                    src={`${post?.avatar as string}`}
                    alt="Nora Nora"
                    className="mr-3 h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <p className="mb-1 text-lg font-medium text-neutral-dark-2 sm:mb-3 sm:text-xl">
                    {post?.author as string}
                  </p>
                  <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center">
                    <p className="text-xs text-neutral-dark-1 sm:text-sm">
                      {post?.minsRead as string} mins Read {"   •   "}{" "}
                      {post?.datePublished as string}
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
                  src={`${post?.thumbnail as string}`}
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
                &ldquo;In the 1930s, John Atanasoff and Clifford Berry built the
                Atanasoff-Berry Computer (ABC), considered the first electronic
                digital computer, using vacuum tubes to perform calculations.
                &ldquo;
              </p>
              <div className="prose mb-12 max-w-none p-1 leading-7 tracking-wider text-neutral-dark-1 sm:text-base">
                <p className="mb-4 font-sans text-lg font-normal">
                  We often hear about the ENIAC, hailed as the first computer,
                  but its story is just one thread in a rich tapestry woven by
                  brilliant minds across generations. The true journey to the
                  digital age is fascinating, filled with visionaries who dared
                  to dream of machines that could think and calculate. In the
                  1830s, Charles Babbage conceived the Analytical Engine, a
                  mechanical marvel that could perform complex calculations and
                  even store data. It was a blueprint for the modern computer,
                  with a central processing unit, memory, and input/output
                  capabilities. Unfortunately, his vision was ahead of its time,
                  and the Analytical Engine was never fully built due to funding
                  constraints and the limitations of the technology at the time.
                  <br />
                  But Babbage wasn&apos;t alone. Ada Lovelace, a brilliant
                  mathematician and daughter of Lord Byron, recognized the
                  potential of his machine. She collaborated with Babbage,
                  writing detailed notes on the Analytical Engine&apos;s
                  capabilities. Her work, considered the first computer program,
                  demonstrated how the machine could be used to solve complex
                  mathematical problems, laying the foundation for the field of
                  software development.
                </p>
                <p className="mb-4">
                  {" "}
                  The world needed a practical solution for data processing, and
                  Herman Hollerith stepped up. In the late 19th century, he
                  developed a tabulating machine that used punched cards to
                  store and process data. This machine was a game-changer,
                  proving crucial in the 1890 US Census. Hollerith&apos;s
                  invention paved the way for the development of data processing
                  systems, which would later become essential for modern
                  computing.
                  <br /> While Babbage&apos;s vision was mechanical, the 20th
                  century saw a shift towards electronic computing. In the
                  1930s, John Atanasoff and Clifford Berry built the
                  Atanasoff-Berry Computer (ABC), considered the first
                  electronic digital computer, using vacuum tubes to perform
                  calculations. Though not programmable, the ABC demonstrated
                  the potential of electronics in computing, paving the way for
                  the ENIAC.
                  <br /> The Electronic Numerical Integrator and Computer
                  (ENIAC), built in the 1940s, was a programmable machine
                  designed for military calculations. It was a massive,
                  room-sized computer that used vacuum tubes to perform complex
                  operations. The ENIAC marked a significant milestone in the
                  development of general-purpose computers, but it was built
                  upon the groundwork laid by Babbage, Lovelace, Hollerith, and
                  Atanasoff.
                </p>
                <p>
                  {" "}
                  This is just the beginning. There are countless other stories
                  of pioneers who contributed to the development of the first
                  computers. Women like Grace Hopper, a pioneer in computer
                  programming and the development of COBOL, played vital roles,
                  often overlooked in the history books. The story of the first
                  computer is not a singular event, but a tapestry woven by
                  brilliant minds across generations. It&apos;s a testament to
                  human ingenuity, perseverance, and the relentless pursuit of
                  innovation.
                </p>
              </div>
            </div>
            <RelatedArticle />
          </div>
          <div className="mx-auto mt-12 w-full max-w-[1000px]">
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
