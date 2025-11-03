import ArticleForm from "@/components/cms/ArticleForm";

export const metadata = { title: "New Article | CMS" };

export default function Page() {
  return (
    <div className="container">
      <h1>Create Article</h1>
      <ArticleForm />
    </div>
  );
}

