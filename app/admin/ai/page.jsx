'use client';
import { useState } from 'react';

const botResponses = {
  'oily': 'For oily skin, I recommend: COSRX Snail Mucin Essence (lightweight, non-greasy), Some By Mi AHA BHA Toner (pore control), and Innisfree No Sebum Powder. Avoid heavy creams!',
  'dry': 'For dry skin, I recommend: Laneige Water Bank Cream (deep hydration), Dr.Jart+ Cicapair Cream, and Missha Time Revolution Ampoule. Look for hyaluronic acid!',
  'sensitive': 'For sensitive skin, I recommend: Dr.Jart+ Cicapair Tiger Grass Cream (calming), COSRX Low pH Good Morning Cleanser, and Skin1004 Madagascar Centella Toner.',
  'acne': 'For acne-prone skin: COSRX Acne Pimple Patch, Some By Mi AHA BHA PHA Toner, and IUNIK Centella Calming Serum. Use gentle, non-comedogenic products.',
  'whitening': 'For brightening: Missha Time Revolution Essence, Laneige Cream Skin, and Goodal Green Tangerine Vita C Serum. Look for Vitamin C and Niacinamide ingredients!',
  'default': 'I can help you find the perfect Korean skincare routine! Tell me your skin type (oily/dry/sensitive/combination) or your skin concern (acne/whitening/anti-aging).',
};

function getBotResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('oily')) return botResponses.oily;
  if (lower.includes('dry')) return botResponses.dry;
  if (lower.includes('sensitive')) return botResponses.sensitive;
  if (lower.includes('acne') || lower.includes('pimple')) return botResponses.acne;
  if (lower.includes('bright') || lower.includes('white') || lower.includes('glow')) return botResponses.whitening;
  return botResponses.default;
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'আসসালামু আলাইকুম! 👋 I am RKCBD AI Skin Doctor. Tell me your skin type or concern and I will recommend the best Korean skincare products for you!' }
  ]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('demo');
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: getBotResponse(userMsg) }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className="admin-topbar">
        <h1>🤖 AI Skin Doctor Agent</h1>
        <div className="topbar-actions">
          <span className="badge badge-success">Demo Mode Active</span>
        </div>
      </div>
      <div className="admin-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-header"><h3>💬 AI Skin Consultation Chat</h3><span style={{ fontSize: 12, color: '#888' }}>Test the AI agent below</span></div>
              <div className="card-body">
                <div className="ai-chat">
                  {messages.map((m, i) => (
                    <div key={i} className={`ai-msg ${m.type}`}>
                      {m.type === 'bot' && <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a2e', color: '#f0a500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🤖</div>}
                      <div className="bubble">{m.text}</div>
                      {m.type === 'user' && <div className="avatar">U</div>}
                    </div>
                  ))}
                  {loading && (
                    <div className="ai-msg bot">
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a2e', color: '#f0a500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🤖</div>
                      <div className="bubble" style={{ color: '#9ca3af' }}>Analyzing your skin concern...</div>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-control" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Tell me your skin type or concern..." />
                  <button className="btn btn-primary" onClick={sendMessage}>➤ Send</button>
                </div>
                <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['I have oily skin', 'My skin is dry', 'I have acne', 'I want glowing skin', 'Sensitive skin'].map(q => (
                    <button key={q} className="btn btn-secondary btn-sm" onClick={() => { setInput(q); }}>{q}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-header"><h3>🔧 AI Configuration</h3></div>
              <div className="card-body">
                <div className="form-group"><label>AI Model</label>
                  <select className="form-control" value={model} onChange={e => setModel(e.target.value)}>
                    <option value="demo">🤖 Demo Mode (Free)</option>
                    <option value="gpt4">GPT-4o (OpenAI)</option>
                    <option value="gemini">Gemini Pro (Google)</option>
                    <option value="claude">Claude 3 (Anthropic)</option>
                  </select>
                </div>
                <div className="form-group"><label>API Key {model !== 'demo' && '*'}</label><input className="form-control" type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder={model === 'demo' ? 'Not required in demo mode' : 'Enter your API key...'} disabled={model === 'demo'} /></div>
                <div style={{ background: model === 'demo' ? '#dcfce7' : '#dbeafe', border: `1px solid ${model === 'demo' ? '#86efac' : '#93c5fd'}`, borderRadius: 8, padding: 12, fontSize: 12, color: model === 'demo' ? '#166534' : '#1e40af' }}>
                  {model === 'demo' ? '✅ Demo mode uses built-in responses. Free forever!' : '💡 Add API key to Vercel environment variables for production. Visit vercel.com/dashboard.'}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3>📊 AI Stats</h3></div>
              <div className="card-body">
                {[['Total Consultations', '1,247'], ['Avg Response Time', '0.8s'], ['Satisfaction Rate', '94%'], ['Products Recommended', '3,891'], ['Conversion Rate', '38%']].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                    <span style={{ color: '#888' }}>{k}</span>
                    <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
