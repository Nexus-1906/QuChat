from fastapi import FastAPI
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2 as Sampler
from qiskit.transpiler import generate_preset_pass_manager
from qiskit import QuantumCircuit
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

q_service = QiskitRuntimeService(
    token=os.getenv("API_KEY"),
    instance="quchat-key"
)

q_backend = q_service.least_busy(min_num_qubits=32)
pm = generate_preset_pass_manager(backend=q_backend, optimization_level=1)
sampler = Sampler(q_backend)

@app.get("/rng")
async def random_num_generator():
    qc = QuantumCircuit(32, 32)
    qc.h(range(32))
    qc.measure_all()
    isa_circuit = pm.run(qc)

    job = sampler.run([isa_circuit], shots = 1)
    result = job.result()
    counts = result[0].data.meas.get_counts()
    bitstring = max(counts, key=counts.get)

    return bitstring