import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  const handleEnd = (result) => {
    // result 매개변수에는 soure 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함됨
    // 목적지가 없으면 (이벤트 취소) 해당 함수를 종료
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData를 생성한다.
    const newTodoData = todoData;

    // 1. 변경 시키는 아이템을 배열에서 지워준다.
    // 2. return 값으로 지워진 아이템을 잡아준다.
    const [redoredItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderdItem을 insert 해준다.
    newTodoData.splice(result.destination.index, 0, redoredItem);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className={`${
                        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
                      } "flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded"`}
                    >
                      <div className="items-center">
                        <input
                          type="checkBox"
                          onChange={() => handleCompleteChange(data.id)}
                          defaultChecked={data.completed}
                        />
                        <span
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        >
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
