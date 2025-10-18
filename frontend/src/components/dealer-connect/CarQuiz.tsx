import React, { useState } from 'react';

const quizQuestions = [
  {
    section: 'Size & Capacity',
    questions: [
      {
        q: 'How many people do you usually drive with?',
        options: ['1–2', '3–5', '6+']
      },
      {
        q: 'Do you need extra cargo space?',
        options: ['Yes, lots of space', 'A little space is fine', 'Not really']
      }
    ]
  },
  {
    section: 'Safety & Family',
    questions: [
      {
        q: 'Do you have kids or prioritize family safety?',
        options: ['Yes, safety is top priority', 'Somewhat important', 'Not a major concern']
      },
      {
        q: 'Do you want advanced driver-assist features?',
        options: ['Absolutely', 'Maybe', 'Not needed']
      }
    ]
  },
  {
    section: 'Driving Style & Usage',
    questions: [
      {
        q: 'Where do you drive most often?',
        options: ['City / daily commuting', 'Highway / long trips', 'Off-road / adventure']
      },
      {
        q: 'How important is fuel efficiency?',
        options: ['Very important', 'Somewhat important', 'Not important']
      }
    ]
  },
  {
    section: 'Budget & Ownership',
    questions: [
      {
        q: 'Do you prefer new or used vehicles?',
        options: ['New', 'Used', 'Either']
      },
      {
        q: 'Do you want the lowest monthly payment or are you okay paying more for features?',
        options: ['Lowest payment', 'Balance features & price', 'Features over price']
      }
    ]
  },
  {
    section: 'Style & Tech',
    questions: [
      {
        q: 'What type of car body do you prefer?',
        options: ['Sedan / hatchback', 'SUV / crossover', 'Truck', 'Minivan']
      },
      {
        q: 'Do you want tech-heavy features (touchscreens, connectivity, apps)?',
        options: ['Yes, all of it', 'Some features are fine', 'Minimal tech']
      }
    ]
  },
  {
    section: 'Optional Add-ons / Priorities',
    questions: [
      {
        q: 'Do you want hybrid/electric options?',
        options: ['Yes', 'No', 'Maybe']
      },
      {
        q: 'Do you need towing or hauling capability?',
        options: ['Yes', 'No', 'Maybe']
      },
      {
        q: 'Do you want luxury or sporty feel?',
        options: ['Luxury', 'Sporty', 'Neither']
      }
    ]
  }
];

export default function CarQuiz() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (q: string, value: string) => {
    setAnswers(a => ({ ...a, [q]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Placeholder: simple logic to recommend a car type
  const getRecommendation = () => {
    if (!submitted) return null;
    if (answers['What type of car body do you prefer?']) {
      return `You might like a ${answers['What type of car body do you prefer?']}`;
    }
    return 'Complete the quiz for a recommendation!';
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-lg font-bold mb-2">What Car Is Right For You?</h2>
      <form onSubmit={handleSubmit}>
        {quizQuestions.map(section => (
          <div key={section.section} className="mb-4">
            <h3 className="font-semibold mb-1">{section.section}</h3>
            {section.questions.map(q => (
              <div key={q.q} className="mb-2">
                <label className="block mb-1">{q.q}</label>
                <div className="flex gap-4 flex-wrap">
                  {q.options.map(opt => (
                    <label key={opt} className="inline-flex items-center">
                      <input
                        type="radio"
                        name={q.q}
                        value={opt}
                        checked={answers[q.q] === opt}
                        onChange={() => handleChange(q.q, opt)}
                        className="mr-1"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Get Recommendation</button>
      </form>
      {submitted && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <strong>Recommendation:</strong> {getRecommendation()}
        </div>
      )}
    </div>
  );
}
