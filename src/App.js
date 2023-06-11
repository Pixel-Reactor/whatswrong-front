import './App.css';
import { Handler } from "./context/Context";
import { Test } from './Api/Api';
import { useEffect } from 'react';
function App() {
  const {test,settest} = Handler();
  const DataTest = async()=>{
    const response = await Test();
    console.log(response)
  }
  useEffect(() => {
    DataTest();
  }, []);

console.log(test)
  return (
    <div className="App">
      hello world 
    </div>
  );
}

export default App;
