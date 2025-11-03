import Blog from "@/components/blogs/blog";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Blog Zaira - News Magazine React Next Js Template",
};
const index = () => {
  return (
    <Wrapper>
      <Blog />
    </Wrapper>
  )
}

export default index