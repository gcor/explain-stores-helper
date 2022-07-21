import { useState } from "react";
import HooksWay from "./todo/HooksWay";
import ReduxWay from "./todo/ReduxWay";
import UseReducerWay from "./todo/UseReducerWay";
import UseStateWay from "./todo/UseStateWay";

enum Way {
  REDUX_WAY = "REDUX_WAY",
  USE_REDUCER_WAY = "USE_REDUCER_WAY",
  USE_STATE_WAY = "USE_STATE_WAY",
  HOOKS_WAY = "HOOKS_WAY",
}

function Type({ way }: { way: Way }) {
  switch (way) {
    case Way.USE_STATE_WAY:
      return <UseStateWay />;

    case Way.USE_REDUCER_WAY:
      return <UseReducerWay />;

    case Way.HOOKS_WAY:
      return <HooksWay />;

    case Way.REDUX_WAY:
      return <ReduxWay />;

    default:
      return null;
  }
}

function App() {
  const [type, setType] = useState<Way>(Way.REDUX_WAY);

  return (
    <div>
      <select
        value={type}
        onChange={(e: React.KeyboardEvent<HTMLSelectElement>) =>
          setType(e.target.value as Way)
        }
      >
        <option value={Way.USE_STATE_WAY}>useState</option>
        <option value={Way.USE_REDUCER_WAY}>useReducer</option>
        <option value={Way.HOOKS_WAY}>hooks</option>
        <option value={Way.REDUX_WAY}>Redux</option>
      </select>

      <Type way={type} />
    </div>
  );
}

export default App;
