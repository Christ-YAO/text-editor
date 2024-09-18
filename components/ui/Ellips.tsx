import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    EllipsisVertical
} from "lucide-react";
import { Toggle } from "./toggle";
import { Editor } from "@tiptap/react";

type Props = {
    editor: Editor | null;
};

export default function Ellips({ editor }: Props) {
    return (

        <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical className="p-1" /></DropdownMenuTrigger>
            <DropdownMenuContent style={{ display: "flex", flexDirection: "row", gap: "4px", backgroundColor: "black", color: "white", padding: "0px" }}>
                <DropdownMenuItem className="focus:bg-transparent focus:text-accent-transparent">
                    <Toggle
                        size={"sm"}
                        className="hover:bg-transparent"
                        pressed={editor?.isActive({ textAlign: 'left' })}
                        onPressedChange={() => editor?.chain().focus().setTextAlign('left').run()}
                    >
                        <AlignLeft className="w-4 h-4" />
                    </Toggle>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent focus:text-accent-transparent">
                    <Toggle
                        size={"sm"}
                        className="hover:bg-transparent"
                        pressed={editor?.isActive({ textAlign: 'center' })}
                        onPressedChange={() => editor?.chain().focus().setTextAlign('center').run()}
                    >
                        <AlignCenter className="w-4 h-4" />
                    </Toggle>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent focus:text-accent-transparent">
                    <Toggle
                        size={"sm"}
                        className="hover:bg-transparent"
                        pressed={editor?.isActive({ textAlign: 'right' })}
                        onPressedChange={() => editor?.chain().focus().setTextAlign('right').run()}
                    >
                        <AlignRight className="w-4 h-4" />
                    </Toggle>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent focus:text-accent-transparent">
                    <Toggle
                        size={"sm"}
                        className="hover:bg-transparent"
                        pressed={editor?.isActive({ textAlign: 'justify' })}
                        onPressedChange={() => editor?.chain().focus().setTextAlign('justify').run()}
                    >
                        <AlignJustify className="w-4 h-4" />
                    </Toggle>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}