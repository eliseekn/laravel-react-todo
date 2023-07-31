import { TodoList, TodoType, TodoAction } from "../interfaces/ index";

export default function TodoReducer(
    state: TodoList,
    action: TodoAction,
): TodoList {
    switch (action.type) {
        case "init":
            return action.payload;
        case "add":
            let data: TodoType[] = state.data

            return [{: action.payload.data, ...state.data }];
        case "delete":
            return state.data.filter(
                (todo: TodoType) => todo.id !== action.payload.data.id,
            );
        case "update":
            state = state.map((todo: TodoList) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });

            state.sort(
                (x: TodoList, y: TodoList) =>
                    Number(x.completed!) - Number(y.completed!),
            );

            return state;
        case "edit":
            return state.map((todo: TodoList) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, description: todo.description };
                }
                return todo;
            });
    }
}
