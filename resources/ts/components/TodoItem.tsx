import { React, useContext, useRef, useState } from "react";
import { ListGroup, Form, Stack, Button, Spinner } from "react-bootstrap";
import { TodoType } from "../interfaces/ index";
import { TodoContext } from "../contexts/TodoContext";

type Props = {
    todo: TodoType;
};

export default function TodoItem({ todo }: Props) {
    const { dispatch } = useContext(TodoContext);

    const [checked, setChecked] = useState<boolean>(todo.completed as boolean);
    const [contentEditable, setContentEditable] = useState<boolean>(false);
    const labelRef = useRef<HTMLLabelElement | null>(null);
    const [updating, setUpdating] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<boolean>(false)

    const handleSetChecked = async (): Promise<void> => {
        setUpdating(true)

        const res = await fetch("http://127.0.0.1:8000/api/todos/" + todo.id, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !checked }),
        })

        if (res.status !== 200) {
            setUpdating(false)
            return alert("Fail to update")
        }

        dispatch({
            type: "update",
            payload: {
                id: todo.id,
                completed: !checked,
            },
        });

        setUpdating(false)
        setChecked(!checked);
    };

    const handleSetContentEditable = async (): Promise<void> => {
        if (!contentEditable) {
            setContentEditable(true)
        }

        if (contentEditable) {
            if (labelRef.current!.innerText === "") return

            setUpdating(true)

            const res = await fetch("http://127.0.0.1:8000/api/todos/" + todo.id, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: labelRef.current!.innerText }),
            })

            if (res.status !== 200) {
                setUpdating(false)
                return alert("Fail to update")
            }

            dispatch({
                type: "edit",
                payload: {
                    id: todo.id,
                    description: labelRef.current!.innerText,
                },
            });

            setUpdating(false)
            setContentEditable(false)
        }
    };

    const handleDelete = async (): Promise<void> => {
        if (!confirm("Are you sure you want to delete this todo?")) return

        setDeleting(true)

        const res = await fetch("http://127.0.0.1:8000/api/todos/" + todo.id, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
        })

        if (res.status !== 200) {
            setDeleting(false)
            return alert("Fail to update")
        }

        dispatch({
            type: "delete",
            payload: {
                id: todo.id,
            },
        });

        setDeleting(false)
    };

    return (
        <ListGroup.Item className="d-flex align-items-center justify-content-between">
            <Form.Check>
                {!updating && <Form.Check.Input
                    checked={checked}
                    onChange={handleSetChecked}
                    type="checkbox"
                />}
                {updating && <Spinner variant="primary" animation="border" size="sm" className="me-3" />}
                <Form.Check.Label
                    ref={labelRef}
                    className={checked ? "text-decoration-line-through" : ""}
                    contentEditable={contentEditable}
                >
                    {todo.description}
                </Form.Check.Label>
            </Form.Check>
            <Stack
                gap={2}
                direction="horizontal"
                className="d-flex align-items-center ms-2"
            >
                {!checked && <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleSetContentEditable}
                >
                    {!contentEditable && "Edit"}
                    {contentEditable ? (!updating ? "Save" : <Spinner animation="border" size="sm" />) : null}
                </Button>}
                <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                    {!deleting && "Delete"}
                    {deleting && <Spinner animation="border" size="sm" />}
                </Button>
            </Stack>
        </ListGroup.Item>
    );
}
