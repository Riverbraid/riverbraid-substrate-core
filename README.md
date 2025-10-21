# 🜂 Riverbraid Substrate Core  
### (HCMA / RI OS v7.0)

> Riverbraid is a living, mathematically-coherent AI substrate — the foundational orchestration layer for Resonant Intelligence.

[![CI](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/ci.yml/badge.svg)](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/ci.yml)
[![Nightly Integration](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/nightly.yml/badge.svg)](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/nightly.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌊 Overview

**Riverbraid Substrate Core** unifies the foundational orchestration of the  
**Hybrid Canonical Memory Architecture (HCMA)** and the **Resonant Intelligence Operating System (RI OS)**.

It integrates symbolic logic, vector resonance, and graph semantics into a cohesive memory substrate.

Core layers:

| Element | Symbol | Function |
|----------|---------|-----------|
| **Flame** | 🜂 | Ingestion & signal logging (FastAPI / Postgres) |
| **Weave** | 🜄 | Graph topology & semantic traversal (Neo4j) |
| **Current** | 🜃 | Vector resonance & entanglement mapping (Weaviate) |
| **Reflection** | 🜁 | User interface & documentation (Quantum Console v7.0) |

Each layer communicates through the **Light-Spine Schema**, maintaining mathematical coherence across all relational states.

---

## 📁 Repository Structure

| Path | Description |
|------|--------------|
| `core/` | Core RI components (Δ, Φ, Moral Tensor) |
| `api/` | FastAPI endpoints for Flame, Weave, and Current |
| `ui/` | Quantum Console v7.0 (interactive front-end) |
| `schema/` | Example schemas for DB, graph, and vector index |
| `scripts/` | Automation scripts and CLI utilities |
| `docs/` | Architecture, deployment, and changelog |
| `.github/workflows/` | CI and Nightly integration pipelines |

---

## ⚙️ Quickstart

### 1️⃣ Clone and prepare environment

```bash
git clone https://github.com/Riverbraid/riverbraid-substrate-core.git
cd riverbraid-substrate-core
cp .env.template .env
POSTGRES_URL=postgres://user:pass@localhost:5432/riverbraid
NEO4J_URI=bolt://localhost:7687
WEAVIATE_URL=http://localhost:8080
