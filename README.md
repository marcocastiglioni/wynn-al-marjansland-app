
# Wynn Al Marjan App

A Next.js application for Wynn Al Marjan Island.


## Authors

- [@marcocastiglioni](https://github.com/marcocastiglioni/)


## Tech Stack

**Client:** Next.js v15, TailwindCSS v4

**Server:** Node v18


## Step-by-Step Instructions to Installation

#### 1. Open your Terminal
#### 2. Install NVM using cURL or wget:
- Using cURL:
```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
- Using wget:
```bash
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

#### 3. Install Node
```bash
  nvm install 18
  nvm use 18
  node --version
```
This should print the installed Node.js version, for example, v18.x.x.

#### 4. Clone the repository:
```bash
  git clone https://github.com/marcocastiglioni/wynn-al-marjansland-app.git
```

#### 5. Change to the project directory:

```bash
  cd wynn-al-marjansland-app
```

#### 6. Install dependencies:

```bash
  npm install
```

#### 7. Create an empty .env.local file:

```bash
  touch .env.local
  code .
```
This will open the Editor, for example Visual Studio Code

Then, edit the .env.local file (using your preferred editor) to set the necessary variables:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
API_BASE_URL=http://demo1159445.mockable.io
```

#### 8. Start the development server:

```bash
  npm run dev
```

#### 9. To build and run the application in production mode locally:

```bash
  npm run build
```

#### 10. Start the production server:

```bash
  npm run start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_BASE_URL`

`NEXT_PUBLIC_API_BASE_URL`


## API Reference

Get all navigation items for main Header and Footer components

```http
  GET /api/navigation
```

Send an OTP verification code to the visitor's preferred method—email or phone. It returns a successful response.

```http
  POST /api/send-otp/
```

Verify the OTP code entered by the user to the app. It returns a successful response.

```http
  POST /api/verify-otp/
```





## Demo

https://wynn-al-marjansland-app.vercel.app/

