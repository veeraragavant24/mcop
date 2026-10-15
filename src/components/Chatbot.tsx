import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const quickQuestions = [
  'What courses are offered?',
  'What are the eligibility criteria?',
  'How do I apply for admission?',
  'What facilities does the college have?',
];

const responses: Record<string, string> = {
  'What courses are offered?':
    'Madha College of Physiotherapy offers the Bachelor of Physiotherapy (BPT, 4½ years), Master of Physiotherapy (MPT, 2 years with specializations), and a Ph.D. in Physiotherapy program. You can find detailed information on our Courses page.',
  'What are the eligibility criteria?':
    'For BPT: 10+2 with Physics, Chemistry, and Biology with minimum 50% marks. For MPT: A BPT degree with minimum 50% marks. For Ph.D.: An MPT degree with minimum 55% marks. Visit the Courses page for full details.',
  'How do I apply for admission?':
    'You can start your admission process by clicking the "Admission Enquiry" button on our website. Our admissions team will contact you with detailed application instructions and next steps.',
  'What facilities does the college have?':
    'The college features an Exercise Therapy Lab, Electrotherapy & Diagnostics Lab, Central Library, Smart Classrooms, dedicated Clinical Training facilities, and a Rehabilitation Equipment Unit. Please visit the Facilities page for more information.',
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! Welcome to Madha College of Physiotherapy. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const message = text ?? input.trim();
    if (!message) return;
    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setInput('');

    setTimeout(() => {
      const matched = Object.keys(responses).find(
        (key) => key.toLowerCase() === message.toLowerCase()
      );
      const reply = matched
        ? responses[matched]
        : 'Thank you for your question. For detailed assistance, please contact our admissions office at info@madhaphysiotherapy.edu.in or use the Admission Enquiry form. You can also explore our website pages for more information.';
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-forest-700 text-white shadow-xl hover:bg-forest-800 hover:scale-110 transition-all duration-300 flex items-center justify-center lg:bottom-24"
        aria-label="Chat assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-gold-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[90] w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in flex flex-col max-h-[500px] lg:bottom-40">
          {/* Header */}
          <div className="bg-forest-700 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-forest-900" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Madha Assistant</p>
              <p className="text-forest-200 text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full" /> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-forest-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-forest-700 text-white rounded-br-sm'
                      : 'bg-white text-gray-700 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {messages.length <= 2 && (
              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-2 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-3 py-1.5 text-xs bg-white border border-forest-200 text-forest-700 rounded-full hover:bg-forest-50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-lg bg-forest-700 text-white flex items-center justify-center hover:bg-forest-800 transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
