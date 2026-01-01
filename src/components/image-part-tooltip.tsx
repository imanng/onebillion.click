import { imagePartFamily } from "@/stores";
import { useAtomValue } from "jotai";

type Props = { columnIndex: number; rowIndex: number };

export const ImagePartToolTip = (props: Props) => {
  const imagePartValue = useAtomValue(
    imagePartFamily({ id: `part__${props.columnIndex}_${props.rowIndex}` })
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="inline-block size-1 bg-green-400 rounded" />
        <span className="whitespace-nowrap">
          {imagePartValue.count} clicked
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="inline-block size-1 bg-slate-400 rounded" />
        <span className="whitespace-nowrap">12 clicked</span>
      </div>
    </div>
  );
};
