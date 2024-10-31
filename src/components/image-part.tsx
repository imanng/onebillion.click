"use client";

import { CSSProperties, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ImagePartToolTip } from "./image-part-tooltip";
import throttle from "lodash.debounce";
import { useAtom } from "jotai";
import { imagePartFamily, selectedPartAtom } from "@/stores";
import confetti from "canvas-confetti";

type Props = {
  columnIndex: number;
  rowIndex: number;
  style?: CSSProperties;
  maxClicked: number;
};

export const ImagePart = (props: Props) => {
  const partElmRef = useRef<HTMLDivElement | null>(null);
  const [selectedPart, setSelectedPart] = useAtom(selectedPartAtom);
  const partKey = `part__${props.columnIndex}_${props.rowIndex}`;

  const [clickedCount, countClicked] = useAtom(
    imagePartFamily({ id: partKey })
  );
  const handleClick = throttle(
    () => {
      setSelectedPart(partKey);
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

      console.log(partElmRef.current?.offsetLeft);

      const shoot = () => {
        confetti({
          ...defaults,
          particleCount: 30,
          origin: {
            x: partElmRef.current?.getBoundingClientRect().x,
            y: partElmRef.current?.getBoundingClientRect().y,
          },
        });

        confetti({
          ...defaults,
          particleCount: 5,
          origin: {
            x: partElmRef.current?.offsetLeft,
            y: partElmRef.current?.offsetTop,
          },
        });

        confetti({
          ...defaults,
          particleCount: 15,
          scalar: scalar / 2,
          shapes: ["circle"],
          origin: {
            x: partElmRef.current?.offsetLeft,
            y: partElmRef.current?.offsetTop,
          },
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
      <Tooltip open={selectedPart === partKey}>
        <TooltipTrigger asChild>
          <div
            ref={partElmRef}
            onClick={handleClick}
            style={props.style}
            className="aspect-square border border-grey-500"
            onMouseOver={() => setSelectedPart(partKey)}
            onMouseOut={() => setSelectedPart(null)}
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
