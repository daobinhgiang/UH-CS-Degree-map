import React from "react";
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

export type CourseType = 'core' | 'advanced' | 'math' | 'requirement';

interface CourseCardProps extends NodeProps {
  courseCode?: string;
  title: string;
  credits?: number;
  courseType: CourseType;
  onRequirementClick?: () => void;
  selected: boolean;
}

const getCardColor = (courseType: CourseType) => {
  switch (courseType) {
    case 'core':
      return 'bg-green-100 border-green-400';
    case 'advanced':
      return 'bg-red-100 border-red-400';
    case 'math':
      return 'bg-yellow-100 border-yellow-400';
    case 'requirement':
      return 'bg-blue-100 border-blue-400 cursor-pointer hover:bg-blue-200';
    default:
      return 'bg-white border-gray-200';
  }
};

const CourseCard: React.FC<CourseCardProps> = ({
  courseCode,
  title,
  credits,
  courseType,
  onRequirementClick,
  selected
}) => {
  return (
    <div
      className={`w-48 min-h-20 px-3 py-2 rounded-lg shadow-md border-2 ${getCardColor(courseType)} ${selected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={courseType === 'requirement' ? onRequirementClick : undefined}
      title={title}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <div className="flex flex-col items-start">
        {courseCode && <div className="font-bold text-gray-700 text-sm mb-1">{courseCode}</div>}
        <div className="font-medium text-gray-800 text-xs mb-1">{title}</div>
        {typeof credits === 'number' && <div className="text-gray-500 text-xs">{credits} credits</div>}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
};

export default CourseCard;
