import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
import ReactDom from "react-dom";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
