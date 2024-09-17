"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading"
import Underline from "@tiptap/extension-underline";
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from "@tiptap/extension-highlight";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        }
      }),
      Underline,
      Image,
      Color,
      TextStyle,
      Highlight.configure({
        multicolor: true
      })
    ],
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
    <div className="flex flex-col justify-stretch min-h-[150px] gap-1">
      <Toolbar editor={editor} />
      <EditorContent  style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
}
