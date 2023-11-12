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
    <div className="fixed left-0 top-0 w-full h-screen overflow-y-scroll py-64  ">
      <ul className="grid grid-cols-4 gap-5 gap-y-32 mt-10 justify-center items-center">
        {data &&
          data?.length > 0 &&
          data?.map((item) => (
            <Link key={`homeItem_${item.id}`} href={`/tweet/${item.id}`}>
              <li
                className={` h-[300px] mx-auto flex justify-center items-center px-4`}
              >
                {item.image ? (
                  <div className="relative group ">
                    <div className="cursor-pointer ">
                      <img
                        src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${item.image}/home`}
                        alt={item.name}
                        className="hover:scale-105 hover:shadow-2xl transition-all"
                      />
                      <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-all">
                        <h3 className="text-2xl font-bold ">{item.name}</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[373px] w-[373px]  relative ">
                    <div className="absolute bottom-5 left-5">
                      <h3 className="text-2xl font-bold ">{item.name}</h3>
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
