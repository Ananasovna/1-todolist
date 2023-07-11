import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

export type ChangeTodoListTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE"
    title: string
    todoListId: string
}

export type ChangeTodoListFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    nextFilterValue: FilterValuesType
    todoListId: string
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todolistsReducer = (todoLists: TodoListType[], action: ActionType): TodoListType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListId);
        case "ADD-TODOLIST":
            return [...todoLists, {id: action.todoListId, title: action.title, filter: "all"}]
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl);
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.nextFilterValue} : tl)
        default:
            return todoLists
    }


}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", todoListId}
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todoListId: v1()};
}

export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE_TODOLIST_TITLE", title, todoListId};
}

export const ChangeTodoListFilterAC = (nextFilterValue: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE_TODOLIST_FILTER", nextFilterValue, todoListId};
}