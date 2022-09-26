import Column from "./components/Column";
function App() {
  const apiObjs = [
    {
      url: "https://gorest.co.in/public/v2/users",
      name: "Test API",
    },
  ];
  return (
    <div className="App">
      {apiObjs.map((api) => {
        return <Column apiObj={api} />;
      })}
    </div>
  );
}

export default App;
