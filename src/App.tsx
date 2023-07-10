import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
    AppBar,
    Button,
    CardHeader,
    Container, createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>( {
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Ice cream", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ]
    })
    const [isLightMode, setIsLightMode] = useState(true);

    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const updatedTodoLists: Array<TodoListType>
            = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl)
        setTodoLists(updatedTodoLists)
    }
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForTodoList: Array<TaskType> = tasks[todoListId]
        // const updatedTasks: Array<TaskType> = tasksForTodoList.filter((t) => t.id !== taskId)
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)
        })
    }

    const maxTaskTitleLength = 15;

    const addTask = (title: string, todoListId: string) => {
        // const tasksForTodoList: Array<TaskType> = tasks[todoListId]
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const updatedTasks: Array<TaskType> = [newTask,...tasksForTodoList]
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]] })
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        // const tasksForTodoList: Array<TaskType> = tasks[todoListId]
        // const updatedTasks: Array<TaskType> = tasksForTodoList.map(t => t.id === taskId
        //     ? {...t, isDone: newIsDoneValue}
        //     : t)
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, isDone: newIsDoneValue}
                : t)
        })
    }

    const addTodoList = (title: string) => {
        const newTodoId = v1()
        const newTodo: TodoListType = {
            id: newTodoId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoId]: []})
    }

    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists: Array<TodoListType> = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(updatedTodoLists)
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, title}
                : t)
        })
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        const updatedTodoLists: Array<TodoListType>
            = todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl);
        setTodoLists(updatedTodoLists);
    }

    // UI
    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case "completed":
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        }

    const todoListsComponents: Array<JSX.Element> = todoLists.map((tl) => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} >
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>

            </Grid>
        )
    } )

    const mode = isLightMode ? 'light' : 'dark';

    const customTheme = createTheme({
        palette: {
            primary: {
                main: '#33a095'
            },
            secondary: {
                main: '#005f56'
            },
            mode: mode,

}
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <div className="App">
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            menu
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <Button onClick={()=> setIsLightMode(!isLightMode)} color={'inherit'} variant='outlined'>{`${mode} theme`}</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container sx={{p: '15px 0'}}>
                        <Paper elevation={2}>
                            <div className={'addForm'}>
                                <AddItemForm maxItemTitleLength={maxTaskTitleLength} addItemHandler={addTodoList}/>
                            </div>
                        </Paper>


                    </Grid>
                    <Grid container spacing={2}>
                        {todoListsComponents}
                    </Grid>
                </Container>

            </div>

        </ThemeProvider>
    );
}

export default App;
