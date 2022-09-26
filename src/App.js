import Column from "./components/Column";
function App() {
  const apiObjs = [
    {
      url: "https://gorest.co.in/public/v2/users/",
      name: "Public API",
    },
    {
      url: "https://gorest.co.in/public/v2/users/wqjhged",
      name: "Public API [Error]",
    },
  ];
  return (
    <div className="App">
      <div className="py-10">
        {apiObjs.map((api, key) => {
          return <Column apiObj={api} key={key} />;
        })}
      </div>
    </div>
  );
}

export default App;
