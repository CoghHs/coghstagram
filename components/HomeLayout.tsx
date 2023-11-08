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
    <div className="fixed left-0 top-0 w-full h-full overflow-y-scroll">
      <ul className="grid grid-cols-2">
        {data &&
          data?.length > 0 &&
          data?.map((item, index) => (
            <li
              key={`homeItem_${index}`}
              className={`w-[90%] h-[300px] bg-slate-100 mx-auto blur-sm`}
            >
              <h3>{item.name}</h3>
              <h3>{item.content}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
