import "./text-editor.css";
import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor card" ref={ref}>
        <div className="card-content">
          <MDEditor
            value={cell.content}
            onChange={(v) => updateCell(cell.id, v || " ")}
          />
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={cell.content || "Click to edit"} />
    </div>
  );
};

export default TextEditor;
