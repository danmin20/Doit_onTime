import React, { useState } from "react";
import { connect } from "react-redux";

function Home() {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    setText("");
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul></ul>
    </>
  );
}

//take state from store to home
//map state from redux store to props from component
//use to get somthing from store and put it into props
function mapStateToProps(state) {
  return { toDos: state };
}

export default connect(mapStateToProps)(Home);
