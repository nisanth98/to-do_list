function TasksNav({
    filter,
    clearAllTasks,
    all,
    pending,
    completed,
    priorityFilter,
    setPriorityFilter,
    prioritySort,
    setPrioritySort,
}) {
    return (
        <div className="w-full border-b-2 mb-2 mt-1 pb-2">
            <div className="flex cursor-pointer items-end h-8">
                <ul className="flex text-slate-500 uppercase text-[.7rem] gap-1 w-full font-medium">
                <li
                    className={`px-2 text-left hover:text-primary border-primary ${
                        filter === "all" ? "text-primary font-semibold" : ""
                    }`}
                    onClick={all}
                >
                    All
                </li>
                <li
                    className={`pr-2 text-left hover:text-primary border-primary ${
                        filter === "pending" ? "text-primary font-semibold" : ""
                    }`}
                    onClick={pending}
                >
                    Pending
                </li>
                <li
                    className={`pr-2 text-left hover:text-primary border-primary ${
                        filter === "completed"
                            ? "text-primary font-semibold"
                            : ""
                    }`}
                    onClick={completed}
                >
                    Completed
                </li>
                </ul>
                <button
                    onClick={clearAllTasks}
                    className="text-xs w-20 rounded-sm mb-1 text-white h-5 bg-primary"
                >
                    Clear All
                </button>
            </div>
            <div className="flex gap-2">
                <label className="flex flex-1 items-center gap-1 text-[10px] font-medium uppercase text-slate-500">
                    Priority
                    <select
                        className="min-w-0 flex-1 rounded border border-slate-200 bg-white px-1 py-1 text-xs normal-case text-slate-700 focus:border-primary focus:outline-none"
                        value={priorityFilter}
                        onChange={(event) =>
                            setPriorityFilter(event.target.value)
                        }
                    >
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </label>
                <label className="flex flex-1 items-center gap-1 text-[10px] font-medium uppercase text-slate-500">
                    Sort
                    <select
                        className="min-w-0 flex-1 rounded border border-slate-200 bg-white px-1 py-1 text-xs normal-case text-slate-700 focus:border-primary focus:outline-none"
                        value={prioritySort}
                        onChange={(event) =>
                            setPrioritySort(event.target.value)
                        }
                    >
                        <option value="none">Default</option>
                        <option value="high">High to low</option>
                        <option value="low">Low to high</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default TasksNav;
