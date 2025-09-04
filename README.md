## 📦 Virtual Environment Setup

To keep dependencies organized and avoid conflicts, we use a Python virtual environment.  
Follow these steps after cloning the project:

### Create and Activate the Virtual Environment
```
# Create a virtual environment
python3 -m venv venv
```

### Activate the virtual environment
```
# On macOS/Linux:
source venv/bin/activate
```
```
# On Windows:
venv\Scripts\activate
```

### Install Required Packages
```
pip install -r requirements.txt
```

### If you want to Update env
```
pip freeze > requirements.txt
```
