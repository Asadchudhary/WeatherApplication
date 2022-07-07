import React from "react";
import "./Progress.css";
const Progressbar = () => {
  let progressCircular = document.querySelector(".progress-circular");
  let inp = document.querySelector("input");
  let btn = document.querySelector("button");
  let value = document.querySelector(".value");
  let start = 0;
  if (btn) {
    btn.addEventListener("click", bar);
  }
  function bar() {
    let progress = setInterval(() => {
      if (start < inp.value) {
        start++;
        ProfgressEnd();
      } else {
        start--;
        ProfgressEnd();
      }
      function ProfgressEnd() {
        start++;
        progressCircular.style.background =
          "conic-gradient(#880bea ${start}deg, #ededed 0deg) ";
        value.textContent = `${start}%`;
        console.log(start);
        if (start == inp.value) {
          clearInterval(progress);
          inp.value = "";
        }
      }
    });
  }
  return (
    <>
      <div className="Container">
        <div className="progress-circular">
          <span className="value">0%</span>
        </div>
        <div className="text">Enter any number</div>
        <div className="btn">
          <input type="text" autoFocus />
          <button>Enter</button>
        </div>
      </div>
    </>
  );
};

export default Progressbar;
