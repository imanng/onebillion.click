import kv from "@vercel/kv";
import { useQuery } from "@tanstack/react-query";

type Props = { columnIndex: number; rowIndex: number };

export const ImagePartToolTip = (props: Props) => {
  useQuery({
    queryKey: ["part", `${props.columnIndex}_${props.rowIndex}`],
    queryFn: () =>
      kv.get<number>(`part__${props.columnIndex}_${props.rowIndex}`),
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="inline-block size-1 bg-slate-400 rounded" />
        1111 clicked
      </div>
      <div className="flex items-center gap-1">
        <span className="inline-block size-1 bg-green-400 rounded" />
        12 clicked
      </div>
    </div>
  );
};
