import PostList from "@/components/PostList.jsx";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <PostList />
    </div>
  );
}
