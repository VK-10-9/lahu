import json
import subprocess
import os
from pathlib import Path

def run_blood_calculator(input_data):
    """
    Run the blood calculator C++ program with the given input data.
    
    Args:
        input_data (dict): The input data to pass to the C++ program
        
    Returns:
        dict: The result from the C++ program
    """
    # Get the path to the C++ executable
    cpp_dir = Path(__file__).parent.parent / 'cpp'
    executable = cpp_dir / 'build' / 'blood_calculator'
    
    if not executable.exists():
        raise FileNotFoundError(f"Blood calculator executable not found at {executable}")
    
    # Convert input data to JSON string
    input_json = json.dumps(input_data)
    
    try:
        # Run the C++ program
        result = subprocess.run(
            [str(executable)],
            input=input_json.encode(),
            capture_output=True,
            text=True,
            check=True
        )
        
        # Parse the output
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Blood calculator failed: {e.stderr}")
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Failed to parse blood calculator output: {e}")

def check_blood_compatibility(donor_blood_group, recipient_blood_group):
    """
    Check if a donor's blood is compatible with a recipient's blood.
    
    Args:
        donor_blood_group (str): The donor's blood group
        recipient_blood_group (str): The recipient's blood group
        
    Returns:
        bool: True if compatible, False otherwise
    """
    input_data = {
        "operation": "check_compatibility",
        "donor": donor_blood_group,
        "recipient": recipient_blood_group
    }
    
    result = run_blood_calculator(input_data)
    return result["compatible"]

def calculate_blood_availability(donations):
    """
    Calculate the available blood units for each blood group.
    
    Args:
        donations (list): List of donation dictionaries with blood_group and units
        
    Returns:
        dict: Available blood units for each blood group
    """
    input_data = {
        "operation": "calculate_availability",
        "donations": donations
    }
    
    return run_blood_calculator(input_data) 