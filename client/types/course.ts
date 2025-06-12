export interface Course {
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  corequisites: string[];
  courseType: 'core' | 'advanced' | 'math' | 'requirement';
  description?: string;
  semester?: string;
  position: { x: number; y: number };
}
