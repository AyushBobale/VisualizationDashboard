import { getAllDataThunk } from "../redux/slices/dataSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDataThunk());
  }, []);
  return <div>Test</div>;
}

export default App;
