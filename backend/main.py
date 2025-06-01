from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import networkx as nx

app = FastAPI()

# Allow your frontend origin (localhost:3000 )
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://vectorshift-assessment-frontend.onrender.com/"
    # add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    G = nx.DiGraph()
    for node in pipeline.nodes:
        G.add_node(node.id)

    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)

    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
