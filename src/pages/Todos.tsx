import Cookies from "universal-cookie";
import TodoSkeleton from "../components/TodoSkeleton";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Paginator from "../components/Paginator";
import { useState } from "react";

const TodosPage = () => {
  const cookie = new Cookies();
  const userData = cookie.get("userLogged");

  const [page, setPage] = useState<number>(1);

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: [`todos-page`],
    URL: `/todos`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // ** Handlers
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };

  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading)
    return (
      <div className="space-y-1 p-3">
        {Array.from({ length: 15 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <div className="my-20 space-y-6">
      {data.data && data.data.length ? (
        data.data.map(
          ({
            id,
            attributes,
          }: {
            id: number;
            attributes: { title: string };
          }) => (
            <div
              key={id}
              className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            >
              <h3 className="w-full font-semibold">
                {id} - {attributes.title}
              </h3>
            </div>
          )
        )
      ) : (
        <h3>No todos yet!</h3>
      )}
      <Paginator
        page={page}
        pageCount={3}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
      />
    </div>
  );
};

export default TodosPage;
