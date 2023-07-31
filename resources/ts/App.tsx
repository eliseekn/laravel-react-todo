import React from "react";
import { Container, Stack } from "react-bootstrap";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import TodoProvider from "./contexts/TodoContext";

export default function App() {
    return (
        <Container>
            <Stack gap={3} className="col-md-6 mx-auto">
                <h1 className="text-center mt-5">ToDo</h1>

                <TodoProvider>
                    <AddTodo />
                    <TodoList />
                </TodoProvider>
            </Stack>
        </Container>
    );
}
