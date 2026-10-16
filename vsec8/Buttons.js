import React, { useState } from "react";

function Buttons() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <h2>{value}</h2>

      <button onClick={() => setValue(value + 1)}>
        Increase
      </button>

      <button onClick={() => setValue(value - 1)}>
        Decrease
      </button>
    </div>
  );
}

export default Buttons;
