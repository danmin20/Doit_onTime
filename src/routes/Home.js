import React, { useState } from "react";
import Clock from "react-live-clock";
import styled from "styled-components";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo";
import bgImage from "../bg.jpg";
import Date from "../components/Date";

const Img = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${bgImage});
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  margin-top: 20px;
  font-family: "Lobster", cursive;
  font-size: 20px;
  color: white;
`;

const Time = styled.div`
  width: 200px;
  margin-top: 10px;
  font-family: "Lobster", cursive;
  font-size: 60px;
  color: white;
`;

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.div`
  margin-top: 30px;
  padding: 10px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
`;

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }
  return (
    <Img>
      <Title>ToDo</Title>
      <Date />
      <Time>
        <Clock format={"HH:mm:ss"} ticking={true} />
      </Time>
      <Form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
      </Form>
      <List>
        <ul>
          {toDos.map(toDo => (
            <ToDo {...toDo} key={toDo.id} />
          ))}
        </ul>
      </List>
    </Img>
  );
}

//take state from store to home
//map state from redux store to props from component
//use to get somthing from store and put it into props
function mapStateToProps(state) {
  return { toDos: state };
}

//create function and send it to props
function mapDispatchToProps(dispatch) {
  return {
    addToDo: text => dispatch(actionCreators.addToDo(text))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
