import "./App.css";
import Mapgl from "./components/map/mapComponent";
import { RouteInfoComponent } from "./components/RouteInfo/RouteInfoComponent";
function App() {
  return (
    <>
      <div className="card">
        <RouteInfoComponent />
      </div>
      <div className="card">
        <Mapgl />
      </div>
    </>
  );
}

export default App;
