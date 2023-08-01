    import React, {
    Dispatch,
    ReactNode,
    createContext,
    useReducer,
    useEffect,
} from "react";
import { TodoType, TodoActionType } from "../interfaces/ index";
import TodoReducer from "../reducers/TodoReducer";

export const TodoContext = createContext<{
    state: TodoType[];
    dispatch: Dispatch<TodoActionType>;
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
        fetch("http://localhost:8000/api/todos")
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "init",
                    payload: data,
                });
            });
    }, []);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
}
