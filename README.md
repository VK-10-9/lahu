# Blood Bank Management System

A comprehensive blood bank management system with C++ core logic for high-performance blood compatibility checking and donation management.

## Features

- Blood compatibility checking with detailed rules
- Donation management and tracking
- Blood request handling
- Real-time availability calculation
- High-performance C++ core engine
- RESTful API endpoints
- Admin dashboard

## Prerequisites

### System Requirements
- Windows 10/11 or Linux
- Python 3.8 or higher
- Visual Studio 2019 or later (for Windows)
- CMake 3.10 or higher
- Git

### Required Software
1. **Python Dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

2. **C++ Dependencies**
   - Visual Studio 2019 or later with C++ development tools
   - vcpkg for package management
   - JsonCpp library

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd blood-bank-system
   ```

2. **Setup Python Environment**
   ```bash
   cd backend
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On Linux/Mac
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Setup vcpkg and C++ Dependencies**
   ```bash
   # Navigate to vcpkg directory
   cd ../vcpkg
   
   # Bootstrap vcpkg
   # On Windows
   .\bootstrap-vcpkg.bat
   # On Linux/Mac
   ./bootstrap-vcpkg.sh
   
   # Install JsonCpp
   .\vcpkg install jsoncpp:x64-windows  # For Windows
   ./vcpkg install jsoncpp:x64-linux    # For Linux
   ```

4. **Build C++ Core**
   ```bash
   cd ../backend/cpp
   # On Windows
   .\build.bat
   # On Linux/Mac
   ./build.sh
   ```

5. **Setup Database**
   ```bash
   cd ..
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

## Running the Application

1. **Start the Development Server**
   ```bash
   python manage.py runserver
   ```

2. **Access the Application**
   - Admin Interface: http://localhost:8000/admin/
   - API Base URL: http://localhost:8000/api/

## API Endpoints

### 1. Check Blood Compatibility
```http
POST /api/check-compatibility/
Content-Type: application/json

{
    "donor": "A+",
    "recipient": "B+"
}
```

### 2. Search Donations
```http
POST /api/search-donations/
Content-Type: application/json

{
    "blood_group": "A+",
    "location": "New York",
    "date_range": "2024-01-01",
    "available_only": true
}
```

### 3. Calculate Availability
```http
POST /api/calculate-availability/
Content-Type: application/json
```

## C++ Core Features

The C++ core provides high-performance operations for:

1. **Blood Compatibility Checking**
   - Validates blood group compatibility
   - Provides detailed compatibility information
   - Identifies universal donors and recipients

2. **Donation Search**
   - Efficient filtering of blood donations
   - Multiple search criteria support
   - Real-time availability checking

3. **Availability Calculation**
   - Tracks available blood units
   - Calculates utilization rates
   - Generates detailed statistics

## Project Structure

```
blood-bank-system/
├── backend/
│   ├── api/
│   │   └── blood_calculator_wrapper.py
│   ├── bloodbank/
│   │   ├── models.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── cpp/
│   │   ├── blood_calculator.cpp
│   │   ├── CMakeLists.txt
│   │   └── build.bat/build.sh
│   └── requirements.txt
├── vcpkg/
└── README.md
```

## Troubleshooting

1. **C++ Build Issues**
   - Ensure Visual Studio is properly installed with C++ tools
   - Verify CMake installation
   - Check vcpkg integration

2. **Python/Django Issues**
   - Verify Python version (3.8+)
   - Check all requirements are installed
   - Ensure database migrations are applied

3. **Runtime Issues**
   - Check if the C++ executable is built and in the correct location
   - Verify database connection
   - Check server logs for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team. 