import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getSingleBlog } from "~/utils/blogApiRequests";
import BlogDetailsPage from "./_components/BlogDetailsPage";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog", id],
    queryFn: () => getSingleBlog(id),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogDetailsPage id={id} />
      </HydrationBoundary>
    </div>
  );
};

export default page;
