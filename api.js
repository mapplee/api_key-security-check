const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs').promises;

// Function to generate JWT token
async function generateToken() {
    try {
        const privateKey = await fs.readFile('./ssh_keys/key', 'utf8');
        const payload = {
            iat: Math.floor(Date.now() / 1000), // Current time
            exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60, // Expire in 2 hours
            iss: "678fdab519f1a067658af0f0", // Your Partner ID
            aud: "https://sandbox.absintegrations.com/api/v3"
        };

        const token = jwt.sign(payload, privateKey, { algorithm: 'ES256' });
        console.log("Generated JWT Token:", token);
        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw error;
    }
}

// Function to make the API call
async function makeApiCall() {
    try {
        const token = await generateToken();
        console.log(token)
        const apiUrl = "https://sandbox.absintegrations.com/api/v3/tire-protection/registrations";
        const requestBody = {
            product_id: "678fd59c19f1a067658af0db",
            invoiceNumber: "001-20345",
            enrollDate: "2025-01-23T12:08:00.000Z",
            customer: {
                name: " Apple Mahmud",
                email: "iapplee007@gmail.com"
            },
            vehicle: {
                year: 2021,
                make: "Tesla",
                model: "Model 3"
            },
            tires: [
                {
                    make: "BRIDGESTONE",
                    model: "TURANZA ER33",
                    size: "235/45R18",
                    retailPrice: 334.31
                },
                {
                    make: "BRIDGESTONE",
                    model: "TURANZA ER33",
                    size: "235/45R18",
                    retailPrice: 334.31
                },
                {
                    make: "BRIDGESTONE",
                    model: "TURANZA ER33",
                    size: "235/45R18",
                    retailPrice: 334.31
                },
                {
                    make: "BRIDGESTONE",
                    model: "TURANZA ER33",
                    size: "235/45R18",
                    retailPrice: 334.31
                }
            ]
        };

        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("API Response:", response.data);
    } catch (error) {
        console.error("Error during API Call:", error.response ? error.response.data : error.message);
    }
}

// Execute the API call
makeApiCall();






