import Cookies from "universal-cookie";
import TodoSkeleton from "../components/TodoSkeleton";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Paginator from "../components/Paginator";
import { ChangeEvent, useState } from "react";
import Button from "../components/schema/Button";
import { onGenerateTodos } from "../utils/functions";

const TodosPage = () => {
  const cookie = new Cookies();
  const userData = cookie.get("userLogged");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("DESC");

  const { isLoading, data, isFetching } = useAuthenticatedQuery({
    queryKey: [`todos-page-${page}`, `${pageSize}`, `${sortBy}`],
    URL: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
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

  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };

  const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
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
      <div>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-32 h-9 bg-gray-300 rounded-md dark:bg-gray-400"></div>
            <div className="w-32 h-9 bg-gray-300 rounded-md dark:bg-gray-400"></div>
          </div>
        ) : (
          <div className="flex items-center justify-between space-x-2">
            <Button variant={"default"} size={"sm"} onClick={onGenerateTodos}>
              Generate todos
            </Button>
            <div className="flex items-center justify-between space-x-2 text-md">
              <select
                className="border-2 border-indigo-600 rounded-md p-2"
                value={sortBy}
                onChange={onChangeSortBy}
              >
                <option disabled>Sort by</option>
                <option value="ASC">Oldest</option>
                <option value="DESC">Latest</option>
              </select>

              <select
                className="border-2 border-indigo-600 rounded-md p-2"
                value={pageSize}
                onChange={onChangePageSize}
              >
                <option disabled>Page size</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="my-10">
        {data.data.length ? (
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
          pageCount={data.meta.pagination.pageCount}
          total={data.meta.pagination.total}
          isLoading={isLoading || isFetching}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
        />
      </div>
    </div>
  );
};

export default TodosPage;
