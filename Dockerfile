FROM python:3.13-slim

WORKDIR /app

# Install uv
RUN pip install uv

# Copy dependencies first for better caching
COPY pyproject.toml uv.lock ./

# Install dependencies using uv
RUN uv pip install --system -r pyproject.toml

# Copy the rest of the application
COPY . .

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
