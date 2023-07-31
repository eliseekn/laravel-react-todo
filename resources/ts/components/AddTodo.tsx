import { React, useContext, useRef } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { TodoType } from "../interfaces/ index";

export default function AddTodo() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { dispatch } = useContext(TodoContext);

    const handleAddTodo = (): void => {
        const data: TodoType = {
            description: inputRef.current!.value,
            completed: false,
        };

        fetch("http://127.0.0.1:8000/api/todos", {
            method: "post",
            headers: {
                Accept: "application/json",
                ContentType: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "add",
                    payload: data,
                });

                inputRef.current!.value = "";
            });
    };

    return (
        <Stack
            direction="horizontal"
            className="d-flex justify-content-between align-items-center"
        >
            <Form.Group className="w-100">
                <Form.Control
                    type="text"
                    placeholder="Todo description"
                    ref={inputRef}
                />
            </Form.Group>
            <Button variant="primary" className="ms-3" onClick={handleAddTodo}>
                Add
            </Button>
        </Stack>
    );
}
