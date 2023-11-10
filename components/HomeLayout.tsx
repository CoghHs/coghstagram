import Link from "next/link";

type DataType = {
  id: number;
  name: string;
  content: string;
  image: string | null;
};

interface HomeLayoutProps {
  data?: DataType[];
}

export default function HomeLayout({ data }: HomeLayoutProps) {
  return (
    <div className="fixed left-0 top-0 w-full h-full overflow-y-scroll py-4 ">
      <ul className="grid grid-cols-3 gap-5 py-48   justify-center items-center">
        {data &&
          data?.length > 0 &&
          data?.map((item) => (
            <Link key={`homeItem_${item.id}`} href={`/tweet/${item.id}`}>
              <li
                className={`w-[90%] h-[300px]  mx-auto blur-[2px] hover:blur-none transition-all  flex justify-center items-center `}
              >
                {item.image ? (
                  <div className="relative w-[500px] h-[500px]}">
                    <img
                      src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${item.image}/home`}
                      alt={item.name}
                    />
                    <div className="absolute top-1/2">
                      <h3>{item.name}</h3>
                      <h3>{item.content}</h3>
                    </div>
                  </div>
                ) : (
                  <div className="h-96 bg-slate-300"></div>
                )}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
