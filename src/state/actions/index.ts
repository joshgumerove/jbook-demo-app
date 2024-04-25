import { ActionType } from "../action-types";

interface MoveCellAction {
  type: ActionType.MOVE_CELL;
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
}

interface InsertCellBeforeActoin {
  type: ActionType.INSERT_CELL_BEFORE;
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
}

export type {
  MoveCellAction,
  DeleteCellAction,
  InsertCellBeforeActoin,
  UpdateCellAction,
};
