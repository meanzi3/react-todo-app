import React from "react";

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
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
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
      >
        <div className="items-center">
          <input
            type="checkBox"
            onChange={() => handleCompleteChange(id)}
            defaultChecked={completed}
          />
          <span className={completed ? "line-through" : undefined}>
            {title}
          </span>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleClick(id)}
            type="button"
          >
            X
          </button>
        </div>
      </div>
    );
  }
);
export default List;
