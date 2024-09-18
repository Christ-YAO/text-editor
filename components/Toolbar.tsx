"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Image,
  Terminal,
  Palette,
  Brush
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        editor?.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) return null;
  return (
    <div className="border border-input bg-[#000000cc] backdrop-blur-lg z-50 rounded-md px-2 py-1 space-x-1 sticky top-0 flex items-center">
      <Toggle
        size={"sm"}
        pressed={editor.isActive("undo")}
        onPressedChange={() => editor.chain().focus().undo().run()}
      >
        <Undo className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("redo")}
        onPressedChange={() => editor.chain().focus().redo().run()}
      >
        <Redo className="w-4 h-4" />
      </Toggle>
      <div className="relative">
        <Input
          type="color"
          id="textColor"
          // name="textColor"
          onInput={event => {
            const target = event.target as HTMLInputElement;
            editor.chain().focus().setColor(target.value).run();
          }}
          value={editor.getAttributes('textStyle').color}
          className="w-6 p-0 border-none h-6 border cursor-pointer invisible absolute -left-full"
        />
        <Toggle
          size={"sm"}
          pressed={editor.isActive("textStyle")}
          className="cursor-auto"
        >
          <Label htmlFor="textColor" className="cursor-pointer">
            <Palette className="w-4 h-4" />
          </Label>
        </Toggle>
      </div>
      <div className="relative">
      <Input
        type="color"
        id="bgColor"
        onInput={event => {
          const target = event.target as HTMLInputElement;
          editor.chain().focus().toggleHighlight({ color: target.value }).run();
        }}
        value={editor.getAttributes('Highlight').color}
        className="w-6 p-0 border-none h-6 border cursor-pointer invisible absolute -left-full"
      />
      <Toggle
          size={"sm"}
          pressed={editor.isActive("textStyle")}
          className="cursor-auto"
        >
          <Label htmlFor="bgColor" className="cursor-pointer">
            <Brush className="w-4 h-4" />
          </Label>
        </Toggle>
      </div>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().setCode().run()}
      >
        <Code className="w-4 h-4" />
      </Toggle>

      {/* Bouton pour insérer un bloc de code */}
      <Toggle
        size={"sm"}
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Terminal className="w-4 h-4" />
      </Toggle>

      <Input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <Toggle
        size={"sm"}
        onPressedChange={() => fileInputRef.current?.click()}
      >
        <Image className="w-4 h-4" />
      </Toggle>
    </div>
  );
}
