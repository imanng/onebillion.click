"use client";

import { CSSProperties } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ImagePartToolTip } from "./image-part-tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kv } from "@vercel/kv";
import throttle from "lodash.debounce";

type Props = { columnIndex: number; rowIndex: number; style?: CSSProperties };

export const ImagePart = (props: Props) => {
  const queryClient = useQueryClient();
  const clickMutation = useMutation<number, Error, { key: string }>({
    mutationFn: (vars) => kv.incr(vars.key),
  });

  const handleClick = throttle(
    () => {
      clickMutation.mutate(
        {
          key: `part__${props.columnIndex}_${props.rowIndex}`,
        },
        {
          onError: (e) => console.log(e),
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["part", `${props.columnIndex}_${props.rowIndex}`],
            });
          },
        }
      );
    },
    300,
    {}
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={handleClick}
            style={props.style}
            className="aspect-square border border-grey-500"
          >
            <div className="bg-slate-500 hover:bg-slate-400 size-full cursor-pointer"></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <ImagePartToolTip
            columnIndex={props.columnIndex}
            rowIndex={props.rowIndex}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
