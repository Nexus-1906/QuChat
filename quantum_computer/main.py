from fastapi import FastAPI, Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2 as Sampler
from qiskit_ibm_runtime.fake_provider import FakeMarrakesh
from qiskit_aer import AerSimulator
from qiskit.transpiler import generate_preset_pass_manager
from qiskit import QuantumCircuit
from dotenv import load_dotenv
import os
from typing import Literal, Annotated

load_dotenv()

app = FastAPI()

q_service = QiskitRuntimeService(
    token=os.getenv("API_KEY"),
    instance="quchat-key"
)

security = HTTPBearer()

@app.middleware("http")
async def authorize_call(
    request: Request,
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    call_next
):
    if request.url.path == "/rng":
        return await call_next(request)
    
    if credentials.scheme != "Bearer":
        return { "error": "Invalid auth token" }
    
    import jwt
    try:
        payload = jwt.decode(credentials.credentials, os.getenv("ACCESS_TOKEN_SECRET"), algorithms=["HS256"])
    except:
        return { "error": "Invalid auth token" }
        
    request.state.user = payload.userId
    
    return await call_next(request)

@app.get("/rng/{typeOfMachine}")
async def random_num_generator(
    typeOfMachine: Literal["sim", "hw"],
    bit_length: str = "32",
    no_of_shots: str = "1"
) -> list[str | None]:
    
    bit_length = int(bit_length)
    no_of_shots = int(no_of_shots)

    if (bit_length < 1 or bit_length > 32 or no_of_shots < 1):
        return []
    
    if (typeOfMachine == "sim"):
        q_backend = AerSimulator.from_backend(FakeMarrakesh())
    else:
        q_backend = q_service.least_busy(simulator=False, min_num_qubits=32)
    
    qc = QuantumCircuit(bit_length)
    qc.h(range(bit_length))
    qc.measure_all()
    
    pm = generate_preset_pass_manager(backend=q_backend, optimization_level=1)
    isa_circuit = pm.run(qc)

    if (typeOfMachine == 'sim'):
        from qiskit_aer.primitives import SamplerV2 as AerSampler
        sampler = AerSampler()
        job = sampler.run([isa_circuit], shots=no_of_shots)
    else:
        sampler = Sampler(q_backend)
        job = sampler.run([isa_circuit], shots = no_of_shots)
    
    result = job.result()
    counts = result[0].data.meas.get_counts()
    
    return list(counts.keys())

