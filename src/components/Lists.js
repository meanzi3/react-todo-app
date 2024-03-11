import React from "react";

export default function List({ todoData, setTodoData }) {
  // X 버튼 클릭 이벤트 함수
  const handleClick = (id) => {
    let nowTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(nowTodoData);
  };
  // input checkbox change 이밴트 함수
  const handleCompleteChange = (id) => {
    let nowTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(nowTodoData);
  };
  return (
    <div>
      {todoData.map((data) => (
        <div key={data.id}>
          <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
            <div className="items-center">
              <input
                type="checkBox"
                onChange={() => handleCompleteChange(data.id)}
                defaultChecked={data.completed}
              />
              <span className={data.completed ? "line-through" : undefined}>
                {data.title}
              </span>
            </div>
            <div className="items-center">
              <button
                className="px-4 py-2 float-right"
                onClick={() => handleClick(data.id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
