import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  return (
    <div className="space-y-4">
      {/* Core Course Example */}
      <Card 
        title="COSC 1437"
        fullTitle="Introduction to Programming"
        link="https://www.uhd.edu/academics/sciences/computer-science/Pages/course-descriptions.aspx"
        courseType="core"
      />

      {/* Advanced Elective Example */}
      <Card 
        title="COSC 4330"
        fullTitle="Advanced Database Systems"
        link="https://www.uhd.edu/academics/sciences/computer-science/Pages/course-descriptions.aspx"
        courseType="advanced"
      />

      {/* Other Course Example */}
      <Card 
        title="MATH 2413"
        fullTitle="Calculus I"
        link="https://www.uhd.edu/academics/sciences/mathematics/Pages/course-descriptions.aspx"
        courseType="other"
      />
    </div>
  )
}

export default App
