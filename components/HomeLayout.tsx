import Link from "next/link";

type DataType = {
  id: number;
  name: string;
  content: string;
};

interface HomeLayoutProps {
  data?: DataType[];
}

export default function HomeLayout({ data }: HomeLayoutProps) {
  return (
    <div className="fixed left-0 top-0 w-full h-full overflow-y-scroll py-4 ">
      <ul className="grid grid-cols-2 gap-5">
        {data &&
          data?.length > 0 &&
          data?.map((item, index) => (
            <Link href={`/tweet/${item.id}`}>
              <li
                key={`homeItem_${index}`}
                className={`w-[90%] h-[300px] bg-slate-100 mx-auto blur-[2px] hover:blur-none transition-all `}
              >
                <h3>{item.name}</h3>
                <h3>{item.content}</h3>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
