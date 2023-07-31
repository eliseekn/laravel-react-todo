import { React, useContext } from "react";
import { ListGroup, Button, Stack } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";
import { TodoType } from "../interfaces/ index";

export default function TodoList() {
    const { state } = useContext(TodoContext);

    return (
        <>
            <ListGroup>
                {state.map((todo: TodoType) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ListGroup>

            <Stack
                direction="horizontal"
                gap={3}
                className="d-flex justify-content-center"
            >
                <Button variant="primary">Previous</Button>
                <Button variant="primary">Next</Button>
            </Stack>
        </>
    );
}
