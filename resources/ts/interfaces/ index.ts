export type TodoType = {
    id?: number;
    description?: string;
    completed?: boolean;
    created_at?: string;
    updated_at?: string;
};

export type TodoActionType = {
    type: "init" | "add" | "delete" | "update" | "edit";
    payload: TodoType;
};
