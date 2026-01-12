from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Code Executor Service")


class HealthResponse(BaseModel):
    status: str
    service: str


class ExecuteRequest(BaseModel):
    language: str
    code: str
    test_cases: list[dict] | None = None


class ExecuteResponse(BaseModel):
    success: bool
    output: str | None = None
    error: str | None = None


@app.get("/health", response_model=HealthResponse)
async def health():
    return HealthResponse(status="ok", service="code-executor")


@app.post("/execute", response_model=ExecuteResponse)
async def execute(request: ExecuteRequest):
    # Placeholder - actual implementation in Phase 0.5
    return ExecuteResponse(
        success=True,
        output=f"Code execution not yet implemented for {request.language}"
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
