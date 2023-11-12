import useUser from "../lib/client/useUser";

export default function CustomUser() {
  const { user } = useUser();
  console.log(user);
  return null;
}
