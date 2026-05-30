from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

def validate_edges(nodes, edges):
    """Validate that all edges reference valid nodes"""
    valid_node_ids = {node.id for node in nodes}
    
    for edge in edges:
        if edge.source not in valid_node_ids:
            return False, f"Invalid source node: {edge.source}"
        if edge.target not in valid_node_ids:
            return False, f"Invalid target node: {edge.target}"
    
    return True, None

def check_dag(nodes, edges):
    # Build graph with validated edges
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = set()
    rec_stack = set()

    def has_cycle(node):
        visited.add(node)
        rec_stack.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(node)
        return False

    for node in graph:
        if node not in visited:
            if has_cycle(node):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    # Step 1: Validate that pipeline is not empty
    if len(pipeline.nodes) == 0:
        return {
            'valid': False,
            'error': 'Pipeline must contain at least one node'
        }
    
    # Step 2: Validate all edges reference valid nodes
    is_valid, error_msg = validate_edges(pipeline.nodes, pipeline.edges)
    if not is_valid:
        return {
            'valid': False,
            'error': error_msg
        }
    
    # Step 3: Check if pipeline is a valid DAG
    is_valid_dag = check_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'valid': True,
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_valid_dag,
    }
