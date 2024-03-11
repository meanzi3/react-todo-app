import React, { useState, useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

export default function App() {
  const [todoData, setTodoData] = useState([
    { id: 1, title: "밥 먹기", completed: false },
    { id: 2, title: "공부하기", completed: false },
  ]);
  const [value, setValue] = useState("");

  // X 버튼 클릭 이벤트 함수
  const handleClick = useCallback(
    (id) => {
      let nowTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(nowTodoData);
    },
    [todoData]
  );

  // form submit 이벤트 함수
  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 막음
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 추가하기, input 값 초기화
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  const handleRemoveClick = () => {
    setTodoData([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>Todo List</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
