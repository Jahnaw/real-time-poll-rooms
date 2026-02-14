import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/polls/${id}`)
      .then((res) => res.json())
      .then(setPoll);

    socket.emit("join-poll", id);

    socket.on("poll-updated", (updatedPoll) => {
      setPoll(updatedPoll);
    });

    if (localStorage.getItem(`voted_${id}`)) {
      setHasVoted(true);
      setMessage("You have already voted on this poll");
    }

    return () => {
      socket.off("poll-updated");
    };
  }, [id]);

  const vote = async () => {
    if (hasVoted) {
      setMessage("You have already voted");
      return;
    }

    if (selected === null) {
      setMessage("Please select an option");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/polls/${id}/vote`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionIndex: selected }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Voting failed");
      return;
    }

    localStorage.setItem(`voted_${id}`, "true");
    setHasVoted(true);
    setMessage("Vote recorded!");
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div className="page-wrapper">
      <div className="card">
        <h2>{poll.question}</h2>

        {poll.options.map((opt, index) => (
          <div
            key={index}
            className={`selectable-option
              ${selected === index ? "selected" : ""}
              ${hasVoted ? "disabled" : ""}
            `}
            onClick={() => {
              if (!hasVoted) setSelected(index);
            }}
          >
            <div className="option-text">
              <input
                type="radio"
                className="option-radio"
                checked={selected === index}
                readOnly
              />
              <span>{opt.text}</span>
            </div>
            <span>{opt.votes}</span>
          </div>
        ))}

        <button
          className="primary-button"
          onClick={vote}
          disabled={hasVoted}
        >
          Submit your vote
        </button>

        <p className="muted-text">{message}</p>
      </div>
    </div>
  );
}

export default PollPage;
