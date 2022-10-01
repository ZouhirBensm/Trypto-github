import { useState } from 'react';

require('react-dom');
window.React2 = require('react');
console.log("same---->>>", window.React1 === window.React2);
console.log(window.React1)
console.log(window.React2)



function SomeComponent() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);


  return (
    <div>
      {/* <p>You clicked {count} times</p>
      {count}
      <button onClick={() => setCount(count + 1)}> */}
        <button>
        Click me
      </button>
    </div>
  );
}

export default SomeComponent