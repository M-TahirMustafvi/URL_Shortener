# URL Shortener Service

## Overview
This is a simple URL Shortener Service built using **Node.js, Express, and MySQL**. It allows users to create short URLs, retrieve original URLs, update, delete, and view statistics.

## Features
- Shorten a URL
- Retrieve original URL
- Update a shortened URL
- Delete a shortened URL
- Get URL usage statistics

## Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM for MySQL
- **UUID** - Unique ID generation

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MySQL

### Setup
```sh
# Clone the repository
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

# Install dependencies
npm install

# Create a .env file and set the following variables
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=url_shortener

# Run the server
node index.js
```

## API Endpoints

### 1. Create Short URL
**POST** `/shorten`
#### Request Body:
```json
{
    "url": "https://example.com"
}
```
#### Response:
```json
{
    "id": 1,
    "shortCode": "abc123",
    "url": "https://example.com",
    "createdAt": "2025-03-17T12:00:00Z"
}
```

### 2. Retrieve Original URL
**GET** `/shorten/:shortCode`
#### Response:
```json
{
    "id": 1,
    "shortCode": "abc123",
    "url": "https://example.com",
    "createdAt": "2025-03-17T12:00:00Z"
}
```

### 3. Update Long URL
**PUT** `/shorten/:shortCode`
#### Request Body:
```json
{
    "url": "abc123"
}
```
#### Response:
```json
{
    "id": 1,
    "shortCode": "abc123",
    "url": "https://new-example.com",
    "updatedAt": "2025-03-17T12:30:00Z"
}
```

### 4. Delete Short URL
**DELETE** `/shorten/:shortCode`
#### Response:
```Status Code:204```

### 5. Get URL Statistics
**GET** `/shorten/stats/:shortCode`
#### Response:
```json
{
    "id": 1,
    "shortCode": "abc123",
    "url": "https://example.com",
    "accessCount": 5,
    "createdAt": "2025-03-17T12:00:00Z",
    "updatedAt": "2025-03-17T12:50:00Z"
}
```

## License
This project is open-source under the MIT License.
