// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [disposableDomains, setDisposableDomains] = useState(new Set());
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Load disposable domains on component mount
//   useEffect(() => {
//     const fetchDomains = async () => {
//       try {
//         const response = await axios.get(
//           "https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.json"
//         );
//         console.log("✅ Disposable domains loaded", response.data);
//         setDisposableDomains(new Set(response.data));
//       } catch (err) {
//         console.error("Failed to load disposable domains", err);
//       }
//     };
//     fetchDomains();
//   }, []);

//   const isDisposableEmail = (email) => {
//     const domain = email.split("@")[1]?.toLowerCase();
//     return disposableDomains.has(domain);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { email, password } = formData;

//     if (!email || !password) {
//       setError("Both fields are required.");
//       return;
//     }

//     if (isDisposableEmail(email)) {
//       setError("Disposable email addresses are not allowed.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/register", {
//         email,
//         password,
//       });
//       setSuccess(response.data.message);
//       setFormData({ email: "", password: "" });
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Register</h2>
//       {error && <div className="text-red-600 mb-2">{error}</div>}
//       {success && <div className="text-green-600 mb-2">{success}</div>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           className="w-full border p-2 rounded"
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           className="w-full border p-2 rounded"
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;


import React, { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const checkDisposableEmail = async (email) => {
    try {
      const response = await fetch(`https://open.kickbox.com/v1/disposable/${email}`);
      const data = await response.json();
      console.log("Kickbox API response:", data);
      // Show popup message
      if (data.disposable) {
        window.alert("This is a temporary/disposable email address.");
      } else {
        window.alert("This is NOT a temporary/disposable email address.");
      }
      return data.disposable;
    } catch (error) {
      console.error("Kickbox API error:", error);
      return false; // assume not disposable if API fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    const isDisposable = await checkDisposableEmail(email);

    if (isDisposable) {
      setMessage("Temporary or disposable email addresses are not allowed.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("User registered successfully.");
      } else {
        setMessage(result.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Server error.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border mb-2 rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Register
      </button>
      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </form>
  );
};

export default RegisterForm;


// import React, { useState } from "react";

// const RegisterForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

// //   const checkDisposableEmail = async (email) => {
// //     const API_KEY = "test_14c11dd9a059121feadca039dba98b1702c4747a1472487041536e3dc20c6210"; // Replace with your Kickbox API key
// //     try {
// //       const response = await fetch(`https://api.kickbox.com/v2/disposable/${email}`, {
// //         headers: {
// //           Authorization: `Bearer ${API_KEY}`,
// //         },
// //       });
// //       const data = await response.json();
// //       console.log("Kickbox API response:", data);
// //       return data.disposable;
// //     } catch (error) {
// //       console.error("Kickbox API error:", error);
// //       return false; // Assume not disposable if API fails
// //     }
// //   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setMessage("Email and password are required.");
//       return;
//     }

//     const isDisposable = await checkDisposableEmail(email);

//     if (isDisposable) {
//       setMessage("Temporary or disposable email addresses are not allowed.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setMessage("User registered successfully.");
//       } else {
//         setMessage(result.error || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setMessage("Server error.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="w-full p-2 border mb-2 rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="w-full p-2 border mb-2 rounded"
//       />
//       <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//         Register
//       </button>
//       {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
//     </form>
//   );
// };

// export default RegisterForm;

