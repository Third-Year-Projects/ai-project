import { useState } from "react";

interface FAQCategory {
  title: string;
  questions: {
    q: string;
    a: string;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Ordering & Delivery",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Delivery times vary by location. Standard delivery typically takes 2-3 business days, while express delivery is available within 24 hours in selected areas."
      },
      {
        q: "What are your payment methods?",
        a: "We accept credit cards, mobile money, cash on delivery, and PayPal."
      }
    ]
  },
  {
    title: "Product Information",
    questions: [
      {
        q: "Are your products organic?",
        a: "We offer both organic and conventional products. Organic products are clearly labeled and certified."
      },
      {
        q: "How is product freshness guaranteed?",
        a: "We work directly with farmers and implement strict quality control measures. Products are delivered within 24 hours of harvest when possible."
      }
    ]
  }
];

export const SmartFAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#468847]">Frequently Asked Questions</h2>
      <input
        type="text"
        placeholder="Search FAQs..."
        className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#468847]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="space-y-6">
        {filteredCategories.map((category) => (
          <div key={category.title} className="border rounded-lg p-4">
            <h3 
              className="text-lg font-semibold mb-4 cursor-pointer hover:text-[#468847]"
              onClick={() => setSelectedCategory(
                selectedCategory === category.title ? null : category.title
              )}
            >
              {category.title}
            </h3>
            {(selectedCategory === category.title || searchQuery) && (
              <div className="space-y-4">
                {category.questions.map((qa, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">{qa.q}</p>
                    <p className="text-gray-600">{qa.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};