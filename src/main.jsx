import './index.css'
import App from './App'
import BlogPost from './components/BlogPost'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext'

// Import blog post content
import llmGuideContent from './content/blog/understanding-llm-models-complete-guide.md?raw'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog/understanding-llm-models-complete-guide" element={
            <BlogPost
              title="Introduction to Large Language Models (LLMs)"
              date="March 2026"
              content={llmGuideContent}
            />
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
