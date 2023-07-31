import { React, useContext, useRef, useState } from "react";
import { ListGroup, Form, Stack, Button } from "react-bootstrap";
import { TodoType } from "../interfaces/ index";
import { TodoContext } from "../contexts/TodoContext";

type Props = {
    todo: TodoType;
};

export default function TodoItem({ todo }: Props) {
    const { dispatch } = useContext(TodoContext);

    const [checked, setChecked] = useState<boolean>(todo.completed as boolean);
    const [contentEditable, setContentEditable] = useState<boolean>(false);
    const descriptionRef = useRef<HTMLLabelElement | null>(null);

    const handleSetChecked = () => {
        setChecked(!checked);

        dispatch({
            type: "update",
            payload: {
                id: todo.id,
                completed: checked,
            },
        });
    };

    const handleSetContentEditable = () => {
        setContentEditable(!contentEditable);

        if (contentEditable) {
            dispatch({
                type: "edit",
                payload: {
                    id: todo.id,
                    description: descriptionRef.current!.innerText,
                },
            });
        }
    };

    const handleDelete = () => {
        dispatch({
            type: "delete",
            payload: {
                id: todo.id,
            },
        });
    };

    return (
        <ListGroup.Item className="d-flex align-items-center justify-content-between">
            <Form.Check>
                <Form.Check.Input
                    checked={checked}
                    onChange={handleSetChecked}
                    type="checkbox"
                />
                <Form.Check.Label
                    ref={descriptionRef}
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
                    {contentEditable && "Save"}
                </Button>}
                <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                    Delete
                </Button>
            </Stack>
        </ListGroup.Item>
    );
}
