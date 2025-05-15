// This is a simple Express.js server that checks for disposable email addresses
// using the Debounce.io API. It listens for POST requests to the `/api/register` endpoint

// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.post('/api/register', async (req, res) => {
//     const { email, password } = req.body;
//     console.log("Received email:", email);
//     console.log("Received password:", password);

//     if (!email || !password) {
//         console.log("Invalid input: missing email or password");
//         return res.status(400).json({ error: 'Invalid input' });
//     }

//     // Disposable email check using debounce.io
//     try {
//         const debounceRes = await axios.get(`https://disposable.debounce.io/?email=${encodeURIComponent(email)}`);
//         console.log("Debounce.io API response:", debounceRes.data);

//         // debounce.io returns {disposable: "true"} for disposable emails
//         if (debounceRes.data.disposable === "true") {
//             console.log("Email is disposable:", debounceRes.data.disposable);
//             return res.status(400).json({ error: 'Disposable email addresses are not allowed.' });
//         }
//     } catch (error) {
//         console.error('Debounce.io API error:', error.message || error);
//         return res.status(500).json({ error: 'Error checking email address.' });
//     }

//     // Simulate a registration process
//     console.log("Email is not disposable, proceeding with registration.");
//     return res.status(200).json({ message: 'Registration successful!' });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });



// this code is a simple Express.js server that checks for disposable email addresses
// using the Quickemailverification API. It listens for POST requests to the `/api/register` endpoint

// const express = require('express');
// const cors = require('cors');
// const quickemailverification = require('quickemailverification');

// const app = express();
// const port = 3000;

// // Replace with your QuickEmailVerification API key
// const qev = quickemailverification.client('983fbc93526ff682f5076019d26e101830e094446de4a7f9975f43e19473'); // <-- Put your API key here

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.post('/api/register', (req, res) => {
//     const { email, password } = req.body;
//     console.log("Received email:", email);
//     console.log("Received password:", password);

//     if (!email || !password) {
//         console.log("Invalid input: missing email or password");
//         return res.status(400).json({ error: 'Invalid input' });
//     }

//     qev.verify(email, function (err, response) {
//         if (err) {
//             console.error('QuickEmailVerification API error:', err);
//             return res.status(500).json({ error: 'Email verification service error.' });
//         }

//         console.log("QuickEmailVerification API response:", response.body);

//         // Check if email is disposable
//         if (response.body.disposable === 'true') {
//             console.log("Email is disposable:", response.body.disposable);
//             return res.status(400).json({ error: 'Disposable email addresses are not allowed.' });
//         }

//         // Optionally, check if email is valid and deliverable
//         if (response.body.result !== 'valid') {
//             console.log("Email is not valid:", response.body.result);
//             return res.status(400).json({ error: 'Please enter a valid email address.' });
//         }

//         // Simulate a registration process
//         console.log("Email is valid and not disposable, proceeding with registration.");
//         return res.status(200).json({ message: 'Registration successful.' });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


///////////////////////////////////////////


// const express = require('express');
// const cors = require('cors');
// const quickemailverification = require('quickemailverification');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// // Replace with your QuickEmailVerification API key
// const QE_API_KEY = '983fbc93526ff682f5076019d26e101830e094446de4a7f9975f43e19473'; // <-- Put your API key here

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.post('/api/register', async (req, res) => {
//     const { email, password } = req.body;
//     console.log("Received email:", email);
//     console.log("Received password:", password);

//     if (!email || !password) {
//         console.log("Invalid input: missing email or password");
//         return res.status(400).json({ error: 'Invalid input' });
//     }

//     try {
//         // Call QuickEmailVerification API directly
//         const qeRes = await axios.get(
//             `https://api.quickemailverification.com/v1/verify`,
//             {
//                 params: { email },
//                 auth: {
//                     username: QE_API_KEY,
//                     password: '' // Password is blank for QuickEmailVerification
//                 }
//             }
//         );

//         console.log("QuickEmailVerification API response:", qeRes.data);

//         // Check if email is disposable
//         if (qeRes.data.disposable === 'true') {
//             console.log("Email is disposable:", qeRes.data.disposable);
//             return res.status(400).json({ error: 'Disposable email addresses are not allowed.' });
//         }

//         // Optionally, check if email is valid and deliverable
//         if (qeRes.data.result !== 'valid') {
//             console.log("Email is not valid:", qeRes.data.result);
//             return res.status(400).json({ error: 'Please enter a valid email address.' });
//         }

//         // Simulate a registration process
//         console.log("Email is valid and not disposable, proceeding with registration.");
//         return res.status(200).json({ message: 'Registration successful.' });
//     } catch (err) {
//         console.error('QuickEmailVerification API error:', err.message || err);
//         return res.status(500).json({ error: 'Email verification service error.' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const QuickEmailVerification = require('quickemailverification');

// Replace with your actual QuickEmailVerification API key
const QEV_API_KEY = '983fbc93526ff682f5076019d26e101830e094446de4a7f9975f43e19473';

// Correct client initialization
const qev = QuickEmailVerification.client(QEV_API_KEY).quickemailverification();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username, and password are required.' });
  }

  qev.verify(email, function (err, response) {
    if (err) {
      console.error('QuickEmailVerification API error:', err);
      return res.status(500).json({ error: 'Email verification service error.' });
    }

    // Debug: see the full response
    console.log(response.body);

    if (
      response.body.disposable === 'true' ||
      response.body.result !== 'valid' ||
      response.body.safe_to_send !== 'true'
    ) {
      return res.status(400).json({ error: 'Please enter a valid, deliverable email address.' });
    }

    // Proceed with registration
    return res.status(200).json({ message: 'Registration successful!' });
  });

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});