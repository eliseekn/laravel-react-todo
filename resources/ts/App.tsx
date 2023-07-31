import React from "react";
import { Container, Stack } from "react-bootstrap";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import TodoProvider from "./contexts/TodoContext";

export default function App() {
    return (
        <Container>
            <Stack gap={3} className="col-md-8 mx-auto">
                <h1 className="text-center mt-5">To Do</h1>

                <TodoProvider>
                    <AddTodo />
                    <TodoList />
                </TodoProvider>
            </Stack>
        </Container>
    );
}
