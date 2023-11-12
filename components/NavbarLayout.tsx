import Link from "next/link";

type DataType = {
  id: number;
  name: string;
  content: string;
  image: string | null;
  userId: number;
};

interface HomeLayoutProps {
  data?: DataType[];
}

export default function Navbar({ data }: HomeLayoutProps) {
  return (
    <div className="w-full h-full fixed left-0 top-0 mt-10  ">
      <ul className="flex flex-row overflow-x-auto mb-10 animate-slider absolute space-x-4">
        {data &&
          data?.length > 0 &&
          data?.map((item) => (
            <Link key={`homeItem_${item.id}`} href={`/tweet/${item.id}`}>
              <li
                className={`w-80 h-48 border mx-auto overflow-hidden  flex justify-center items-center px-4  rounded-xl`}
              >
                {item.image ? (
                  <div className="relative ">
                    <div>
                      <img
                        src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${item.image}/home`}
                        alt={item.name}
                        className="scale-125"
                      />
                      <div className="absolute w-full top-44">
                        <div>
                          <h1 className="text-xl font-bold">{item.name}</h1>
                          <h1 className="text-sm text-gray-500">
                            {item.content}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative top-14 right-24">
                    <div>
                      <h1 className="text-xl font-bold">{item.name}</h1>
                      <h1 className="text-sm text-gray-500">{item.content}</h1>
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
