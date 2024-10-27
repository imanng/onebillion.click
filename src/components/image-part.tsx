import { CSSProperties } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = { columnIndex: number; rowIndex: number; style: CSSProperties };

export const ImagePart = (props: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            style={props.style}
            className="aspect-square border border-grey-500"
          >
            <div className="bg-slate-500 hover:bg-slate-400 size-full cursor-pointer"></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>111 clicked</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
