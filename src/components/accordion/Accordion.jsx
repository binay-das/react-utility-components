import React, { useState } from 'react';
import './Accordion.css';

export default function Accordion() {
    const faqData = [
        {
            question: "What is React?",
            answer: "React is a powerful JavaScript library designed for building dynamic and interactive user interfaces, particularly for single-page applications. Maintained by Meta and an open-source community, it emphasizes the use of reusable components to enhance development efficiency and maintainability."
        },
        {
            question: "What is an accordion in web development?",
            answer: "An accordion is a user interface component that displays content in a vertically stacked list of items. Each item can be expanded or collapsed to show or hide associated content, providing an efficient way to organize and present information."
        },
        {
            question: "What are the benefits of using an accordion?",
            answer: "An accordion improves user experience by conserving screen space and reducing cognitive load. It allows users to navigate and access specific pieces of information efficiently without overwhelming them with all the content at once."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle the clicked item
    };

    return (
        <div className="accordion-container">
            <h1>FAQs</h1>
            {faqData.map((obj, index) => (
                <div key={index} className="accordion">
                    <h3
                        onClick={() => toggleAccordion(index)}
                        className={activeIndex === index ? 'active' : ''}
                    >
                        {obj.question} <span>{activeIndex === index ? '-' : '+'}</span>
                    </h3>
                    <p className={activeIndex === index ? 'expanded' : ''}>{obj.answer}</p>
                </div>
            ))}
        </div>
    );
}
