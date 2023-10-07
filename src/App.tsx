import {Creditors} from "./components/Creditors";
import  "./App.css";

function App() {
  
  return (
    <div className="overflow-hidden flex" style={{"fontFamily": "Outfit", "height": "100vh"}}>
      { <Creditors />}
    </div>
  );
}

export default App;
