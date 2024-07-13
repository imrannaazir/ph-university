# University Management 

 
 

## Technology Used
- **Frontend:** Next.js, Ant Design CSS, Redux
- **Backend:** Express.js, Mongoose
- **Database:** Mongodb
- **Image Hosting:** Cloudinary

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher) 

### Installation and run in dev mood (Frontend)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imrannaazir/ph-university
   ```

2. **Go to frontend dir:**

   ```bash
   cd client
   npm i
   ```

3. **Create `.env` file and paste :**

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dm6yrvvxj 
```

4. **Run this command to run in dev mode:**
   ```bash
   npm run dev
   ```

### Run in dev mood (Backend)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imrannaazir/ph-university
   ```

2. **Go to frontend dir:**

   ```bash
   cd server
   npm i
   ```

3. **Create `.env` file and paste :**

```bash
NODE_ENV="production"
PORT=5000
PAGE=1
LIMIT=10
DATABASE_URL= 
SALT_ROUND=12
JWT_SECRET=83c0b00c36a4088f58cd268683f7fbad9d43814ecc740a19c7989e414641fa67dff48bd5214da6cd338e2f738cd42d965bdb3c6946381717e29ae7e3964fce2e
JWT_EXPIRES_IN='1h'
```

4. **Run this command to run in dev mode:**
   ```bash
   npm run dev
   ```
