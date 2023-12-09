import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { formatCreatedAt } from "../utils/functions";
import Input from "../components/schema/Input";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import TodoSkeleton from "../components/TodoSkeleton";

const UserProfile = () => {
  const cookie = new Cookies();
  const userData = cookie.get("userLogged");

  const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>("");

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["userProfile"],
    URL: `/users/me?populate=todos`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  useEffect(() => {
    const dateString = `${userData.user.createdAt}`;
    const formattedDate = formatCreatedAt(dateString);
    setFormattedCreatedAt(formattedDate);
  }, [userData.user.createdAt]);

  if (isLoading)
    return (
      <div className="space-y-1 p-3">
        {Array.from({ length: 15 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <section className="my-10" style={{ direction: "rtl" }}>
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-500">
          معلومات المستخدم :
        </h2>
        <form className="space-y-2">
          <div className="space-y-2">
            <label htmlFor="username">إسم المستخدم</label>
            <Input id="username" placeholder={data?.username} />
          </div>
          <div className="space-y-2">
            <label htmlFor="email">الايميل المستخدم</label>
            <Input id="email" placeholder={data?.email} />
          </div>
          <div className="space-y-2">
            <h4>عدد الـ TODOS الخاصة بك : {data?.todos.length}</h4>
            <h4>وقت إنشاء الحساب : {formattedCreatedAt}</h4>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
