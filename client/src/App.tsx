import React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'
import type { Node, Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import CourseNode from './components/CourseNode';
import { buildGraph } from '../utils/graphBuilder';
import coursesData from '../data/courses.json';
import type { Course } from '../types/course';

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const courses = coursesData.courses as Course[];
    const { nodes: newNodes, edges: newEdges } = buildGraph(courses);
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const resetPositions = useCallback(() => {
    const courses = coursesData.courses as Course[];
    const { nodes: newNodes, edges: newEdges } = buildGraph(courses);
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 4 }}>
        <button
          onClick={resetPositions}
          className="px-4 py-2 text-black outline-black outline-2 rounded hover:bg-blue-600 transition-colors"
        >
          Reset Positions
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={{ courseNode: CourseNode }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
