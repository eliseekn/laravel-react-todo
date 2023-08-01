import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";
import { TodoType } from "../interfaces/ index";

export default function TodoList() {
    const { state } = useContext(TodoContext);

    return (
        <>
            <ListGroup className="shadow-sm">
                {state.map((todo: TodoType) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ListGroup>
        </>
    );
}
