import { SWRConfig } from "swr";
import "../global.css";
import useUser from "../lib/client/useUser";

function CustomUser() {
  const { user } = useUser();
  return null;
}

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <CustomUser />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
