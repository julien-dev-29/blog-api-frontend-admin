import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  DeleteIcon,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Utilise les boutons de shadcn/ui
export function TipTapEditor({
  initialContent = "",
  onChange,
}: {
  initialContent?: string;
  onChange?: (content: string) => void;
}) {
  // Initialise l'éditeur avec les extensions de base
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // Appelle la fonction onChange à chaque mise à jour
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // Si l'éditeur n'est pas encore initialisé, retourne null
  if (!editor) {
    return null;
  }

  // Rendu de l'éditeur
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Barre d'outils */}
      <div className="flex gap-1 p-2 border-b bg-gray-50 dark:bg-gray-800">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="sm"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="sm"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "default" : "outline"}
          size="sm"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="sm"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="sm"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().deleteCurrentNode().run()}
        >
          <DeleteIcon />
        </Button>
      </div>
      {/* Éditeur */}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px]"
      />
    </div>
  );
}
