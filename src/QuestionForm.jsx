import { useState } from "react";

export default function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [person, setPerson] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && answer && person) {
      const newQuestions = [...questions, { question, answer, person }];
      setQuestions(newQuestions);
      setQuestion("");
      setAnswer("");
      setPerson("");
      generateCode(newQuestions);
    }
  };

  const generateCode = (questions) => {
    const code = `
<div class="questions">
  ${questions
    .map(
      (q, index) => `
  <!-- 担当者: ${q.person} -->
  <h4>Q${index + 1}. ${q.question}</h4>
  <h4>A${index + 1}. ${q.answer}</h4>`
    )
    .join("\n  ")}
</div>`;
    setGeneratedCode(code);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-bold">質問(コピペしてください):</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold">回答:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold">担当者:</label>
          <input
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          追加
        </button>
      </form>
      <pre className="p-4 border rounded bg-gray-100 overflow-auto">
        {generatedCode}
      </pre>
    </div>
  );
}
