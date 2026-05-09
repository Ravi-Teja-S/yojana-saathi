# Use Python 3.11 (Highly recommended for LiveKit stability)
FROM python:3.11-slim

# Install system dependencies required for audio processing (Silero VAD, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Set up the working directory
WORKDIR /app

# Copy your project files
COPY pyproject.toml uv.lock ./
COPY main.py ./

# Install dependencies using uv
RUN uv sync --frozen --no-dev

# Run the agent in production mode
CMD ["uv", "run", "main.py", "start"]