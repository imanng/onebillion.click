"use client";

import { ImagePart } from "@/components";
import { useWindowSize } from "@/hooks";
import Image from "next/image";
import { useMemo } from "react";
import { FixedSizeGrid as Grid } from "react-window";

export default function Home() {
  const size = useWindowSize();

  const numberOfBox = useMemo(() => {
    if (size.width) {
      const result = (size.width - 32) / 28;
      return Math.floor(result);
    }

    return 0;
  }, [size.width]);

  const imageSize = useMemo(() => {
    return numberOfBox * 28 + numberOfBox * 2;
  }, [numberOfBox]);

  return (
    <main className="p-4">
      <div className="relative overflow-hidden">
        <Image
          src="https://imgcdn.stablediffusionweb.com/2024/5/26/b37e7ce6-7823-49e2-8120-2709e5a2658f.jpg"
          alt="Result Image"
          width={imageSize}
          height={imageSize}
        />
        <Grid
          key={numberOfBox}
          className="flex items-center justify-center !absolute top-0 left-0"
          columnCount={numberOfBox}
          rowCount={numberOfBox}
          columnWidth={28}
          rowHeight={28}
          width={imageSize}
          height={imageSize}
        >
          {ImagePart}
        </Grid>
      </div>
    </main>
  );
}
