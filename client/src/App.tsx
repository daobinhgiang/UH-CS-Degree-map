import React from 'react'
import { useCallback, useState } from 'react'
import './App.css'
import Card from './components/CourseCard'
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'
import type { Node, Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 250, y: 5 },
    data: { label: 'CS 1410' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'CS 2420' },
  },
  {
    id: '3',
    position: { x: 400, y: 100 },
    data: { label: 'CS 2810' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'step' },
  { id: 'e1-3', source: '1', target: '3', type: 'step' },
];

function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const resetPositions = useCallback(() => {
    setNodes(initialNodes);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 4 }}>
        <button
          onClick={resetPositions}
          className="px-4 py-2 bg-blue-500 text-black outline-black outline-2 rounded hover:bg-blue-600 transition-colors"
        >
          Reset Positions
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
