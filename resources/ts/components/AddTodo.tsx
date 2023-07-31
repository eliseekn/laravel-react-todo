import { React, useContext, useRef } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";

export default function AddTodo() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { state, dispatch } = useContext(TodoContext);

    const handleAddTodo = (): void => {
        dispatch({
            type: "add",
            payload: {
                id: state.length + 1,
                description: inputRef.current!.value,
                completed: false,
            },
        });

        inputRef.current!.value = "";
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
