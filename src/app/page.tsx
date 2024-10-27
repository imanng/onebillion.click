"use client";

import { ImagePart } from "@/components";
import { useWindowSize } from "@/hooks";
import Image from "next/image";
import { useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

export default function Home() {
  const size = useWindowSize();

  const parentRef = React.useRef(null);

  const numberOfBox = useMemo(() => {
    if (size.width) {
      const result = (size.width - 32) / 28;
      return result;
    }

    return 0;
  }, [size.width]);

  const imageSize = useMemo(() => {
    return numberOfBox * 28 + numberOfBox * 2;
  }, [numberOfBox]);

  const rowVirtualizer = useVirtualizer({
    count: numberOfBox,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: numberOfBox,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28,
    overscan: 5,
  });

  return (
    <main className="p-4">
      <div className="relative overflow-hidden" ref={parentRef}>
        <Image
          src="https://imgcdn.stablediffusionweb.com/2024/5/26/b37e7ce6-7823-49e2-8120-2709e5a2658f.jpg"
          alt="Result Image"
          width={imageSize}
          height={imageSize}
          className="absolute top-0 left-0 z-[-1]"
        />

        <div
          className="relative"
          style={{
            height: `${imageSize}px`,
            width: `${imageSize}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <React.Fragment key={virtualRow.key}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={virtualColumn.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                  }}
                >
                  <ImagePart
                    columnIndex={virtualColumn.index}
                    rowIndex={virtualRow.index}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}
