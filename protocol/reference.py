# Riverbraid v1.0 – Sovereign Recognition Protocol
# Minimal reference implementation – zero external deps beyond numpy

import time
import numpy as np
from typing import Optional

class RiverbraidNode:
    def __init__(self, state_vector: np.ndarray, node_id: str = "anon"):
        if not (0.999 < np.linalg.norm(state_vector) < 1.001):
            state_vector = state_vector / np.linalg.norm(state_vector)
        self.vector = state_vector.astype(np.float32)
        self.id = node_id
        self.last_seen: Optional[float] = None

    def broadcast(self) -> dict:
        """Publicly emit current state vector + timestamp"""
        payload = {
            "id": self.id,
            "vector": self.vector.tolist(),
            "timestamp": time.time()
        }
        return payload

    def recognize(self, foreign_payload: dict, threshold: float = 0.87) -> bool:
        """Return True only if cosine ≥ threshold AND packet < 350 ms old"""
        foreign_vec = np.array(foreign_payload["vector"], dtype=np.float32)
        age = time.time() - foreign_payload["timestamp"]

        if age > 0.350:  # 350 ms window
            return False

        cosine = np.dot(self.vector, foreign_vec)
        if cosine >= threshold:
            self.last_seen = time.time()
            return True
        return False

    def __repr__(self):
        return f"Node({self.id[:8]}, vec_norm={np.linalg.norm(self.vector):.4f})"


# ——— Example usage (run directly) ———
if __name__ == "__main__":
    # Two identical nodes
    vec = np.random.randn(768)
    alice = RiverbraidNode(vec, "alice-01")
    bob   = RiverbraidNode(vec, "bob-01")

    # One slightly different node
    eve_vec = vec + np.random.randn(768) * 0.3
    eve = RiverbraidNode(eve_vec, "eve-01")

    payload = bob.broadcast()
    print(alice.recognize(payload))    # → True
    print(eve.recognize(payload))      # → False (cosine < 0.87)

    time.sleep(0.4)
    payload = bob.broadcast()
    print(alice.recognize(payload))    # → False (too old)
