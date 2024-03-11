import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    // input checkbox change 이밴트 함수
    const handleCompleteChange = (id) => {
      let nowTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(nowTodoData);
      localStorage.setItem("todoData", JSON.stringify(nowTodoData));
    };
    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault();

      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };
    if (isEditing) {
      return (
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 bg-gray-100 border rounded">
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-3 py-2 mr-4 text-gray-500 appearance-none"
                value={editedTitle}
                onChange={handleEditChange}
                autoFocus
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(false)}
              type="button"
            >
              X
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 float-right"
              type="submit"
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
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
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(true)}
              type="button"
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);
export default List;
