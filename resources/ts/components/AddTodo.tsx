import { React, useContext, useRef, useState } from "react";
import { Stack, Form, Button, Spinner } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";

export default function AddTodo() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { dispatch } = useContext(TodoContext);
    const [loading, setLoading] = useState<boolean>(false)

    const handleAddTodo = async (): Promise<void> => {
        if (inputRef.current!.value === "") return

        setLoading(true)

        const res = await fetch("http://127.0.0.1:8000/api/todos", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: inputRef.current!.value }),
        })

        if (res.status !== 200) {
            setLoading(false)
            return alert("Fail to add")
        }

        const data = await res.json()

        dispatch({
            type: "add",
            payload: data,
        });

        inputRef.current!.value = "";
        setLoading(false)
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
                {!loading && "Add"}
                {loading && <Spinner animation="border" size="sm" />}
            </Button>
        </Stack>
    );
}
