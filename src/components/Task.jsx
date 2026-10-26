import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function Task({
    task,
    isDone,
    priority,
    deleteTask,
    updateTask,
    updatePriority,
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-full h-12 min-h-[48px] border-b flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                className="mr-4 ml-1 cursor-pointer border-secondary"
                type="checkbox"
                checked={isDone}
                onChange={updateTask}
                name="done"
            />
            <p
                className={`text-[13px] ${
                    isDone ? "text-slate-400 line-through" : "text-slate-800"
                }  font-medium w-full first-letter:uppercase my-auto`}
            >
                {task}
            </p>
            <select
                aria-label={`Priority for ${task}`}
                className={`mr-1 rounded-full border-0 px-2 py-1 text-[10px] font-semibold uppercase focus:outline-none ${
                    priority === "high"
                        ? "bg-red-100 text-red-700"
                        : priority === "low"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                }`}
                value={priority}
                onChange={(event) => updatePriority(event.target.value)}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <button
                className={`w-9 h-full transition-all duration-200  ${
                    isHovered ? "text-red-600 opacity-100" : "md:opacity-0 text-slate-400 opacity-100"
                }`}
                onClick={deleteTask}
                aria-label={`Delete ${task}`}
            >
                <XMarkIcon className="h-4 w-4" />
            </button>
        </div>
    );
}

export default Task;
