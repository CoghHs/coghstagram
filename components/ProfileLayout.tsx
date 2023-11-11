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
  currentUser?: { id: number } | undefined;
}

export default function ProfileLayout({ data, currentUser }: HomeLayoutProps) {
  console.log(currentUser);
  return (
    <div className="w-full h-full overflow-y-scroll  ">
      <div className="flex items-center justify-center h-10">
        <span className="font-medium">게시물</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
        </svg>
      </div>
      <ul className="grid grid-cols-3 justify-center items-center">
        {data &&
          data?.length > 0 &&
          data?.map((item) => (
            <Link key={`homeItem_${item.id}`} href={`/tweet/${item.id}`}>
              <li
                className={`w-48 h-48 border mx-auto flex justify-center items-center px-4`}
              >
                {item.image ? (
                  <div className="relative">
                    <div className="transition-all ">
                      <img
                        src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${item.image}/bigavatar`}
                        alt={item.name}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-48 w-48  relative "></div>
                )}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
