import { useState } from "react";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollId, setPollId] = useState(null);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const createPoll = async () => {
    const response = await fetch("http://localhost:5000/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options }),
    });

    const data = await response.json();
    setPollId(data.pollId);
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h2>Create a Poll</h2>

        <input
          className="input"
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((option, index) => (
          <div className="option-box" key={index}>
            <input
              className="input"
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(index, e.target.value)
              }
            />
          </div>
        ))}

        <button className="secondary-button" onClick={addOption}>
          + Add another option
        </button>

        <button className="primary-button" onClick={createPoll}>
          Create Poll
        </button>

        {pollId && (
          <p className="muted-text">
            Poll created successfully.{" "}
            <a href={`/poll/${pollId}`}>Go to poll →</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default CreatePoll;
