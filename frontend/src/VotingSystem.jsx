import React, { useState, useEffect } from "react";
import axios from "axios";

const VotingSystem = () => {
  const [lists, setLists] = useState([]);
  const [candidates, setCandidates] = useState({});
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchLists();
    checkVoteStatus();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/lists");
      if (Array.isArray(response.data)) {
        setLists(response.data);
        fetchCandidatesForAllLists(response.data);
      } else {
        setError("Received invalid data for lists");
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
      setError("Failed to fetch lists. Please try again.");
    }
  };
  const fetchCandidatesForAllLists = async (lists) => {
    const candidatesData = {};
    for (const list of lists) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/candidates/${list.LIST_ID}`
        );
        if (Array.isArray(response.data)) {
          candidatesData[list.LIST_ID] = response.data;
        }
      } catch (error) {
        console.error(
          `Error fetching candidates for list ${list.LIST_ID}:`,
          error
        );
      }
    }
    setCandidates(candidatesData);
  };
  const handleListSelection = (listId) => {
    setSelectedListId(listId);
    if (selectedListId !== listId) {
      setSelectedListId(listId);
      setSelectedCandidates([]); // إعادة تعيين المرشحين المختارين عند تغيير القائمة
    }
  };

  const handleCandidateSelection = (listId, candidateId) => {
    setSelectedCandidates((prev) => {
      const listCandidates = prev[listId] || [];
      if (listCandidates.includes(candidateId)) {
        return {
          ...prev,
          [listId]: listCandidates.filter((id) => id !== candidateId),
        };
      } else {
        return {
          ...prev,
          [listId]: [...listCandidates, candidateId],
        };
      }
    });
  };

  const checkVoteStatus = async () => {
    const nationalId = sessionStorage.getItem("currentuser");
    if (!nationalId) {
      console.error("لم يتم العثور على معرف المستخدم في التخزين المؤقت للجلسة");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/check-vote-status/${nationalId}`
      );
      setHasVoted(response.data.hasVoted);
    } catch (error) {
      console.error("خطأ في التحقق من حالة التصويت:", error);
      setError("فشل في التحقق من حالة التصويت. الرجاء المحاولة مرة أخرى.");
    }
  };
  const handleSubmit = async () => {
    if (!selectedListId) {
      setError("الرجاء اختيار قائمة أولاً");
      return;
    }

    const nationalId = sessionStorage.getItem("currentuser");

    try {
      await axios.post("http://localhost:5000/api/vote-list", {
        listId: selectedListId,
        nationalId: nationalId,
      });

      if (selectedCandidates[selectedListId]?.length > 0) {
        await axios.post("http://localhost:5000/api/vote-candidates", {
          candidateIds: selectedCandidates[selectedListId],
        });
      }

      alert("تم تسجيل التصويت بنجاح");
      setHasVoted(true);
      setSelectedListId(null);
      setSelectedCandidates({});
    } catch (error) {
      console.error("خطأ في تسجيل التصويت:", error);
      setError("فشل في تسجيل التصويت. الرجاء المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        نظام التصويت
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          القوائم والمرشحون
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <div
              key={list.LIST_ID}
              className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ${
                selectedListId === list.LIST_ID
                  ? "border-4 border-blue-500 ring-4 ring-blue-300"
                  : "hover:shadow-xl"
              }`}
              onClick={() => handleListSelection(list.LIST_ID)}
            >
              <h3 className="text-xl font-bold mb-4 text-blue-700">
                {list.LIST_NAME}
              </h3>
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-700">
                  المرشحون:
                </h4>
                {candidates[list.LIST_ID]?.map((candidate) => (
                  <div key={candidate.CANDIDATE_ID} className="mb-2">
                    <label className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input
                        type="checkbox"
                        id={`candidate-${candidate.CANDIDATE_ID}`}
                        checked={
                          selectedCandidates[list.LIST_ID]?.includes(
                            candidate.CANDIDATE_ID
                          ) || false
                        }
                        onChange={() =>
                          handleCandidateSelection(
                            list.LIST_ID,
                            candidate.CANDIDATE_ID
                          )
                        }
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-800">
                        {candidate.FULL_NAME}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        {hasVoted ? (
          <p className="text-green-600 font-semibold text-xl bg-green-100 p-4 rounded-lg inline-block">
            لقد قمت بالتصويت بالفعل
          </p>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedListId}
            className={`px-8 py-4 rounded-full text-white font-semibold text-lg ${
              selectedListId
                ? "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                : "bg-gray-400 cursor-not-allowed"
            } transition-all duration-300`}
          >
            تأكيد التصويت
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-center mt-4 text-lg">{error}</p>
      )}
    </div>
  );
};

export default VotingSystem;
