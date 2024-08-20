import React, { useState } from "react";
import axios from "axios";
import { X, UserPlus, Check, Trash2 } from "lucide-react";

function LocalListForm() {
  const [listName, setListName] = useState("");
  const [circleId, setCircleId] = useState("");
  const [candidates, setCandidates] = useState([
    { nationalId: "", typeOfChair: "" },
  ]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAddCandidate = () => {
    setCandidates([...candidates, { nationalId: "", typeOfChair: "" }]);
  };

  const handleCandidateChange = (index, field, value) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;
    setCandidates(newCandidates);
  };

  const handleRemoveCandidate = (index) => {
    if (index === 0) return; // Prevent removing the first candidate
    const newCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(newCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/local-lists",
        {
          listName,
          circleId,
          candidates,
        }
      );
      console.log("List created:", response.data);
      setSuccess("تم إنشاء القائمة المحلية بنجاح!");
      // Reset form
      setListName("");
      setCircleId("");
      setCandidates([{ nationalId: "", typeOfChair: "" }]);
    } catch (error) {
      console.error("Error creating list:", error);
      setError("فشل في إنشاء القائمة المحلية. الرجاء المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 text-indigo-900">
        نموذج القائمة المحلية
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10"
      >
        <div className="mb-8">
          <label
            htmlFor="listName"
            className="block text-gray-800 text-xl font-semibold mb-3"
          >
            اسم القائمة
          </label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-lg"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="circleId"
            className="block text-gray-800 text-xl font-semibold mb-3"
          >
            رقم الدائرة
          </label>
          <input
            type="number"
            id="circleId"
            value={circleId}
            onChange={(e) => setCircleId(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-lg"
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-800 text-xl font-semibold mb-3">
            المرشحون
          </label>
          {candidates.map((candidate, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-indigo-700">
                  المرشح {index + 1}
                </span>
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCandidate(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <Trash2 size={24} />
                  </button>
                )}
              </div>
              <input
                type="text"
                value={candidate.nationalId}
                onChange={(e) =>
                  handleCandidateChange(index, "nationalId", e.target.value)
                }
                className="w-full px-4 py-3 text-gray-700 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-lg mb-2"
                placeholder="أدخل الرقم الوطني"
                required
              />
              <input
                type="text"
                value={candidate.typeOfChair}
                onChange={(e) =>
                  handleCandidateChange(index, "typeOfChair", e.target.value)
                }
                className="w-full px-4 py-3 text-gray-700 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-lg"
                placeholder="أدخل نوع المقعد"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCandidate}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 flex items-center"
          >
            <UserPlus size={24} className="mr-2" />
            إضافة مرشح آخر
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 text-xl flex items-center"
          >
            <Check size={24} className="mr-2" />
            إنشاء القائمة
          </button>
        </div>
      </form>
      {error && (
        <p className="text-red-500 text-center mt-6 text-xl bg-red-100 p-4 rounded-xl max-w-4xl mx-auto">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-500 text-center mt-6 text-xl bg-green-100 p-4 rounded-xl max-w-4xl mx-auto">
          {success}
        </p>
      )}
    </div>
  );
}

export default LocalListForm;
