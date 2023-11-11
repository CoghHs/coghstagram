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
      <ul className="grid grid-cols-3 gap-5 py-48  gap-y-60 justify-center items-center">
        {data &&
          data?.length > 0 &&
          data?.map((item) => (
            <Link key={`homeItem_${item.id}`} href={`/tweet/${item.id}`}>
              <li
                className={`w-[90%] h-[300px]  mx-auto flex justify-center items-center px-4`}
              >
                {item.image ? (
                  <div className="relative">
                    <div className="transition-all  blur-[2px] hover:blur-none">
                      <img
                        src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${item.image}/home`}
                        alt={item.name}
                      />
                    </div>
                    <div className="absolute top-1/2">
                      <h3 className="text-2xl font-bold ">{item.name}</h3>
                      <h3 className="font-semibold text-sm">{item.content}</h3>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] w-[500px]  relative ">
                    <div className="absolute top-1/2">
                      <h3 className="text-2xl font-bold ">{item.name}</h3>
                      <h3 className="font-semibold text-sm">{item.content}</h3>
                    </div>
                  </div>
                )}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
