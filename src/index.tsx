import ReactDom from "react-dom";

const App = () => {
  return (
    <div>
      <textarea></textarea>
      <div>
        <button>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
