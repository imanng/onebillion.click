"use client";

import { CSSProperties, memo, useRef } from "react";
import { ImagePartToolTip } from "./image-part-tooltip";
import throttle from "lodash.debounce";
import { useAtom, useSetAtom } from "jotai";
import { imagePartFamily, totalClicksAtom } from "@/stores";
import confetti from "canvas-confetti";

type Props = {
  columnIndex: number;
  rowIndex: number;
  style?: CSSProperties;
  maxClicked: number;
};

const ImagePart = memo((props: Props) => {
  const partElmRef = useRef<HTMLDivElement | null>(null);
  // const [selectedPart, setSelectedPart] = useAtom(selectedPartAtom);
  const partKey = `part__${props.columnIndex}_${props.rowIndex}`;

  const [clickedCount, countClicked] = useAtom(
    imagePartFamily({ id: partKey })
  );
  const setTotalClicks = useSetAtom(totalClicksAtom);

  const handleClick = throttle(
    () => {
      // setSelectedPart(partKey);
      countClicked((prev) => ({
        count: prev.count + 1,
      }));
      setTotalClicks((prev) => prev + 1);

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
    <div
      ref={partElmRef}
      onClick={handleClick}
      style={props.style}
      className="aspect-square border border-grey-500 group relative"
    >
      <div
        className="bg-slate-500 hover:bg-slate-400 size-full cursor-pointer"
        style={{
          opacity: 1 - clickedCount.count / props.maxClicked,
        }}
      />
      <div className="hidden group-hover:block absolute bottom-0 left-0 z-[100] bg-slate-700 text-white w-fit">
        <ImagePartToolTip
          columnIndex={props.columnIndex}
          rowIndex={props.rowIndex}
        />
      </div>
    </div>
  );
});

ImagePart.displayName = "ImagePart";

export { ImagePart };
