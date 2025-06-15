cmake_minimum_required(VERSION 3.10)
project(blood_calculator)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set vcpkg toolchain file
set(CMAKE_TOOLCHAIN_FILE "${CMAKE_CURRENT_SOURCE_DIR}/../../vcpkg/scripts/buildsystems/vcpkg.cmake"
    CACHE STRING "Vcpkg toolchain file")

# Find JsonCpp package
find_package(jsoncpp CONFIG REQUIRED)

# Add executable
add_executable(blood_calculator blood_calculator.cpp)

# Link against JsonCpp
target_link_libraries(blood_calculator PRIVATE jsoncpp_lib)