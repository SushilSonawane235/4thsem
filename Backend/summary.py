import sys
import pandas as pd
import json

def generate_summary(file_path):
    try:
        # Check the file extension to determine whether it's CSV or Excel
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.xlsx'):
            df = pd.read_excel(file_path)
        else:
            raise ValueError("Unsupported file format")

        summary = {
            "rows": df.shape[0],
            "columns": df.shape[1],
            "column_info": {}
        }
        
        for col in df.columns:
            col_data = df[col]
            col_summary = {
                "dtype": str(col_data.dtype),
                "missing_values": int(col_data.isnull().sum())
            }
            if pd.api.types.is_numeric_dtype(col_data):
                col_summary.update({
                    "mean": float(col_data.mean()),  # Convert to native Python float
                    "median": float(col_data.median()),  # Convert to native Python float
                    "min": float(col_data.min()),  # Convert to native Python float
                    "max": float(col_data.max())  # Convert to native Python float
                })
            summary["column_info"][col] = col_summary
        
        print(json.dumps(summary))  # Output the JSON result
    except Exception as e:
        error_msg = {"error": str(e)}
        print(json.dumps(error_msg))  # Output error message if any

if __name__ == "__main__":
    file_path = sys.argv[1]
    generate_summary(file_path)
