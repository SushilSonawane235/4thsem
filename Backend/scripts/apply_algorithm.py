import sys
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import AgglomerativeClustering, DBSCAN, Birch
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import estimate_bandwidth

# Function to load the dataset
def load_data(file_path):
    if file_path.endswith('.csv'):
        data = pd.read_csv(file_path)
    elif file_path.endswith('.xlsx'):
        data = pd.read_excel(file_path)
    else:
        raise ValueError("Unsupported file format. Please provide a CSV or Excel file.")

    data = data.dropna(subset=[data.columns[-1]])

    numeric_cols = data.select_dtypes(include=['number']).columns
    data[numeric_cols] = data[numeric_cols].fillna(data[numeric_cols].mean())

    categorical_cols = data.select_dtypes(exclude=['number']).columns
    for col in categorical_cols:
        data[col] = data[col].fillna(data[col].mode()[0])

    return data

# Function to preprocess data
def preprocess_data(data):
    data = pd.get_dummies(data, drop_first=True)
    return data

# General function for supervised learning algorithms
def supervised_learning(data, model):
    X = data.iloc[:, :-1]
    y = data.iloc[:, -1]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    model.fit(X_train, y_train)
    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)
    conf_matrix = confusion_matrix(y_test, predictions)
    class_report = classification_report(y_test, predictions, zero_division=1)

    result = f'Accuracy: {accuracy * 100:.2f}%\n'
    result += f'Confusion Matrix:\n{conf_matrix}\n\n'
    result += f'Classification Report:\n{class_report}\n'

    return result

# General function for clustering algorithms
def clustering(data, model):
    X = data.iloc[:, :-1]  # Exclude the target column if it exists
    
    # Check if all features are numeric
    if not all(pd.api.types.is_numeric_dtype(X[col]) for col in X.columns):
        raise ValueError("All features must be numeric for clustering.")

    # Scaling the data
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    try:
        labels = model.fit_predict(X_scaled)
        data['Cluster'] = labels
        result = data.groupby('Cluster').size().to_string()
        return f'Cluster distribution:\n{result}\n'
    except Exception as e:
        return f"Error during model fitting: {e}"


# Main function to run the script
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python apply_algorithm.py <file_path> <algorithm>")
        sys.exit(1)

    file_path = sys.argv[1]
    algorithm = sys.argv[2].lower()

    try:
        data = load_data(file_path)
        data = preprocess_data(data)
    except ValueError as e:
        print(e)
        sys.exit(1)

    result = None

    if algorithm == 'decision_tree':
        result = supervised_learning(data, DecisionTreeClassifier())
    elif algorithm == 'logistic_regression':
        result = supervised_learning(data, LogisticRegression())
    elif algorithm == 'naive_bayes':
        result = supervised_learning(data, GaussianNB())
    elif algorithm == 'knn':
        result = supervised_learning(data, KNeighborsClassifier())
    elif algorithm == 'random_forest':
        result = supervised_learning(data, RandomForestClassifier())
    elif algorithm == 'agglomerative_clustering':
        result = clustering(data, AgglomerativeClustering(n_clusters=3))
    elif algorithm == 'dbscan':
        result = clustering(data, DBSCAN())
    elif algorithm == 'birch':
        result = clustering(data, Birch(n_clusters=3))
    else:
        print("Unknown algorithm:", algorithm)
        sys.exit(1)

    print(result)
