import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "../theme-provider";
import type { Post } from "@/types/types";

export default function PostEditor({ post, setPost }: { post: Post, setPost: React.Dispatch<React.SetStateAction<Post>> }) {
    const { theme } = useTheme()

    return (
        <div data-color-mode={theme}>
            <MDEditor value={post.content} onChange={(val) => setPost({ ...post, content: val ?? "" })} height={500} />
        </div>
    );
}
