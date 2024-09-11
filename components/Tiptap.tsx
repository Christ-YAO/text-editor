"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input bg-background disabled:cursor-not-allowed disabled:opacity-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      console.log(html);
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
