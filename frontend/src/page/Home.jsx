// import { Link, Navigate, useNavigate } from "react-router-dom";
// import img1 from "../assets/o.png";
// import img2 from "../assets/jorimg.jpg";
// import img3 from "../assets/voting.jpg";
// import CountdownTimer from "../comonamt/timer";
// import ElectoralDistricts from "../comonamt/ElectoralDistricts";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import ChatBox from "../chatbooks/newchat";
// import RoomPage from "../comonamt/room";

// const Home = () => {
//   const [advertisements, setAdvertisements] = useState([]);
//   const [fullName, setFullName] = useState("");
//   const [roomId, setRoomId] = useState("");
//   const navigate = useNavigate();
//   const handleRoomIdGenerate = () => {
//     const randomId = Math.random().toString(36).substring(2, 9);
//     const timestamp = Date.now().toString().substring(-4);
//     setRoomId(randomId + timestamp);
//   };
//   const hanleOneAndOneCall = () => {
//     if (!roomId) {
//       alert("please generate room Id First");
//       return;
//     }
//     navigate(`room/${roomId}?type=one-on-one`);
//   };
//   const hanleGroupCall = () => {
//     if (!roomId) {
//       alert("please generate room Id First");
//       return;
//     }
//     Navigate(`room/${roomId}?type=group-call`);
//   };

//   useEffect(() => {
//     const fetchAdvertisements = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/advertisements"
//         );
//         setAdvertisements(response.data);
//       } catch (error) {
//         console.error("Error fetching advertisements:", error);
//       }
//     };

//     fetchAdvertisements();
//   }, []);

//   useEffect(() => {
//     const checkLocalVoteStatus = async () => {
//       try {
//         const national_id = "2000000201";
//         const response = await axios.get(
//           `http://localhost:5000/voting/${national_id}`
//         );
//         const fullNameFromResponse = `${response.data.FULL_NAME}`;
//         console.log("Fetched fullName:", fullNameFromResponse);
//         setFullName(fullNameFromResponse);
//       } catch (error) {
//         console.error("Error fetching vote status:", error);
//       }
//     };

//     checkLocalVoteStatus();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       {/* Building image */}
//       <div className="mb-8 h-screen relative">
//         <CountdownTimer />
//         <img
//           src={img1}
//           alt="Election Building"
//           className="w-full h-screen object-cover rounded-lg shadow-lg"
//         />
//       </div>

//       {/* Jordan map and welcome message */}
//       <div className="relative h-screen flex items-center justify-center mb-8">
//         <div className="absolute inset-0">
//           <img
//             src={img2}
//             alt="Jordan Map"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="absolute top-120 right-0 p-6 md:p-8 text-black bg-opacity-75 bg-white w-full md:w-/4 lg:w-1/2 text-right rounded-lg shadow-lg">
//           {" "}
//           <h2 className="text-3xl md:text-4xl mb-4 text-center font-semibold">
//             {fullName} مرحبا
//           </h2>
//           <p className="text-lg md:text-xl text-center leading-relaxed">
//             شكرا لتسجيل دخولك إلى موقعنا. نحن هنا لمساعدتك في عملية الانتخابات.
//             إذا كنت ترغب في استكشاف المزيد عن الانتخابات القادمة، المرشحين،
//             والمواضيع الهامة
//           </p>
//         </div>
//       </div>
//       <h1 className="text-4xl font-bold text-center mb-8 mt-12 text-gray-800">
//         ما هي الانتخابات
//       </h1>
//       <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-12">
//         <div className="md:w-1/2 text-right mb-6 md:mb-0">
//           <p className="text-lg leading-relaxed text-gray-700">
//             الانتخابات هي الركيزة الأساسية للديمقراطية التمثيلية. من خلالها،
//             يختار المواطنون ممثليهم في المناصب السياسية المختلفة. وهذه العملية
//             تُعد من أهم آليات المشاركة السياسية والتعبير عن إرادة الشعب.
//           </p>
//         </div>
//         <div className="md:w-1/2">
//           <img
//             src={img3}
//             alt="الناس يشاركون في عملية التصويت"
//             className="w-full h-auto rounded-lg shadow-lg"
//           />
//         </div>
//       </div>

//       <div className="mb-8 mt-10">
//         <ElectoralDistricts />
//       </div>

//       <h2 className="text-3xl mb-4 text-center font-semibold">
//         الإعلانات الجديدة
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {advertisements.slice(0, 3).map((ad) => (
//           <div
//             key={ad.ID}
//             className="border p-4 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
//           >
//             <button className="bg-red-600 text-white px-4 py-2 mt-2 w-full rounded-lg transition-transform hover:bg-red-700">
//               {ad.DESCRIPTION}
//             </button>
//             <img
//               src={ad.URL}
//               alt={`TITLE ${ad.TITLE}`}
//               className="w-full h-32 object-cover mb-2 rounded-lg"
//             />
//             <h3 className="font-bold text-lg mb-2">{ad.TITLE}</h3>
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
//         {advertisements.slice(3, 6).map((ad) => (
//           <div
//             key={ad.ID}
//             className="border p-4 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
//           >
//             <img
//               src={ad.URL}
//               alt={`TITLE ${ad.TITLE}`}
//               className="w-full h-32 object-cover mb-2 rounded-lg"
//             />
//             <h3 className="font-bold text-lg mb-2">{ad.TITLE}</h3>
//           </div>
//         ))}
//       </div>
//       <div className="mb-8 text-right" dir="rtl">
//         <h2 className="text-3xl mb-10 text-center font-semibold mt-10">
//           تثقيف الناخبين
//         </h2>
//         <div className="bg-blue-100 p-4 rounded-lg">
//           <p className="mb-4">تعرف على حقوقك وواجباتك كناخب:</p>
//           <ul className="list-disc list-inside">
//             <li className="mb-2">كيفية التحقق من تسجيلك كناخب</li>
//             <li className="mb-2">الوثائق المطلوبة يوم الانتخاب</li>
//             <li className="mb-2">خطوات عملية التصويت</li>
//           </ul>
//           <div className="mt-6">
//             <h3 className="text-xl font-semibold mb-2">حقوقك وواجباتك</h3>
//             <ul className="list-disc list-inside pl-5">
//               <li className="mb-2">الحق في التصويت دون تمييز</li>
//               <li className="mb-2">واجب الالتزام بالقوانين الانتخابية</li>
//               <li className="mb-2">الحق في الحصول على المعلومات الانتخابية</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="mb-8" dir="rtl">
//         <h2 className="text-3xl mb-4 text-center font-semibold">
//           الأسئلة الشائعة
//         </h2>
//         <div className="space-y-4">
//           {[
//             {
//               q: "متى موعد الانتخابات القادمة؟",
//               a: "ستجرى الانتخابات في [التاريخ].",
//             },
//             {
//               q: "كيف يمكنني التحقق من تسجيلي كناخب؟",
//               a: "يمكنك التحقق عبر [الرابط] أو زيارة أقرب مركز تسجيل.",
//             },
//             {
//               q: "ما هي الوثائق المطلوبة للتصويت؟",
//               a: "تحتاج إلى بطاقة الهوية الوطنية سارية المفعول.",
//             },
//           ].map((faq, index) => (
//             <div key={index} className="bg-gray-100 p-4 rounded-lg">
//               <h3 className="font-semibold mb-2">{faq.q}</h3>
//               <p>{faq.a}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* VideoCall Component */}
//       <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
//         <h1 className="text-4xl font-bold mb-4">
//           أهلاً بك في تطبيق المكالمات المرئية
//         </h1>
//         <p className="text-lg mb-6">
//           ابدأ مكالمة فيديو باستخدام معرف غرفة تم إنشاؤه عشوائياً
//         </p>

//         <div className="flex items-center mb-4">
//           <input
//             type="text"
//             value={roomId}
//             readOnly
//             placeholder="معرف الغرفة المُنشأ"
//             className="border border-gray-300 p-2 rounded-l-lg w-60"
//           />
//           <button
//             onClick={handleRoomIdGenerate}
//             className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors"
//           >
//             إنشاء
//           </button>
//         </div>

//         <div className="flex space-x-4">
//           <button
//             className={`px-4 py-2 rounded-lg transition-transform duration-300 ${
//               roomId
//                 ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-lg"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//             disabled={!roomId}
//             onClick={hanleOneAndOneCall}
//           >
//             مكالمة فردية
//           </button>
//           <button
//             disabled={!roomId}
//             onClick={hanleGroupCall}
//             className={`px-4 py-2 rounded-lg transition-transform duration-300 ${
//               roomId
//                 ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-lg"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             مكالمة جماعية
//           </button>
//         </div>
//       </div>

//       {/* ChatBox Component */}
//       <div className="mb-8" dir="rtl">
//         <ChatBox />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/o.png";
import img2 from "../assets/jorimg.jpg";
import img3 from "../assets/voting.jpg";
import CountdownTimer from "../comonamt/timer";
import ElectoralDistricts from "../comonamt/ElectoralDistricts";
import axios from "axios";
import ChatBox from "../chatbooks/newchat";

const Home = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const [fullName, setFullName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();


  

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    setRoomId(randomId + timestamp);
  };


  const handleOneAndOneCall = () => {
    if (!roomId) {
      alert("Please generate room ID first");
      return;
    }
    navigate(`room/${roomId}?type=one-on-one`);
  };

  const handleGroupCall = () => {
    if (!roomId) {
      alert("Please generate room ID first");
      return;
    }
    navigate(`room/${roomId}?type=group-call`);
  };

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/advertisements"
        );
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  useEffect(() => {
    const checkLocalVoteStatus = async () => {
      try {
        const national_id = "2000000201";
        const response = await axios.get(
          `http://localhost:5000/voting/${national_id}`
        );
        const fullNameFromResponse = `${response.data.FULL_NAME}`;
        setFullName(fullNameFromResponse);
      } catch (error) {
        console.error("Error fetching vote status:", error);
      }
    };

    checkLocalVoteStatus();
  }, []);

   useEffect(()=>{
     const checkLoginStatus = async () => {
       try {
         const response = await fetch("/api/check-login-status");
         const data = await response.json();
         setIsLoggedIn(data.isLoggedIn);
       } catch (error) {
         console.error("Error checking login status:", error);
         setIsLoggedIn(false);
       }
     };
     checkLoginStatus();
   },
  []);

  

  return (
    <div className="container mx-auto p-4 bg-white">
      <style jsx>{`
        .bg-jordan-green {
          background-color: #06783d;
        }
        .text-jordan-green {
          color: #06783d;
        }
        .border-jordan-green {
          border-color: #06783d;
        }
        .bg-jordan-red {
          background-color: #d00d18;
        }
        .text-jordan-red {
          color: #d00d18;
        }
        .border-jordan-red {
          border-color: #d00d18;
        }
        .hover-bg-jordan-green:hover {
          background-color: #056231;
        }
        .hover-bg-jordan-red:hover {
          background-color: #b00b15;
        }
      `}</style>

      <header className="mb-8 text-center bg-jordan-green text-white p-4 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">
          مرحباً بك في موقع الانتخابات
        </h1>
        <p className="text-xl">
          {fullName ? `أهلاً ${fullName}` : "مرحباً بك"}
        </p>
      </header>

      <div className="mb-8 relative">
        <CountdownTimer />
        <img
          src={img1}
          alt="Election Building"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="mb-12 relative">
        <img
          src={img2}
          alt="Jordan Map"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute top-0 right-0 p-6 text-white bg-jordan-green bg-opacity-90 rounded-bl-lg">
          <h2 className="text-3xl mb-2 font-semibold">مرحبا {fullName}</h2>
          <p className="text-lg leading-relaxed">
            شكرا لتسجيل دخولك إلى موقعنا. نحن هنا لمساعدتك في عملية الانتخابات.
          </p>
        </div>
      </div>

      <section className="mb-12 bg-white border-2 border-jordan-green p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-jordan-green">
          ما هي الانتخابات
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2 text-right mb-6 md:mb-0">
            <p className="text-lg leading-relaxed text-black">
              الانتخابات هي الركيزة الأساسية للديمقراطية التمثيلية. من خلالها،
              يختار المواطنون ممثليهم في المناصب السياسية المختلفة. وهذه العملية
              تُعد من أهم آليات المشاركة السياسية والتعبير عن إرادة الشعب.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={img3}
              alt="الناس يشاركون في عملية التصويت"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-jordan-green">
          الإعلانات الجديدة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.slice(0, 3).map((ad) => (
            <div
              key={ad.ID}
              className="bg-white border-2 border-jordan-red p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={ad.URL}
                alt={`TITLE ${ad.TITLE}`}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
              <h3 className="font-bold text-lg mb-2 text-jordan-green">
                {ad.TITLE}
              </h3>
              <button className="bg-jordan-red text-white px-4 py-2 rounded-lg w-full hover-bg-jordan-red transition-colors">
                {ad.DESCRIPTION}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mb-12 bg-white border-2 border-jordan-green p-6 rounded-lg shadow-lg"
        dir="rtl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-green">
          تثقيف الناخبين
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-4 font-semibold text-jordan-green">
            تعرف على حقوقك وواجباتك كناخب:
          </p>
          <ul className="list-disc list-inside space-y-2 text-black">
            <li>كيفية التحقق من تسجيلك كناخب</li>
            <li>الوثائق المطلوبة يوم الانتخاب</li>
            <li>خطوات عملية التصويت</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-jordan-green">
              حقوقك وواجباتك
            </h3>
            <ul className="list-disc list-inside pl-5 space-y-2 text-black">
              <li>الحق في التصويت دون تمييز</li>
              <li>واجب الالتزام بالقوانين الانتخابية</li>
              <li>الحق في الحصول على المعلومات الانتخابية</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12" dir="rtl">
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-green">
          الأسئلة الشائعة
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "متى موعد الانتخابات القادمة؟",
              a: "ستجرى الانتخابات في [التاريخ].",
            },
            {
              q: "كيف يمكنني التحقق من تسجيلي كناخب؟",
              a: "يمكنك التحقق عبر [الرابط] أو زيارة أقرب مركز تسجيل.",
            },
            {
              q: "ما هي الوثائق المطلوبة للتصويت؟",
              a: "تحتاج إلى بطاقة الهوية الوطنية سارية المفعول.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-jordan-green p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-jordan-green">{faq.q}</h3>
              <p className="text-black">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white border-2 border-jordan-red p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-jordan-red">
          تطبيق المكالمات المرئية
        </h2>
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4 text-black">
            ابدأ مكالمة فيديو باستخدام معرف غرفة تم إنشاؤه عشوائياً
          </p>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={roomId}
              readOnly
              placeholder="معرف الغرفة المُنشأ"
              className="border border-jordan-green p-2 rounded-r-lg w-60"
            />
            <button
              onClick={handleRoomIdGenerate}
              className="bg-jordan-red text-white p-2 rounded-l-lg hover-bg-jordan-red transition-colors"
            >
              إنشاء
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                roomId
                  ? "bg-jordan-green text-white hover-bg-jordan-green"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!roomId}
              onClick={handleOneAndOneCall}
            >
              مكالمة فردية
            </button>
            <button
              disabled={!roomId}
              onClick={handleGroupCall}
              className={`px-4 py-2 rounded-lg transition-colors ${
                roomId
                  ? "bg-jordan-green text-white hover-bg-jordan-green"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              مكالمة جماعية
            </button>
          </div>
        </div>
      </section>

      {!isLoggedIn && <p>يرجى تسجيل الدخول لاستخدام ميزة الدردشة.</p>}

      <section className="mb-12" dir="rtl">
        <div>
          <h1>مرحبًا بك في الصفحة الرئيسية</h1>

          {!isLoggedIn && <p>يرجى تسجيل الدخول لاستخدام ميزة الدردشة.</p>}

          <ChatBox isLoggedIn={isLoggedIn} />
        </div>
      </section>

      <ElectoralDistricts />

      <footer className="text-center text-white bg-jordan-green p-4 rounded-lg mt-12">
        <p>&copy; 2024 موقع الانتخابات. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default Home;
