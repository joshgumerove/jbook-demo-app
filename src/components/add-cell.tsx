import "./add-cell.css";
import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  nextCellid: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellid }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button onClick={() => insertCellBefore(nextCellid, "code")}>
          Code
        </button>
        <button onClick={() => insertCellBefore(nextCellid, "text")}>
          Text
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
