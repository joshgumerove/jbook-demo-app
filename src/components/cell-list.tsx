import React, { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <AddCell nextCellid={cell.id} />
        <CellListItem cell={cell} />
      </Fragment>
    );
  });

  return (
    <div>
      {renderedCells}
      <AddCell nextCellid={null} />
    </div>
  );
};

export default CellList;
