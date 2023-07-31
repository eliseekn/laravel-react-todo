import {
    React,
    Dispatch,
    ReactNode,
    createContext,
    useReducer,
    useEffect,
} from "react";
import { TodoType, TodoAction } from "../interfaces/ index";
import TodoReducer from "../reducers/TodoReducer";

export const TodoContext = createContext<{
    state: TodoType[];
    dispatch: Dispatch<TodoAction>;
}>({
    state: [] as TodoType[],
    dispatch: () => undefined,
});

type Props = {
    children: ReactNode;
};

export default function TodoProvider({ children }: Props) {
    const [state, dispatch] = useReducer<typeof TodoReducer>(TodoReducer, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/todos")
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "init",
                    payload: data.data,
                });
            });
    }, []);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
}
