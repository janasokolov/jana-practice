import { useState } from "react";
import { TaskEditor } from "../TaskEditor";
import { TaskList } from "../TaskList";
import { Task } from "../../models";

const initialTasks: Task[] = [
  {
    id: 1,
    assignee: "Jana",
    description: "Create react app",
    priority: 0,
    status: "TODO",
    dueDate: new Date(),
  },
];

export const TaskManager = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const generateId = (): number => {
    if (tasks.length === 0) {
      return 1;
    }

    return Math.max(...tasks.map((t) => t.id)) + 1;
  };

  const handleDelete = (taskId: number) => {
    if (taskId === selectedTask?.id) {
      setSelectedTask(undefined);
    }
    setTasks(
      tasks
        .filter((t) => t.id !== taskId)
        .map((t, index) => ({ ...t, id: index + 1 }))
    );
  };

  const handleCreateOrUpdate = (task: Task) => {
    if (task.id === 0) {
      setTasks([...tasks, { ...task, id: generateId() }]);
    } else {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    }
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div className="content-list" style={{ width: "60%" }}>
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onSelect={(taskId) =>
            setSelectedTask(tasks.find((t) => t.id === taskId))
          }
        />
      </div>
      <div className="content-details" style={{ width: "40%" }}>
        <TaskEditor
          task={selectedTask}
          onCreateOrUpdate={handleCreateOrUpdate}
          onClear={() => setSelectedTask(undefined)}
        />
      </div>
    </div>
  );
};
