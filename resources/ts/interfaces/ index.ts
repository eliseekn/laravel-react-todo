export type TodoType = {
    id: number;
    description?: string;
    completed?: boolean;
    created_at?: string;
    updated_at?: string;
};

type LinkType = {
    previous: string;
    next: string;
};

export type TodoList = {
    data: TodoType[];
    link: LinkType;
};

export type TodoAction = {
    type: "init" | "add" | "delete" | "update" | "edit";
    payload: TodoList;
};
