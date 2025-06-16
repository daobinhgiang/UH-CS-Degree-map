import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { Course } from '../../types/course';

const getCardColor = (courseType: Course['courseType'], title: string) => {
  if (title.toLowerCase().includes('elective')) return 'bg-white border-gray-400';
  if (courseType === 'core') return 'bg-green-100 border-green-400';
  if (courseType === 'advanced') return 'bg-red-100 border-red-400';
  if (courseType === 'math') return 'bg-yellow-100 border-yellow-400';
  return 'bg-white border-gray-200';
};

const CourseNode: React.FC<NodeProps> = ({ data }) => {
  const course = data as unknown as Course;

  return (
    <div
      className={`min-w-[220px] px-4 py-3 rounded-xl border-2 ${getCardColor(course.courseType, course.title)} flex flex-col items-center`}
      style={{
        fontFamily: 'Segoe UI, Arial, sans-serif',
        boxShadow: 'none',
      }}
    >
      {/* Prerequisite handle (top) */}
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} id="prerequisite" />
      <div className="flex flex-col items-center w-full">
        <div className="font-bold text-gray-700 text-base mb-1 text-center">{course.code}</div>
        <div className="font-normal text-gray-800 text-sm text-center">{course.title}</div>
      </div>
      {/* Prerequisite for other courses handle (bottom) */}
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} id="prerequisite-for" />
    </div>
  );
};

export default CourseNode; 