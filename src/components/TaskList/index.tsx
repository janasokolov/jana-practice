import { Task } from "../../models";

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  onSelect: (taskId: number) => void;
}

export const TaskList = ({ tasks, onDelete, onSelect }: TaskListProps) => {
  const handleSelect = (e: any, id: number) => {
    if (e.target.className === "deleteButton") {
      return;
    }

    onSelect(id);
  };
  return (
    <div>
      <div className="task-list">TaskList</div>
      <ul className="li-style">
        {tasks.map((t) => (
          <li onClick={(e) => handleSelect(e, t.id)}>
            <p>{t.id}</p>
            <p className="field1">{t.description}</p>
            <p className="field2">{t.assignee}</p>
            <p className="field3">{t.status}</p>
            <p className="field4">{t.priority}</p>
            <p className="field5">{t.dueDate.toString()}</p>
            <button className="deleteButton" onClick={() => onDelete(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
