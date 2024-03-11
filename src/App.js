import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  // X 버튼 클릭 이벤트 함수
  const handleClick = (id) => {
    let nowTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(nowTodoData);
  };

  // input 값 변경 이벤트 함수
  const handleChage = (e) => {
    setValue(e.target.value);
  };

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
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>Todo List</h1>
        </div>
        {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input
              type="checkBox"
              onChange={() => handleCompleteChange(data.id)}
              defaultChecked={data.completed}
            />
            {data.title}
            <button style={btnStyle} onClick={() => handleClick(data.id)}>
              X
            </button>
          </div>
        ))}
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChage}
          />
          <input
            type="submit"
            value="입력"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    </div>
  );
}
