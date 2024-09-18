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
import { cn } from "@/lib/utils";

type Props = {
    editor: Editor | null;
};

export default function Ellips({ editor }: Props) {
    return (

        <DropdownMenu>
            <DropdownMenuTrigger className={cn("hover:bg-accent hover:text-slate-700 rounded-md h-8 w-8 flex justify-center items-center", editor?.isActive({ textAlign: 'center' }) || editor?.isActive({ textAlign: 'left' }) || editor?.isActive({ textAlign: 'right' }) || editor?.isActive({ textAlign: 'justify' }) ? "bg-accent text-slate-700" : "text-slate-400")}><EllipsisVertical className="p-1" /></DropdownMenuTrigger>
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