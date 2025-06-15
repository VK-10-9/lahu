@echo off

:: Create build directory if it doesn't exist
if not exist build mkdir build

:: Navigate to build directory
cd build

:: Run CMake
cmake ..

:: Build the project
cmake --build . 