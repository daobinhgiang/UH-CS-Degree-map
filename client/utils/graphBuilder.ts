import { Course } from "../types/course";
import { Node, Edge } from "reactflow";

export function buildGraph(courses: Course[]) {
  const nodes: Node[] = courses.map((course, index) => ({
    id: course.code,
    data: { label: `${course.code}` },
    position: { x: 150 * (index % 5), y: 150 * Math.floor(index / 5) },
    type: "default",
  }));

  const edges: Edge[] = courses.flatMap(course =>
    course.prerequisites.map(prereq => ({
      id: `${prereq}->${course.code}`,
      source: prereq,
      target: course.code,
      animated: true,
    }))
  );

  return { nodes, edges };
}
