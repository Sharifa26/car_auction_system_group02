<h1 align="center">Car Auction System API</h1>
<p align="center"> <a href="#installation">Installation</a> • <a href="#routes">API Endpoints</a> • <a href="#testing">Testing</a> </p>

A Node.js and Express-based virtual car auction platform that allows users to register, manage, and bid on car auctions. It features secure authentication, car creation and management, dealer registration, bidding, and a comprehensive testing suite.

<h2 id="installation">⚙️ Installation</h2>

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Sharifa26/car_auction_system_group02.git
cd car_auction_system_group02

``` 
### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment Setup
Create a `.env` file in the root directory:

```ini
PORT=5000

# JWT
JWT_SECRET=YOUR_JWT_SECRET

# MongoDB
MONGO_URI=YOUR_MONGO_URI

```

### 4️⃣ Run the server
```bash
node server.js

npm run dev
```

---

<h2 id="routes">🚀 API Endpoints</h2>

### 🔑 Authentication       
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/admin/register` | Register a new user |
| `POST` | `/admin/login` | Login user and get JWT |

<details>
<summary>📌 Example: Register User</summary>

**Request**
```json     
curl --location --request POST 'http://localhost:5000/api/v1/admin/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Sharifa",
    "email": "sharifasheriff26@gmail.com",
    "password": "123456"
}
```
</details>

<details>
<summary>📌 Example: Login User</summary>

**Request**
```json
curl --location --request POST 'http://localhost:5000/api/v1/admin/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "sharifasheriff26@gmail.com",
    "password": "123456"
}
```
</details>

### 📝 Cars
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/car` | Create a new car |
| `GET` | `/api/v1/car` | List all cars |
| `GET` | `/api/v1/car/:id` | Get car details |
| `PATCH` | `/api/v1/car/:id` | Update car details |
| `DELETE` | `/api/v1/car/:id` | Delete car |

<details>
<summary>📌 Example: Create Car</summary>

**Request**
```json
curl --location --request POST 'http://localhost:5000/api/v1/car' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1' \
--data-raw '{
    "make": "Toyota",
    "model": "Camry",
    "year": 2023
}
```
</details>

<details>
<summary>📌 Example: List Cars</summary>

**Request**
```json
curl --location --request GET 'http://localhost:5000/api/v1/car' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```
</details>

<details>
<summary>📌 Example: Get Car</summary>

**Request**
```json
curl --location --request GET 'http://localhost:5000/api/v1/car/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```
</details>

<details>
<summary>📌 Example: Update Car</summary>

**Request**
```json
curl --location --request PATCH 'http://localhost:5000/api/v1/car/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1' \
--data-raw '{
    "make": "Toyota",
    "model": "Camry",
    "year": 2023
}
```
</details>

<details>
<summary>📌 Example: Delete Car</summary>

**Request**
```json
curl --location --request DELETE 'http://localhost:5000/api/v1/car/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```

</details>

### 👥 Dealers
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/dealers` | Create a new dealer |
| `GET` | `/api/v1/dealers` | List all dealers |
| `GET` | `/api/v1/dealers/:id` | Get dealer details |
| `PATCH` | `/api/v1/dealers/:id` | Update dealer details |
| `DELETE` | `/api/v1/dealers/:id` | Delete dealer |

<details>
<summary>📌 Example: Create Dealer</summary>

**Request**
```json
curl --location --request POST 'http://localhost:5000/api/v1/dealers' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1' \
--data-raw '{
    "name": "John Dealer",
    "email": "dealer@example.com",
    "phone": "1234567890"
}
```
</details>

<details>
<summary>📌 Example: List Dealers</summary>

**Request**
```json
curl --location --request GET 'http://localhost:5000/api/v1/dealers' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```
</details>

<details>
<summary>📌 Example: Get Dealer</summary>

**Request**
```json
curl --location --request GET 'http://localhost:5000/api/v1/dealers/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```
</details>

<details>
<summary>📌 Example: Update Dealer</summary>

**Request**
```json
curl --location --request PATCH 'http://localhost:5000/api/v1/dealers/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1' \
--data-raw '{
    "name": "John Dealer",
    "email": "dealer@example.com",
    "phone": "1234567890"
}
```
</details>

<details>
<summary>📌 Example: Delete Dealer</summary>

**Request**
```json
curl --location --request DELETE 'http://localhost:5000/api/v1/dealers/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```
</details>

### 🎫 Auctions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auction/createAuction` | Create a new auction |
| `PATCH` | `/api/v1/auction/status/:auctionId` | Update auction status |
| `GET` | `/api/v1/auction/:id/winner` | Get the winner of an auction |

<details>
<summary>📌 Example: Create Auction</summary>

**Request**
```json
curl --location --request POST 'http://localhost:5000/api/v1/auction/createAuction' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1' \
--data-raw '{
    "carInfo": 1,
    "basePrice": 50000
}
```
</details>

<details>
<summary>📌 Example: Update Auction Status</summary>

**Request**
```json
curl --location --request PATCH 'http://localhost:5000/api/v1/auction/status/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1' \
--data-raw '{
    "status": "active"
}
```
</details>

<details>
<summary>📌 Example: Get Auction Winner</summary>

**Request**
```json
curl --location --request GET 'http://localhost:5000/api/v1/auction/1/winner' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```
</details>

### 👫 Bids
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/bid/:auctionId/placeBid` | Place a bid on an auction |
| `GET` | `/api/v1/bid/:auctionId/bids` | List all bids on an auction |

<details>
<summary>📌 Example: Place Bid</summary>

**Request**
```json
curl --location --request POST 'http://localhost:5000/api/v1/bid/1/placeBid' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1' \
--data-raw '{
    "dealerId": 1
}
```
</details>

<details>
<summary>📌 Example: List Bids</summary>

**Request**
```json
curl --location --request GET 'http://localhost:5000/api/v1/bid/1/bids' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.1-4-1-0-0-0-0-0-0-0-1'
```
</details>

---

<h2 id="testing">🧪 Running Tests</h2>

### Environment Setup for Testing
Create a `.env.test` file in the root directory:
```ini
PORT=5001

# JWT
JWT_SECRET=YOUR_JWT_SECRET_FOR_TESTING

# MongoDB
MONGO_URI=YOUR_MONGO_URI

```

### Run all tests
```bash
npm run test
```

### Test Coverage ✅
- ✔️ Register user (success & fail)  
- ✔️ Login (success & invalid credentials)  
- ✔️ Update & fetch preferences  
- ✔️ Unauthorized access handling  
- ✔️ Fetch news by preferences  
- ✔️ Mark article as read & fetch read list  

---

<h2 id="contributing">👩‍💻 Contributing</h2>

**Sharifa** ✨
📧 Contact: [sharifasheriff26@gmail.com](mailto:sharifasheriff26@gmail.com)

**Varun** ✨
📧 Contact: [varun87008685@gmail.com](mailto:varun87008685@gmail.com)

**Mriganshu** ✨
📧 Contact: [mriganshumb@gmail.com](mailto:mriganshumb@gmail.com)   


---


