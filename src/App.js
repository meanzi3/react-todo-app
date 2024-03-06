import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    todoData: [],
    value: "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  // X 버튼 클릭 이벤트 함수
  handleClick = (id) => {
    let nowTodoData = this.state.todoData.filter((data) => data.id !== id);
    this.setState({ todoData: nowTodoData });
  };

  // input 값 변경 이벤트 함수
  handleChage = (e) => {
    this.setState({ value: e.target.value });
  };

  // form submit 이벤트 함수
  handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 막음
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    // 추가하기, input 값 초기화
    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  };

  // input checkbox change 이밴트 함수
  handleCompleteChange = (id) => {
    let nowTodoData = this.state.todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    this.setState({ todoData: nowTodoData });
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>Todo List</h1>
          </div>
          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input
                type="checkBox"
                onChange={() => this.handleCompleteChange(data.id)}
                defaultChecked={data.completed}
              />
              {data.title}
              <button
                style={this.btnStyle}
                onClick={() => this.handleClick(data.id)}
              >
                X
              </button>
            </div>
          ))}
          <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChage}
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
}
