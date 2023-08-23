"use client";

import { useRef } from "react";
import { trpc } from "../(trpc)/client";
import { serverClient } from "../(trpc)/server-client";

export default function TodoList({
  inititalTodos,
}: {
  inititalTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) {
  //very important type for typescript
  const getHi = trpc.sayHi.useQuery();
  const getTodo = trpc.getTodos.useQuery(undefined, {
    initialData: inititalTodos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toLocaleDateString(),
      updatedAt: todo.updatedAt.toLocaleDateString(),
    })),
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const doComplete = trpc.setDone.useMutation({
    onSettled: () => getTodo.refetch(),
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => getTodo.refetch(),
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const HandleAdd = () => {
    if (!inputRef.current?.value) throw new Error("String is empty");
    const res = addTodo.mutate(inputRef.current?.value);
    console.log(res);
  };

  const HandleComplete = (id: string) => {
    const res = doComplete.mutate(id);
    console.log(res);
  };

  return (
    <div className="h-full">
      <h3 className="text-center font-semibold mt-10 ">
        {JSON.stringify(getHi.data)}
      </h3>
      <div className="flex flex-col ">
        <div className="text-black my-5 text-3xl mx-auto">
          {getTodo?.data?.map((todo) => (
            <div key={todo.id} className="flex gap-3 items-center">
              <input
                id={`check-${todo.id}`}
                type="checkbox"
                checked={!!todo.completed}
                style={{ zoom: 1.5 }}
                onClick={async () => {
                  HandleComplete(todo.id);
                }}
              />
              <label htmlFor={`check-${todo.id}`}>{todo.task}</label>
            </div>
          ))}
        </div>
        <div className="flex gap-3 flex-col items-center">
          <label htmlFor="content">AddTodo</label>
          <input
            id="content"
            ref={inputRef}
            className="flex-grow text-black bg-slate-300 rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
          />
          <button
            onClick={() => {
              HandleAdd();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
}
