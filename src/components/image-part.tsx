"use client";

import { CSSProperties } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ImagePartToolTip } from "./image-part-tooltip";
import throttle from "lodash.debounce";
import { useAtom } from "jotai";
import { imagePartFamily } from "@/stores";
import confetti from "canvas-confetti";

type Props = {
  columnIndex: number;
  rowIndex: number;
  style?: CSSProperties;
  maxClicked: number;
};

export const ImagePart = (props: Props) => {
  const [clickedCount, countClicked] = useAtom(
    imagePartFamily({ id: `part__${props.columnIndex}_${props.rowIndex}` })
  );
  const handleClick = throttle(
    () => {
      countClicked((prev) => ({
        count: prev.count + 1,
      }));

      const scalar = 2;
      const unicorn = confetti.shapeFromText({ text: "🦄", scalar });

      const defaults = {
        spread: 360,
        ticks: 60,
        gravity: 0,
        decay: 0.96,
        startVelocity: 20,
        shapes: [unicorn],
        scalar,
      };

      const shoot = () => {
        confetti({
          ...defaults,
          particleCount: 30,
        });

        confetti({
          ...defaults,
          particleCount: 5,
        });

        confetti({
          ...defaults,
          particleCount: 15,
          scalar: scalar / 2,
          shapes: ["circle"],
        });
      };

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    },
    10,
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
            <div
              className="bg-slate-500 hover:bg-slate-400 size-full cursor-pointer"
              style={{
                opacity: 1 - clickedCount.count / props.maxClicked,
              }}
            ></div>
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
