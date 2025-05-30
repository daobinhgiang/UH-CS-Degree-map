import React from "react";

type CourseType = 'core' | 'advanced' | 'other';

interface CardProps {
    title: string;
    fullTitle: string;
    link: string;
    courseType: CourseType;
}

const Card: React.FC<CardProps> = ({ title, fullTitle, link, courseType }) => {
    const getCardColor = () => {
        switch (courseType) {
            case 'core':
                return 'bg-green-50 border-green-200';
            case 'advanced':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-white border-gray-200';
        }
    };

    return (
        <div className={`w-41 h-25 px-2 pt-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border ${getCardColor()}`}>
            <a href={link} target="_blank" rel="noopener noreferrer" className="no-underline hover:no-underline text-inherit hover:text-inherit">
                <h3 className="font-semibold mb-2 text-gray-600">{title}</h3>
                <p className="text-xs mb-2 text-gray-600">{fullTitle}</p>
            </a>
        </div>
    );
};

export default Card;
