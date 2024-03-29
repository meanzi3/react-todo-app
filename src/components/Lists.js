import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
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
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
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
                    <List
                      handleClick={handleClick}
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
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
});

export default Lists;
