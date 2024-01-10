# Gmail OTP Generator

This project is a simple OTP (One-Time Password) generator and verifier using Gmail. It's built with Node.js and Express.

## Features

- Generate OTP
- Verify OTP

## Endpoints

- `POST /generateOTP`: This endpoint accepts an email address and generates an OTP.
- `POST /verifyOTP`: This endpoint verifies the OTP entered by the user.

## How to Use

1. Clone this repository.
2. Install the dependencies using `npm install`.
3. Start the server using `npm start`.
4. Use a tool like Postman to send a POST request to `localhost:3000/generateOTP` with your email address in the body.
5. Check your email for the OTP.
6. Send a POST request to `localhost:3000/verifyOTP` with your email address and the OTP in the body to verify it.

## Note

The OTP is stored in the session and cleared after verification to prevent reuse.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


