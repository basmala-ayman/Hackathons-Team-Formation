# 1. Use an official, lightweight Python runtime as a parent image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /code

# 3. Copy just the requirements file first (helps with caching builds)
COPY ./requirements.txt /code/requirements.txt

# 4. Install the lightweight CPU version of PyTorch, then the rest of your packages
RUN pip install --no-cache-dir --extra-index-url https://download.pytorch.org/whl/cpu torch && \
    pip install --no-cache-dir -r /code/requirements.txt

# 5. Copy the rest of your local application files into the container
COPY . .

# 6. Command to run the FastAPI app on port 7860 (Required by Hugging Face)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]