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
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

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
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
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
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
}
