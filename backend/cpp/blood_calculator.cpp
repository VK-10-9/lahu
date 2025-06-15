#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <fstream>
#include <sstream>
#include <json/json.h>
#include <algorithm>
#include <ctime>

using namespace std;

// Blood group compatibility matrix with detailed information
struct CompatibilityInfo {
    vector<string> compatibleGroups;
    string description;
    bool isUniversalDonor;
    bool isUniversalRecipient;
};

const map<string, CompatibilityInfo> COMPATIBILITY_MATRIX = {
    {"A+", {{"A+", "A-", "O+", "O-"}, "Can receive from A+, A-, O+, O-", false, false}},
    {"A-", {{"A-", "O-"}, "Can receive from A- and O-", false, false}},
    {"B+", {{"B+", "B-", "O+", "O-"}, "Can receive from B+, B-, O+, O-", false, false}},
    {"B-", {{"B-", "O-"}, "Can receive from B- and O-", false, false}},
    {"AB+", {{"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"}, "Can receive from all blood types", false, true}},
    {"AB-", {{"A-", "B-", "AB-", "O-"}, "Can receive from A-, B-, AB-, O-", false, false}},
    {"O+", {{"O+", "O-"}, "Can receive from O+ and O-", false, false}},
    {"O-", {{"O-"}, "Can receive from O- only", true, false}}
};

// Structure to represent a blood donation
struct BloodDonation {
    string bloodGroup;
    int units;
    string donorName;
    string date;
    string location;
    bool isAvailable;
};

// Function to check blood compatibility with detailed information
Json::Value checkCompatibility(const string& donor, const string& recipient) {
    Json::Value result;
    
    if (COMPATIBILITY_MATRIX.find(donor) == COMPATIBILITY_MATRIX.end() ||
        COMPATIBILITY_MATRIX.find(recipient) == COMPATIBILITY_MATRIX.end()) {
        result["error"] = "Invalid blood group";
        return result;
    }
    
    const CompatibilityInfo& recipientInfo = COMPATIBILITY_MATRIX.at(recipient);
    bool isCompatible = find(recipientInfo.compatibleGroups.begin(),
                           recipientInfo.compatibleGroups.end(),
                           donor) != recipientInfo.compatibleGroups.end();
    
    result["compatible"] = isCompatible;
    result["description"] = recipientInfo.description;
    result["isUniversalDonor"] = COMPATIBILITY_MATRIX.at(donor).isUniversalDonor;
    result["isUniversalRecipient"] = recipientInfo.isUniversalRecipient;
    
    return result;
}

// Function to search blood donations
Json::Value searchDonations(const vector<BloodDonation>& donations,
                          const string& bloodGroup = "",
                          const string& location = "",
                          const string& dateRange = "",
                          bool availableOnly = true) {
    Json::Value result;
    vector<BloodDonation> matches;
    
    for (const auto& donation : donations) {
        bool matches = true;
        
        if (!bloodGroup.empty() && donation.bloodGroup != bloodGroup) {
            matches = false;
        }
        
        if (!location.empty() && donation.location != location) {
            matches = false;
        }
        
        if (availableOnly && !donation.isAvailable) {
            matches = false;
        }
        
        if (matches) {
            Json::Value donationJson;
            donationJson["bloodGroup"] = donation.bloodGroup;
            donationJson["units"] = donation.units;
            donationJson["donorName"] = donation.donorName;
            donationJson["date"] = donation.date;
            donationJson["location"] = donation.location;
            donationJson["isAvailable"] = donation.isAvailable;
            result["donations"].append(donationJson);
        }
    }
    
    return result;
}

// Function to calculate available blood units with detailed statistics
Json::Value calculateAvailability(const vector<BloodDonation>& donations) {
    Json::Value result;
    map<string, int> availability;
    map<string, int> totalDonations;
    
    for (const auto& donation : donations) {
        if (donation.isAvailable) {
            availability[donation.bloodGroup] += donation.units;
        }
        totalDonations[donation.bloodGroup] += donation.units;
    }
    
    for (const auto& pair : availability) {
        Json::Value bloodGroupInfo;
        bloodGroupInfo["available"] = pair.second;
        bloodGroupInfo["total"] = totalDonations[pair.first];
        bloodGroupInfo["utilization"] = (float)pair.second / totalDonations[pair.first];
        result[pair.first] = bloodGroupInfo;
    }
    
    return result;
}

int main() {
    try {
        // Read JSON input from stdin
        string input;
        getline(cin, input);
        
        Json::Value root;
        Json::Reader reader;
        bool parsingSuccessful = reader.parse(input, root);
        
        if (!parsingSuccessful) {
            throw runtime_error("Error parsing JSON input");
        }
        
        // Process the input
        string operation = root["operation"].asString();
        Json::Value result;
        
        if (operation == "check_compatibility") {
            string donor = root["donor"].asString();
            string recipient = root["recipient"].asString();
            result = checkCompatibility(donor, recipient);
        }
        else if (operation == "search_donations") {
            vector<BloodDonation> donations;
            for (const auto& donation : root["donations"]) {
                BloodDonation d;
                d.bloodGroup = donation["blood_group"].asString();
                d.units = donation["units"].asInt();
                d.donorName = donation["donor_name"].asString();
                d.date = donation["date"].asString();
                d.location = donation["location"].asString();
                d.isAvailable = donation["is_available"].asBool();
                donations.push_back(d);
            }
            
            string bloodGroup = root.get("blood_group", "").asString();
            string location = root.get("location", "").asString();
            string dateRange = root.get("date_range", "").asString();
            bool availableOnly = root.get("available_only", true).asBool();
            
            result = searchDonations(donations, bloodGroup, location, dateRange, availableOnly);
        }
        else if (operation == "calculate_availability") {
            vector<BloodDonation> donations;
            for (const auto& donation : root["donations"]) {
                BloodDonation d;
                d.bloodGroup = donation["blood_group"].asString();
                d.units = donation["units"].asInt();
                d.isAvailable = donation["is_available"].asBool();
                donations.push_back(d);
            }
            
            result = calculateAvailability(donations);
        }
        else {
            throw runtime_error("Invalid operation");
        }
        
        // Output JSON result
        Json::FastWriter writer;
        cout << writer.write(result);
        
    } catch (const exception& e) {
        Json::Value error;
        error["error"] = e.what();
        Json::FastWriter writer;
        cout << writer.write(error);
        return 1;
    }
    
    return 0;
} 