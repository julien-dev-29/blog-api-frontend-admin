import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight"
import { Spinner } from "../ui/spinner";
import Menubar from "./menubar";
export function TipTapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  // Initialise l'éditeur avec les extensions de base
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded p-2",
      },
    },
    onUpdate: ({ editor }) => {
      // Appelle la fonction onChange à chaque mise à jour
      const html = editor.getHTML();
      onChange(html);
    },
  });

  if (!editor) return <Spinner />;

  return (
    <div className="">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
