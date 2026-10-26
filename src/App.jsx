import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";
import Title from "./components/Title";
import EmptyTasks from "./components/EmptyTasks";
import TasksNav from "./components/TasksNav";

function App() {
    const [input, setInput] = useState("");
    const [priority, setPriority] = useState("medium");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [prioritySort, setPrioritySort] = useState("none");

    useEffect(() => {
        if (tasks.length !== 0)
            localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(
                JSON.parse(storedTasks).map((task) => ({
                    ...task,
                    priority: task.priority || "medium",
                }))
            );
        }
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const updateTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    const updatePriority = (id, selectedPriority) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, priority: selectedPriority }
                    : task
            )
        );
    };

    const deleteTask = (index) => {
        setTasks((prev) => {
            return prev.filter(({ id }) => id !== index);
        });
    };

    const addTask = () => {
        if (input !== "") {
            setTasks((prev) => [
                ...prev,
                { id: nanoid(), task: input, isDone: false, priority },
            ]);
            setInput("");
        }
    };

    const clearAllTasks = () => {
        setTasks([]);
        localStorage.removeItem("tasks");
    };

    const handleFilter = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    const priorityRank = { high: 3, medium: 2, low: 1 };
    const showedTasks = tasks
        .filter((task) => {
            const matchesStatus =
                filter === "all" ||
                (filter === "completed" && task.isDone) ||
                (filter === "pending" && !task.isDone);
            const matchesPriority =
                priorityFilter === "all" ||
                task.priority === priorityFilter;

            return matchesStatus && matchesPriority;
        })
        .sort((a, b) => {
            if (prioritySort === "high") {
                return priorityRank[b.priority] - priorityRank[a.priority];
            }
            if (prioritySort === "low") {
                return priorityRank[a.priority] - priorityRank[b.priority];
            }
            return 0;
        });

    const taskArray = showedTasks.map(({ id, task, isDone, priority }) => {
        return (
            <Task
                key={id}
                task={task}
                isDone={isDone}
                priority={priority}
                updateTask={() => updateTask(id)}
                updatePriority={(selectedPriority) =>
                    updatePriority(id, selectedPriority)
                }
                deleteTask={() => deleteTask(id)}
            />
        );
    });

    return (
        <div className="flex h-screen flex-col w-screen justify-center items-center overflow-hidden select-none bg-gradient-to-br from-primary to-secondary">
            <div className="flex flex-col h-screen w-screen p-3 border gap-3 border-white/20 bg-white/10 backdrop-blur-sm md:h-[70%] md:w-[550px] md:rounded-md ">
                <Title />
                <TaskInput
                    input={input}
                    priority={priority}
                    setPriority={setPriority}
                    add={addTask}
                    handleKeyPress={handleKeyPress}
                    handleChange={handleChange}
                />
                <div className="bg-white-100 flex relative p-4 pr-1 pt-0 w-full flex-col h-full overflow-y-scroll rounded-[4px]">
                    <TasksNav
                        filter={filter}
                        clearAllTasks={clearAllTasks}
                        all={() => handleFilter("all")}
                        pending={() => handleFilter("pending")}
                        completed={() => handleFilter("completed")}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                        prioritySort={prioritySort}
                        setPrioritySort={setPrioritySort}
                    />
                    <EmptyTasks
                        show={showedTasks.length === 0}
                        filter={filter}
                    />
                    {taskArray}
                </div>
            </div>
        </div>
    );
}

export default App;
