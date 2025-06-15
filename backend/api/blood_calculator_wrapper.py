import subprocess
import json
import os
from pathlib import Path

class BloodCalculator:
    def __init__(self):
        # Get the absolute path to the blood_calculator executable
        cpp_dir = Path(__file__).parent.parent / 'cpp'
        self.executable_path = cpp_dir / 'build' / 'blood_calculator'
        
        # Ensure the executable exists
        if not self.executable_path.exists():
            raise FileNotFoundError(f"Blood calculator executable not found at {self.executable_path}")

    def _run_calculator(self, input_data):
        try:
            # Convert input data to JSON string
            input_json = json.dumps(input_data)
            
            # Run the C++ executable with the JSON input
            process = subprocess.Popen(
                [str(self.executable_path)],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Send input and get output
            stdout, stderr = process.communicate(input=input_json)
            
            if process.returncode != 0:
                raise RuntimeError(f"Blood calculator error: {stderr}")
            
            # Parse and return the JSON response
            return json.loads(stdout)
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON response from blood calculator: {e}")
        except Exception as e:
            raise RuntimeError(f"Error running blood calculator: {e}")

    def check_compatibility(self, donor_blood_group, recipient_blood_group):
        """
        Check if two blood groups are compatible.
        
        Args:
            donor_blood_group (str): Donor's blood group (e.g., "A+", "B-")
            recipient_blood_group (str): Recipient's blood group
            
        Returns:
            dict: Compatibility information including:
                - compatible (bool): Whether the blood groups are compatible
                - description (str): Description of compatibility rules
                - isUniversalDonor (bool): Whether donor is universal
                - isUniversalRecipient (bool): Whether recipient is universal
        """
        input_data = {
            "operation": "check_compatibility",
            "donor": donor_blood_group,
            "recipient": recipient_blood_group
        }
        return self._run_calculator(input_data)

    def search_donations(self, donations, blood_group=None, location=None, 
                        date_range=None, available_only=True):
        """
        Search for blood donations matching specific criteria.
        
        Args:
            donations (list): List of donation dictionaries
            blood_group (str, optional): Filter by blood group
            location (str, optional): Filter by location
            date_range (str, optional): Filter by date range
            available_only (bool, optional): Only show available donations
            
        Returns:
            dict: Matching donations with their details
        """
        input_data = {
            "operation": "search_donations",
            "donations": donations,
            "blood_group": blood_group,
            "location": location,
            "date_range": date_range,
            "available_only": available_only
        }
        return self._run_calculator(input_data)

    def calculate_availability(self, donations):
        """
        Calculate blood availability statistics.
        
        Args:
            donations (list): List of donation dictionaries
            
        Returns:
            dict: Availability statistics for each blood group
        """
        input_data = {
            "operation": "calculate_availability",
            "donations": donations
        }
        return self._run_calculator(input_data) 