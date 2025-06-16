import type { Course } from "../types/course";
import type { Node, Edge } from "@xyflow/react";

export function buildGraph(courses: Course[]) {
  const nodes: Node[] = courses.map((course) => ({
    id: course.code,
    data: { ...course } as Course & Record<string, unknown>,
    position: course.position,
    type: "courseNode",
  }));

  const edges: Edge[] = courses.flatMap(course =>
    course.prerequisites.map(prereq => ({
      id: `${prereq}->${course.code}`,
      source: prereq,
      target: course.code,
      sourceHandle: 'prerequisite-for',
      targetHandle: 'prerequisite',
      type: 'step',
      // animated: true,
    }))
  );

  return { nodes, edges };
}
