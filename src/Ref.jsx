import React, { useRef, useState } from "react";

const Ref = () => {
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  return (
    <div>
      Name <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          setData([...data, inputRef.current.value]);
        }}
      >
        submit
      </button>
      {data.map((item, index) => {
        return <h2 key={index}>{item}</h2>;
      })}
    </div>
  );
};

export default Ref;
