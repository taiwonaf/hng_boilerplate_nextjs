import { ISingleBlogResponse } from "~/types/blog.model";
import { getSingleBlog } from "~/utils/blogApiRequests";
import BlogDetailsPage from "./_components/BlogDetailsPage";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const blogInitialData = await getSingleBlog(id);
  return (
    <div>
      <BlogDetailsPage
        id={id}
        blogInitial={blogInitialData as ISingleBlogResponse}
      />
    </div>
  );
};

export default page;
