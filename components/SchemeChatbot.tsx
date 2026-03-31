// 'use client'

// import React, { useState, useRef, useEffect } from 'react'
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

// interface Message {
//   id: string
//   text: string
//   sender: 'user' | 'assistant'
//   timestamp: Date
// }

// interface ChatbotProps {
//   isOpen: boolean
//   onClose: () => void
//   schemeId: string 
//   schemeName: string
// }

// const SchemeChatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, schemeId, schemeName }) => {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [inputValue, setInputValue] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     setMounted(true)
//     setMessages([
//       {
//         id: 'initial',
//         text: `Hello! I'm your AI assistant for the ${schemeName}. Ask me anything about eligibility or benefits!`,
//         sender: 'assistant',
//         timestamp: new Date(),
//       },
//     ])
//   }, [schemeName])

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!inputValue.trim() || isLoading) return

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputValue,
//       sender: 'user',
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInputValue('')
//     setIsLoading(true)

//     const assistantMessageId = (Date.now() + 1).toString()
//     setMessages((prev) => [
//       ...prev,
//       { id: assistantMessageId, text: '', sender: 'assistant', timestamp: new Date() }
//     ])

//     try {
//       const response = await fetch('/api/chatbot', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: inputValue, schemeId: schemeId }),
//       })

//       if (!response.ok) throw new Error('Failed to connect to AI')

//       const reader = response.body?.getReader()
//       const decoder = new TextDecoder()
//       let accumulatedText = ''

//       if (reader) {
//         while (true) {
//           const { done, value } = await reader.read()
//           if (done) break
//           const chunk = decoder.decode(value, { stream: true })
//           accumulatedText += chunk

//           setMessages((prev) => 
//             prev.map((msg) => 
//               msg.id === assistantMessageId ? { ...msg, text: accumulatedText } : msg
//             )
//           )
//         }
//       }
//     } catch (error) {
//       setMessages((prev) => 
//         prev.map((msg) => 
//           msg.id === assistantMessageId ? { ...msg, text: 'Error: Could not reach assistant.' } : msg
//         )
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!mounted || !isOpen) return null

//   return (
//     <>
//       <div className='fixed inset-0 bg-black/50 z-40' onClick={onClose} />
//       <div className='fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col'>
//         <div className='bg-[#2660A4] text-white p-4 flex justify-between items-center'>
//           <div>
//             <h3 className='font-bold text-white'>Yojana Saathi AI</h3>
//             <p className='text-xs opacity-80 text-white'>{schemeName}</p>
//           </div>
//           <button onClick={onClose} className='text-xl text-white'>✕</button>
//         </div>

//         <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
//           {messages.map((message) => (
//             <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-[85%] px-4 py-2 rounded-lg ${
//                 // FIXED: User text is white, Chatbot (Assistant) text is black
//                 message.sender === 'user' 
//                   ? 'bg-[#2660A4] text-white' 
//                   : 'bg-white text-black shadow border border-gray-200'
//               }`}>
//                 {/* Note: For ReactMarkdown, we ensure the prose class 
//                    inherits the color (prose-invert for white text)
//                 */}
//                 <div className={`prose prose-sm max-w-none wrap-break-word ${
//                   message.sender === 'user' ? 'text-white prose-invert' : 'text-black'
//                 }`}>
//                   <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
//                 </div>
//                 <span className={`text-[10px] mt-1 block opacity-70 ${
//                    message.sender === 'user' ? 'text-white' : 'text-black'
//                 }`} suppressHydrationWarning>
//                   {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <form onSubmit={handleSendMessage} className='p-4 border-t flex gap-2 bg-white'>
//           <input
//             // FIXED: text-black for the typing area
//             className='flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-[#2660A4] bg-white'
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type your question..."
//             disabled={isLoading}
//           />
//           {/* text-white for the emoji icon looks cleaner on blue */}
//           <button disabled={isLoading} className='bg-[#2660A4] text-white px-4 rounded-lg hover:bg-[#1e4a7a] transition-colors'>
//             📤
//           </button>
//         </form>
//       </div>
//     </>
//   )
// }

// export default SchemeChatbot



'use client'

import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// Add LiveKit imports
import { LiveKitRoom, VoiceAssistantControlBar } from '@livekit/components-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
  schemeName: string
}

const SchemeChatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, schemeName }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // NEW STATES: For Voice Agent
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [voiceToken, setVoiceToken] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    setMessages([
      {
        id: 'initial',
        text: `Hello! I'm your AI assistant for the ${schemeName}. Ask me anything about eligibility or benefits!`,
        sender: 'assistant',
        timestamp: new Date(),
      },
    ])
  }, [schemeName])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // NEW FUNCTION: Handle Voice Activation
  const handleVoiceToggle = async () => {
    if (isVoiceMode) {
      setIsVoiceMode(false)
      return
    }

    try {
      setIsLoading(true)
      // Sanitizing the scheme name for the room parameter
      const roomName = encodeURIComponent(schemeName.replace(/\s+/g, '-'))
      const response = await fetch(`/api/get-voice-token?room=${roomName}`)
      const data = await response.json()
      
      if (data.token) {
        setVoiceToken(data.token)
        setIsVoiceMode(true)
      }
    } catch (error) {
      console.error("Voice Token Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    const assistantMessageId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      { id: assistantMessageId, text: '', sender: 'assistant', timestamp: new Date() }
    ])

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue, schemeName: schemeName }),
      })

      if (!response.ok) throw new Error('Failed to connect to AI')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let fullText = ''
        
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value, { stream: true })
          fullText += chunk
          
          // Update immediately for responsive streaming
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === assistantMessageId ? { ...msg, text: fullText } : msg
            )
          )
        }
      }
    } catch (error) {
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === assistantMessageId ? { ...msg, text: 'Error: Could not reach assistant.' } : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted || !isOpen) return null

  return (
    <>
      <div className='fixed inset-0 bg-black/50 z-40' onClick={onClose} />
      <div className='fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col'>
        <div className='bg-[#2660A4] text-white p-4 flex justify-between items-center'>
          <div>
            <h3 className='font-bold text-white'>Yojana Saathi AI</h3>
            <p className='text-xs opacity-80 text-white'>{schemeName}</p>
          </div>
          <button onClick={onClose} className='text-xl text-white'>✕</button>
        </div>

        <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
          {/* VOICE INTERFACE OVERLAY */}
          {isVoiceMode && voiceToken ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                 <span className="text-4xl">🎙️</span>
              </div>
              <div>
                <h4 className="font-bold text-black">Voice Mode Active</h4>
                <p className="text-sm text-gray-500">I am listening in Kanglish...</p>
              </div>
              <LiveKitRoom
  serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
  token={voiceToken}
  connect={true}
  audio={true}
  // FIXED: In many versions, metadata is passed here directly
  options={{
    metadata: JSON.stringify({ scheme_id: schemeName }),
  }as any}
  onDisconnected={() => {
    setIsVoiceMode(false);
    setVoiceToken(null);
  }}
>
  <div className="flex flex-col items-center">
    <VoiceAssistantControlBar />
  </div>
</LiveKitRoom>
              <button 
                onClick={() => setIsVoiceMode(false)}
                className="text-xs text-[#2660A4] font-semibold underline"
              >
                Exit Voice Mode
              </button>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-[#2660A4] text-white' 
                      : 'bg-white text-black shadow border border-gray-200'
                  }`}>
                    <div className={`prose prose-sm max-w-none wrap-break-word ${
                      message.sender === 'user' ? 'text-white prose-invert' : 'text-black'
                    }`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                    </div>
                    <span className={`text-[10px] mt-1 block opacity-70 ${
                       message.sender === 'user' ? 'text-white' : 'text-black'
                    }`} suppressHydrationWarning>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form onSubmit={handleSendMessage} className='p-4 border-t flex gap-2 bg-white'>
          <input
            className='flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-black outline-none focus:border-[#2660A4] bg-white'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isVoiceMode ? "Voice mode active..." : "Type your question..."}
            disabled={isLoading || isVoiceMode}
          />
          
          <button 
            type="submit"
            disabled={isLoading || isVoiceMode} 
            className='bg-[#2660A4] text-white px-3 rounded-lg hover:bg-[#1e4a7a] transition-colors disabled:opacity-50'
            title="Send Message"
          >
            📤
          </button>

          {/* VOICE AGENT ACTIVATION BUTTON */}
          <button 
            type="button"
            onClick={handleVoiceToggle}
            disabled={isLoading}
            className={`px-3 rounded-lg transition-colors border-2 ${
              isVoiceMode 
              ? 'bg-red-500 border-red-600 text-white' 
              : 'bg-[#F19953] border-[#F19953] text-white hover:bg-[#E68540]'
            }`}
            title={isVoiceMode ? "Stop Voice Mode" : "Start Voice Assistant"}
          >
            {isVoiceMode ? '⏹️' : '🎙️'}
          </button>
        </form>
      </div>
    </>
  )
}

export default SchemeChatbot