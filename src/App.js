import * as chrono from "chrono-node";
import { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [dates, setDates] = useState([]);

  const checkDate = (e) => {
    const updatedText = e.target.value;
    const results = chrono.parse(updatedText, Date.now(), {
      forwardDate: true,
      // ensures that date is after current day
    });
    if (results) {
      console.log(results);
      setDates(results.map((result) => result.start));
    }
    setText(updatedText);
  };

  const formatDate = (date) => {
    return `${
      date.knownValues.day ? date.knownValues.day : date.impliedValues.day
    }/${
      date.knownValues.month ? date.knownValues.month : date.impliedValues.month
    }/${
      date.knownValues.year ? date.knownValues.year : date.impliedValues.year
    }/${date.knownValues.hour ? date.knownValues.hour : ""}`;
  };

  return (
    <div className="w-screen h-screen grid place-items-center bg-gray-200">
      <div className="space-y-2">
        <input
          value={text}
          onChange={checkDate}
          className="w-48 h-10 rounded-lg shadow-md bg-white px-3 outline-none"
        />
        {dates &&
          dates.map((date, index) => (
            <div
              key={index}
              className="px-1 py-0.5 text-sm bg-gray-400 text-white rounded-md"
            >
              {formatDate(date)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
