# MobileCare Backend — Spring Boot REST API

## Tech Stack
- Java 17
- Spring Boot 3.2
- Spring Security + JWT
- Spring Data JPA + Hibernate
- MySQL 8
- Lombok
- Maven

## Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8 running locally

## Setup

### 1. Create MySQL database
```sql
CREATE DATABASE mobilecare_db;
```

### 2. Configure credentials
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
app.admin.username=admin
app.admin.password=mobilecare@2025
app.jwt.secret=change_this_to_a_long_random_secret
```

### 3. Run
```bash
cd backend
mvn spring-boot:run
```

Server starts on **http://localhost:8080**

Tables are auto-created by Hibernate on first run. Admin user and sample products are seeded automatically.

---

## API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | Public | Admin login → returns JWT |

**Login body:**
```json
{ "username": "admin", "password": "mobilecare@2025" }
```

---

### Repairs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/repairs` | Public | Submit repair request (multipart) |
| GET | `/api/repairs/track?query=` | Public | Track by ticket ID or phone |
| GET | `/api/repairs` | Admin | List all repairs |
| GET | `/api/repairs/{id}` | Admin | Get repair by ID |
| PUT | `/api/repairs/{id}` | Admin | Update status / notes |
| DELETE | `/api/repairs/{id}` | Admin | Delete repair |

**Submit repair (multipart/form-data):**
- Part `data` (JSON): `{ customerName, phone, deviceBrand, deviceModel, issueCategory, description }`
- Part `images` (files, optional): up to 5 images

---

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products?category=&search=` | Public | List active products |
| GET | `/api/products/{id}` | Public | Get product |
| GET | `/api/products/admin/all` | Admin | All products incl. inactive |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/{id}` | Admin | Update product |
| DELETE | `/api/products/{id}` | Admin | Soft-delete product |

---

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | Public | Place order |
| GET | `/api/orders/my?phone=` | Public | Customer's orders |
| GET | `/api/orders` | Admin | All orders |
| GET | `/api/orders/{id}` | Admin | Order detail |
| PUT | `/api/orders/{id}/status` | Admin | Update order status |

---

### Contact
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | Public | Submit contact message |
| GET | `/api/contact` | Admin | All messages |
| PUT | `/api/contact/{id}/read` | Admin | Mark as read |

---

### Admin Dashboard
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/dashboard` | Admin | Stats: repairs, orders, revenue |

---

## Using JWT in requests
After login, include the token in every admin request:
```
Authorization: Bearer <token>
```

## Uploaded images
Repair images are stored in `backend/uploads/repairs/` and served at:
```
http://localhost:8080/uploads/repairs/<filename>
```
