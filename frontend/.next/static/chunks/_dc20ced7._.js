(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DealerChatbot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function DealerChatbot() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm your ToyotaPath assistant. I can help you explore financing options, compare vehicles, or connect you with local dealers. What would you like to do today?",
            timestamp: new Date(),
            suggestions: [
                'Find affordable vehicles',
                'Compare lease vs buy',
                'Talk to a local dealer',
                'Get financing advice'
            ]
        }
    ]);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSendMessage = async (content)=>{
        if (!content.trim()) return;
        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date()
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInputValue('');
        setIsTyping(true);
        // Simulate AI response
        setTimeout(()=>{
            const responses = {
                affordable: "Based on your budget of $1,040/month, I can show you several great options:\n\n🚗 2024 Corolla XSE - $358/mo (lease)\n🚙 2024 Camry SE - $429/mo (finance)\n🚕 2024 RAV4 XLE - $498/mo (finance)\n\nWould you like to see detailed comparisons?",
                compare: "Let me break down Lease vs Buy for you:\n\n**Lease Benefits:**\n✅ Lower monthly payments\n✅ Drive new car every 2-3 years\n✅ Warranty coverage\n❌ No ownership\n❌ Mileage restrictions\n\n**Buy Benefits:**\n✅ Build equity\n✅ No mileage limits\n✅ Customization freedom\n❌ Higher payments\n❌ Maintenance costs after warranty\n\nBased on your profile, I'd recommend financing if you plan to keep the car 5+ years.",
                dealer: "I've found 4 certified Toyota dealers near you:\n\n🏆 Eastside Toyota Center (8.7 mi) - 4.9★\n   Special: $2,500 loyalty rebate\n\n📍 Toyota of Downtown (2.3 mi) - 4.8★\n   Special: 0% APR for 60 months\n\n🚗 Northside Toyota (5.1 mi) - 4.6★\n   Special: Free maintenance 2 years\n\nWould you like to schedule a test drive or request a quote?",
                default: "I'd be happy to help with that! Could you provide more details about:\n• Your preferred vehicle type\n• Your budget range\n• Whether you're considering trade-in\n\nOr I can connect you with a live dealer specialist right away!"
            };
            let responseContent = responses.default;
            const lowerContent = content.toLowerCase();
            if (lowerContent.includes('afford') || lowerContent.includes('budget') || lowerContent.includes('cheap')) {
                responseContent = responses.affordable;
            } else if (lowerContent.includes('lease') || lowerContent.includes('buy') || lowerContent.includes('compar')) {
                responseContent = responses.compare;
            } else if (lowerContent.includes('dealer') || lowerContent.includes('location') || lowerContent.includes('near')) {
                responseContent = responses.dealer;
            }
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseContent,
                timestamp: new Date(),
                suggestions: [
                    'Show me vehicles',
                    'Connect with dealer',
                    'Calculate payments',
                    'Switch to visual mode'
                ]
            };
            setMessages((prev)=>[
                    ...prev,
                    aiMessage
                ]);
            setIsTyping(false);
        }, 1500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[600px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: "ToyotaPath Assistant"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm opacity-90",
                                    children: "Your personal car financing guide"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors",
                            children: "Switch to Visual Mode"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50",
                children: [
                    messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex ".concat(message.role === 'user' ? 'justify-end' : 'justify-start'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[80%] rounded-lg p-4 ".concat(message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow-sm border border-gray-200'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm whitespace-pre-line",
                                        children: message.content
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this),
                                    message.suggestions && message.role === 'assistant' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-wrap gap-2",
                                        children: message.suggestions.map((suggestion, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSendMessage(suggestion),
                                                className: "text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors border border-blue-200",
                                                children: suggestion
                                            }, idx, false, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                                lineNumber: 105,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        }, message.id, false, {
                            fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)),
                    isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white shadow-sm border border-gray-200 rounded-lg p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: '0.1s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                        style: {
                                            animationDelay: '0.2s'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-white border-t border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: inputValue,
                                onChange: (e)=>setInputValue(e.target.value),
                                onKeyPress: (e)=>e.key === 'Enter' && handleSendMessage(inputValue),
                                placeholder: "Ask about financing, vehicles, or dealers...",
                                className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSendMessage(inputValue),
                                className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors",
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 mt-2",
                        children: '💡 Not a fan of chatbots? Click "Switch to Visual Mode" anytime!'
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(DealerChatbot, "qdy6Q38qkB/OJFbhBXGTOwcjHMw=");
_c = DealerChatbot;
var _c;
__turbopack_context__.k.register(_c, "DealerChatbot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/dealer-connect/DealerList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DealerList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function DealerList(param) {
    let { dealers } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: dealers.map((dealer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row md:items-start md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold",
                                                children: dealer.name
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                                lineNumber: 18,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-yellow-500",
                                                        children: "★"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                                        lineNumber: 20,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold ml-1",
                                                        children: dealer.rating
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                                        lineNumber: 21,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-500 text-sm ml-2",
                                                        children: [
                                                            "• ",
                                                            dealer.distance,
                                                            " miles away"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                                        lineNumber: 22,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                                lineNumber: 19,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                        lineNumber: 17,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                    lineNumber: 16,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-600 space-y-1 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: dealer.address
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                            lineNumber: 28,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                dealer.city,
                                                ", ",
                                                dealer.state,
                                                " ",
                                                dealer.zipCode
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                            lineNumber: 29,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-blue-600 font-medium",
                                            children: dealer.phone
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                            lineNumber: 30,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                    lineNumber: 27,
                                    columnNumber: 15
                                }, this),
                                dealer.specialOffers && dealer.specialOffers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-green-700 mb-1",
                                            children: "🎉 Special Offers:"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                            lineNumber: 35,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "text-sm space-y-1",
                                            children: dealer.specialOffers.map((offer, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "text-gray-700",
                                                    children: [
                                                        "• ",
                                                        offer
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                                    lineNumber: 38,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                            lineNumber: 36,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                    lineNumber: 34,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-blue-50 text-blue-700 px-3 py-1 rounded-full",
                                        children: [
                                            dealer.inventory.length,
                                            " vehicles in stock"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                        lineNumber: 47,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                            lineNumber: 15,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 mt-4 md:mt-0 md:ml-4 min-w-[200px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors",
                                    children: "Request Quote"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-lg font-medium transition-colors",
                                    children: "Schedule Test Drive"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors",
                                    children: "View Inventory"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                    lineNumber: 14,
                    columnNumber: 11
                }, this)
            }, dealer.id, false, {
                fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/dealer-connect/DealerList.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = DealerList;
var _c;
__turbopack_context__.k.register(_c, "DealerList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/dealer-connect/SavedCars.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SavedCars
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
// Dummy data for now; replace with real saved cars from user state or backend
const mockSavedCars = [
    // Example vehicles
    {
        id: 'camry-2026-le',
        make: 'Toyota',
        model: 'Camry',
        year: 2026,
        trim: 'LE',
        msrp: 29000,
        image: '/vehicles/camry-le.jpg',
        features: [
            'All-Hybrid Powertrain',
            '232 HP',
            'Toyota Safety Sense 3.0'
        ],
        fuelEconomy: {
            city: 52,
            highway: 49
        },
        category: 'sedan'
    },
    {
        id: 'rav4-2025-xle',
        make: 'Toyota',
        model: 'RAV4',
        year: 2025,
        trim: 'XLE',
        msrp: 32000,
        image: '/vehicles/rav4-xle.jpg',
        features: [
            'AWD',
            'Toyota Safety Sense',
            'Apple CarPlay'
        ],
        fuelEconomy: {
            city: 28,
            highway: 35
        },
        category: 'suv'
    }
];
function SavedCars() {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCompare, setShowCompare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleSelect = (id)=>{
        setSelected((sel)=>sel.includes(id) ? sel.filter((x)=>x !== id) : [
                ...sel,
                id
            ]);
    };
    const selectedCars = mockSavedCars.filter((car)=>selected.includes(car.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded shadow p-4 mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold mb-2",
                children: "Your Saved Cars"
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-4",
                children: mockSavedCars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded p-2 w-48 ".concat(selected.includes(car.id) ? 'border-blue-500' : 'border-gray-200'),
                        onClick: ()=>toggleSelect(car.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: car.image,
                                alt: car.model,
                                className: "w-full h-24 object-cover rounded mb-1"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold",
                                children: [
                                    car.year,
                                    " ",
                                    car.make,
                                    " ",
                                    car.model
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: car.trim
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                children: [
                                    "$",
                                    car.msrp.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: selected.includes(car.id),
                                readOnly: true,
                                className: "mt-1"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            " Select"
                        ]
                    }, car.id, true, {
                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300",
                disabled: selected.length < 2,
                onClick: ()=>setShowCompare(true),
                children: "Compare Selected"
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            showCompare && selectedCars.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "absolute top-2 right-2 text-xl",
                            onClick: ()=>setShowCompare(false),
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold mb-4",
                            children: "Compare Cars"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-2 border",
                                                    children: "Feature"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 21
                                                }, this),
                                                selectedCars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-2 border",
                                                        children: [
                                                            car.year,
                                                            " ",
                                                            car.make,
                                                            " ",
                                                            car.model
                                                        ]
                                                    }, car.id, true, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                            lineNumber: 86,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border font-semibold",
                                                        children: "MSRP"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this),
                                                    selectedCars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-2 border",
                                                            children: [
                                                                "$",
                                                                car.msrp.toLocaleString()
                                                            ]
                                                        }, car.id, true, {
                                                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                lineNumber: 94,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border font-semibold",
                                                        children: "Fuel Economy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 21
                                                    }, this),
                                                    selectedCars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-2 border",
                                                            children: [
                                                                car.fuelEconomy.city,
                                                                "/",
                                                                car.fuelEconomy.highway,
                                                                " mpg"
                                                            ]
                                                        }, car.id, true, {
                                                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border font-semibold",
                                                        children: "Category"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 21
                                                    }, this),
                                                    selectedCars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-2 border",
                                                            children: car.category
                                                        }, car.id, false, {
                                                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                lineNumber: 106,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-2 border font-semibold",
                                                        children: "Features"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 21
                                                    }, this),
                                                    selectedCars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-2 border",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "list-disc ml-4",
                                                                children: car.features.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        children: f
                                                                    }, f, false, {
                                                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                                        lineNumber: 117,
                                                                        columnNumber: 60
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                                lineNumber: 116,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, car.id, false, {
                                                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold mb-1",
                                    children: "Budget Fit"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: "(Show where each car falls in your budget here...)"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/dealer-connect/SavedCars.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(SavedCars, "RsFlAF5p4kwJL4u8T9z5yJyQiwI=");
_c = SavedCars;
var _c;
__turbopack_context__.k.register(_c, "SavedCars");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/dealer-connect/CarQuiz.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CarQuiz
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const quizQuestions = [
    {
        section: 'Size & Capacity',
        questions: [
            {
                q: 'How many people do you usually drive with?',
                options: [
                    '1–2',
                    '3–5',
                    '6+'
                ]
            },
            {
                q: 'Do you need extra cargo space?',
                options: [
                    'Yes, lots of space',
                    'A little space is fine',
                    'Not really'
                ]
            }
        ]
    },
    {
        section: 'Safety & Family',
        questions: [
            {
                q: 'Do you have kids or prioritize family safety?',
                options: [
                    'Yes, safety is top priority',
                    'Somewhat important',
                    'Not a major concern'
                ]
            },
            {
                q: 'Do you want advanced driver-assist features?',
                options: [
                    'Absolutely',
                    'Maybe',
                    'Not needed'
                ]
            }
        ]
    },
    {
        section: 'Driving Style & Usage',
        questions: [
            {
                q: 'Where do you drive most often?',
                options: [
                    'City / daily commuting',
                    'Highway / long trips',
                    'Off-road / adventure'
                ]
            },
            {
                q: 'How important is fuel efficiency?',
                options: [
                    'Very important',
                    'Somewhat important',
                    'Not important'
                ]
            }
        ]
    },
    {
        section: 'Budget & Ownership',
        questions: [
            {
                q: 'Do you prefer new or used vehicles?',
                options: [
                    'New',
                    'Used',
                    'Either'
                ]
            },
            {
                q: 'Do you want the lowest monthly payment or are you okay paying more for features?',
                options: [
                    'Lowest payment',
                    'Balance features & price',
                    'Features over price'
                ]
            }
        ]
    },
    {
        section: 'Style & Tech',
        questions: [
            {
                q: 'What type of car body do you prefer?',
                options: [
                    'Sedan / hatchback',
                    'SUV / crossover',
                    'Truck',
                    'Minivan'
                ]
            },
            {
                q: 'Do you want tech-heavy features (touchscreens, connectivity, apps)?',
                options: [
                    'Yes, all of it',
                    'Some features are fine',
                    'Minimal tech'
                ]
            }
        ]
    },
    {
        section: 'Optional Add-ons / Priorities',
        questions: [
            {
                q: 'Do you want hybrid/electric options?',
                options: [
                    'Yes',
                    'No',
                    'Maybe'
                ]
            },
            {
                q: 'Do you need towing or hauling capability?',
                options: [
                    'Yes',
                    'No',
                    'Maybe'
                ]
            },
            {
                q: 'Do you want luxury or sporty feel?',
                options: [
                    'Luxury',
                    'Sporty',
                    'Neither'
                ]
            }
        ]
    }
];
function CarQuiz() {
    _s();
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleChange = (q, value)=>{
        setAnswers((a)=>({
                ...a,
                [q]: value
            }));
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmitted(true);
    };
    // Placeholder: simple logic to recommend a car type
    const getRecommendation = ()=>{
        if (!submitted) return null;
        if (answers['What type of car body do you prefer?']) {
            return "You might like a ".concat(answers['What type of car body do you prefer?']);
        }
        return 'Complete the quiz for a recommendation!';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded shadow p-4 mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold mb-2",
                children: "What Car Is Right For You?"
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: [
                    quizQuestions.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold mb-1",
                                    children: section.section
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                section.questions.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block mb-1",
                                                children: q.q
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 flex-wrap",
                                                children: q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "inline-flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: q.q,
                                                                value: opt,
                                                                checked: answers[q.q] === opt,
                                                                onChange: ()=>handleChange(q.q, opt),
                                                                className: "mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                                                                lineNumber: 123,
                                                                columnNumber: 23
                                                            }, this),
                                                            opt
                                                        ]
                                                    }, opt, true, {
                                                        fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, q.q, true, {
                                        fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, section.section, true, {
                            fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "px-4 py-2 bg-blue-600 text-white rounded",
                        children: "Get Recommendation"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            submitted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-3 bg-blue-50 rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Recommendation:"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    " ",
                    getRecommendation()
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/dealer-connect/CarQuiz.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(CarQuiz, "O/nYjJkSnbJ3pHgVyFGmBZJX18s=");
_c = CarQuiz;
var _c;
__turbopack_context__.k.register(_c, "CarQuiz");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/backend/src/data/vehicles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockVehicles",
    ()=>mockVehicles
]);
const mockVehicles = [
    // ===== TOYOTA SEDANS =====
    // 2026 Camry (All-Hybrid Lineup) - Starting $29,000
    {
        id: 'camry-2026-le',
        make: 'Toyota',
        model: 'Camry',
        year: 2026,
        trim: 'LE',
        msrp: 29000,
        image: '/vehicles/camry-le.jpg',
        features: [
            'All-Hybrid Powertrain',
            '232 HP',
            'Toyota Safety Sense 3.0',
            '8" Touchscreen',
            'Dual Zone Climate Control'
        ],
        fuelEconomy: {
            city: 52,
            highway: 49
        },
        category: 'sedan'
    },
    {
        id: 'camry-2026-se',
        make: 'Toyota',
        model: 'Camry',
        year: 2026,
        trim: 'SE',
        msrp: 31300,
        image: '/vehicles/camry-se.jpg',
        features: [
            'Sport Tuned Suspension',
            '18" Black Wheels',
            'Sport SofTex Seats',
            'All-Hybrid 232 HP'
        ],
        fuelEconomy: {
            city: 47,
            highway: 45
        },
        category: 'sedan'
    },
    {
        id: 'camry-2026-nightshade',
        make: 'Toyota',
        model: 'Camry',
        year: 2026,
        trim: 'Nightshade',
        msrp: 32300,
        image: '/vehicles/camry-nightshade.jpg',
        features: [
            '19" Satin Black Wheels',
            'Black Exterior Accents',
            'Aluminum Sport Pedals',
            'All-Hybrid'
        ],
        fuelEconomy: {
            city: 47,
            highway: 45
        },
        category: 'sedan'
    },
    {
        id: 'camry-2026-xle',
        make: 'Toyota',
        model: 'Camry',
        year: 2026,
        trim: 'XLE',
        msrp: 34000,
        image: '/vehicles/camry-xle.jpg',
        features: [
            'Leather-Microfiber Heated Seats',
            '12.3" Touchscreen',
            'Moonroof',
            'All-Hybrid'
        ],
        fuelEconomy: {
            city: 47,
            highway: 45
        },
        category: 'sedan'
    },
    {
        id: 'camry-2026-xse',
        make: 'Toyota',
        model: 'Camry',
        year: 2026,
        trim: 'XSE',
        msrp: 35200,
        image: '/vehicles/camry-xse.jpg',
        features: [
            '19" Smoked Gray Wheels',
            'Sport Suspension',
            'Dual Chrome Exhaust',
            'Premium Audio'
        ],
        fuelEconomy: {
            city: 47,
            highway: 45
        },
        category: 'sedan'
    },
    // 2026 Corolla - Starting $22,725
    {
        id: 'corolla-2026-le',
        make: 'Toyota',
        model: 'Corolla',
        year: 2026,
        trim: 'LE',
        msrp: 22725,
        image: '/vehicles/corolla-le.jpg',
        features: [
            'Blind Spot Monitor',
            'Wireless CarPlay/Android Auto',
            'Toyota Safety Sense 3.0',
            '169 HP'
        ],
        fuelEconomy: {
            city: 32,
            highway: 41
        },
        category: 'sedan'
    },
    {
        id: 'corolla-2026-se',
        make: 'Toyota',
        model: 'Corolla',
        year: 2026,
        trim: 'SE',
        msrp: 25165,
        image: '/vehicles/corolla-se.jpg',
        features: [
            '18" Graphite Alloy Wheels',
            'Sport Seats',
            'Drive Modes (Sport/Eco/Normal)',
            'Push Button Start'
        ],
        fuelEconomy: {
            city: 31,
            highway: 40
        },
        category: 'sedan'
    },
    {
        id: 'corolla-2026-xse',
        make: 'Toyota',
        model: 'Corolla',
        year: 2026,
        trim: 'XSE',
        msrp: 28440,
        image: '/vehicles/corolla-xse.jpg',
        features: [
            '12.3" Digital Gauge Cluster',
            'SofTex Heated Sport Seats',
            '18" Wheels',
            'Sport Suspension'
        ],
        fuelEconomy: {
            city: 31,
            highway: 38
        },
        category: 'sedan'
    },
    {
        id: 'corolla-hybrid-2026-le',
        make: 'Toyota',
        model: 'Corolla Hybrid',
        year: 2026,
        trim: 'LE',
        msrp: 24575,
        image: '/vehicles/corolla-hybrid-le.jpg',
        features: [
            'Hybrid Powertrain',
            'Available AWD',
            'Wireless Charging',
            '196 HP Combined'
        ],
        fuelEconomy: {
            city: 53,
            highway: 46
        },
        category: 'sedan'
    },
    {
        id: 'corolla-hybrid-2026-se',
        make: 'Toyota',
        model: 'Corolla Hybrid',
        year: 2026,
        trim: 'SE',
        msrp: 27015,
        image: '/vehicles/corolla-hybrid-se.jpg',
        features: [
            'Sport Fabric Seats',
            'Drive Modes',
            '18" Graphite Wheels',
            'Hybrid Power'
        ],
        fuelEconomy: {
            city: 50,
            highway: 43
        },
        category: 'sedan'
    },
    {
        id: 'corolla-hybrid-2026-xle',
        make: 'Toyota',
        model: 'Corolla Hybrid',
        year: 2026,
        trim: 'XLE',
        msrp: 28940,
        image: '/vehicles/corolla-hybrid-xle.jpg',
        features: [
            'Power Moonroof',
            'SofTex Heated Seats',
            '12.3" Digital Cluster',
            'Hybrid AWD'
        ],
        fuelEconomy: {
            city: 53,
            highway: 46
        },
        category: 'sedan'
    },
    // ===== TOYOTA PERFORMANCE CARS (GR GARAGE) =====
    // 2026 GR86 - Starting $30,800
    {
        id: 'gr86-2026-base',
        make: 'Toyota',
        model: 'GR86',
        year: 2026,
        trim: 'Base',
        msrp: 30800,
        image: '/vehicles/gr86.jpg',
        features: [
            '228 HP',
            '2.4L Boxer Engine',
            '6-Speed Manual',
            'NASA Membership',
            '0-60 in 6.1s'
        ],
        fuelEconomy: {
            city: 20,
            highway: 26
        },
        category: 'sports'
    },
    {
        id: 'gr86-2026-premium',
        make: 'Toyota',
        model: 'GR86',
        year: 2026,
        trim: 'Premium',
        msrp: 33400,
        image: '/vehicles/gr86-premium.jpg',
        features: [
            '18" Matte Black Wheels',
            'Michelin Pilot Sport 4 Tires',
            'Duckbill Spoiler',
            'Dual-Zone AC'
        ],
        fuelEconomy: {
            city: 20,
            highway: 26
        },
        category: 'sports'
    },
    {
        id: 'gr86-2026-yuzu',
        make: 'Toyota',
        model: 'GR86',
        year: 2026,
        trim: 'Yuzu Edition',
        msrp: 36365,
        image: '/vehicles/gr86-yuzu.jpg',
        features: [
            'Yuzu Yellow Paint',
            'Ultrasuede Sport Seats',
            'Yellow Stitching',
            'Limited Edition'
        ],
        fuelEconomy: {
            city: 20,
            highway: 26
        },
        category: 'sports'
    },
    // 2026 GR Supra - Starting $57,500
    {
        id: 'grsupra-2026-30',
        make: 'Toyota',
        model: 'GR Supra',
        year: 2026,
        trim: '3.0',
        msrp: 57500,
        image: '/vehicles/grsupra-30.jpg',
        features: [
            '3.0L Turbo I6',
            '382 HP',
            '0-60 in 3.9s',
            'Adaptive Variable Suspension',
            'NASA Membership'
        ],
        fuelEconomy: {
            city: 22,
            highway: 29
        },
        category: 'sports'
    },
    {
        id: 'grsupra-2026-premium',
        make: 'Toyota',
        model: 'GR Supra',
        year: 2026,
        trim: '3.0 Premium',
        msrp: 60650,
        image: '/vehicles/grsupra-premium.jpg',
        features: [
            '14-Way Heated Leather Seats',
            'Memory Function',
            '12-Speaker JBL Audio (500W)',
            'Premium HiFi'
        ],
        fuelEconomy: {
            city: 22,
            highway: 29
        },
        category: 'sports'
    },
    {
        id: 'grsupra-2026-mkv',
        make: 'Toyota',
        model: 'GR Supra',
        year: 2026,
        trim: 'MkV Final Edition',
        msrp: 68550,
        image: '/vehicles/grsupra-mkv.jpg',
        features: [
            'GT4-Style Pack',
            'Matte Exterior Finish',
            'Upgraded Performance Dampers',
            'Larger Brake Rotors',
            'Limited Edition'
        ],
        fuelEconomy: {
            city: 22,
            highway: 29
        },
        category: 'sports'
    },
    // 2025 GR Corolla - Starting $39,160
    {
        id: 'grcorolla-2025-core',
        make: 'Toyota',
        model: 'GR Corolla',
        year: 2025,
        trim: 'Core',
        msrp: 39160,
        image: '/vehicles/grcorolla-core.jpg',
        features: [
            '300 HP',
            '295 lb-ft Torque',
            'GR-FOUR AWD',
            '1.6L Turbo 3-Cyl',
            '6-Speed iMT or 8-Speed DAT'
        ],
        fuelEconomy: {
            city: 21,
            highway: 28
        },
        category: 'sports'
    },
    {
        id: 'grcorolla-2025-premium',
        make: 'Toyota',
        model: 'GR Corolla',
        year: 2025,
        trim: 'Premium',
        msrp: 41740,
        image: '/vehicles/grcorolla-premium.jpg',
        features: [
            'JBL Premium Audio',
            'Gloss-Black Grille',
            'Functional Air Ducts',
            'Rally-Inspired Design'
        ],
        fuelEconomy: {
            city: 21,
            highway: 28
        },
        category: 'sports'
    },
    {
        id: 'grcorolla-2025-premium-plus',
        make: 'Toyota',
        model: 'GR Corolla',
        year: 2025,
        trim: 'Premium Plus',
        msrp: 45815,
        image: '/vehicles/grcorolla-plus.jpg',
        features: [
            'Forged Carbon Fiber Roof',
            'Michelin Pilot Sport 4 Tires',
            '18" Matte Black Wheels',
            'Hood Bulge'
        ],
        fuelEconomy: {
            city: 21,
            highway: 28
        },
        category: 'sports'
    },
    // ===== TOYOTA SUVs & CROSSOVERS =====
    // 2025 RAV4 - Starting $29,800
    {
        id: 'rav4-2025-le',
        make: 'Toyota',
        model: 'RAV4',
        year: 2025,
        trim: 'LE',
        msrp: 29800,
        image: '/vehicles/rav4-le.jpg',
        features: [
            '203 HP 2.5L',
            '8-Speed Transmission',
            'Available AWD',
            'Multi-Terrain Select',
            'Toyota Safety Sense 2.5'
        ],
        fuelEconomy: {
            city: 27,
            highway: 35
        },
        category: 'suv'
    },
    {
        id: 'rav4-2025-xle',
        make: 'Toyota',
        model: 'RAV4',
        year: 2025,
        trim: 'XLE',
        msrp: 31310,
        image: '/vehicles/rav4-xle.jpg',
        features: [
            '17" Alloy Wheels',
            'Blind Spot Monitor',
            'LED Projector Headlights',
            'Smart Key System'
        ],
        fuelEconomy: {
            city: 27,
            highway: 35
        },
        category: 'suv'
    },
    {
        id: 'rav4-2025-xle-premium',
        make: 'Toyota',
        model: 'RAV4',
        year: 2025,
        trim: 'XLE Premium',
        msrp: 34200,
        image: '/vehicles/rav4-xle-premium.jpg',
        features: [
            '19" Metallic Wheels',
            'SofTex Seats',
            'Power Moonroof',
            'Memory Function'
        ],
        fuelEconomy: {
            city: 27,
            highway: 35
        },
        category: 'suv'
    },
    {
        id: 'rav4-2025-limited',
        make: 'Toyota',
        model: 'RAV4',
        year: 2025,
        trim: 'Limited',
        msrp: 38105,
        image: '/vehicles/rav4-limited.jpg',
        features: [
            'Dynamic Torque Vectoring AWD',
            '10.5" Touchscreen',
            'Wireless Apple CarPlay/Android Auto'
        ],
        fuelEconomy: {
            city: 27,
            highway: 35
        },
        category: 'suv'
    },
    // 2025 RAV4 Hybrid - Starting $32,850
    {
        id: 'rav4-hybrid-2025-le',
        make: 'Toyota',
        model: 'RAV4 Hybrid',
        year: 2025,
        trim: 'LE',
        msrp: 32850,
        image: '/vehicles/rav4-hybrid-le.jpg',
        features: [
            '219 HP Combined',
            'Standard AWD',
            'ECVT Transmission',
            'All-Wheel Drive Integrated Management'
        ],
        fuelEconomy: {
            city: 41,
            highway: 38
        },
        category: 'suv'
    },
    {
        id: 'rav4-hybrid-2025-xle',
        make: 'Toyota',
        model: 'RAV4 Hybrid',
        year: 2025,
        trim: 'XLE',
        msrp: 34360,
        image: '/vehicles/rav4-hybrid-xle.jpg',
        features: [
            'LED Headlights',
            'Smart Key System',
            '17" Light Gray Wheels',
            'Hybrid Power'
        ],
        fuelEconomy: {
            city: 41,
            highway: 38
        },
        category: 'suv'
    },
    {
        id: 'rav4-hybrid-2025-xle-premium',
        make: 'Toyota',
        model: 'RAV4 Hybrid',
        year: 2025,
        trim: 'XLE Premium',
        msrp: 37250,
        image: '/vehicles/rav4-hybrid-xle-premium.jpg',
        features: [
            '18" Dark Metallic Wheels',
            'SofTex Seats',
            'Power Moonroof',
            'Hybrid AWD'
        ],
        fuelEconomy: {
            city: 41,
            highway: 38
        },
        category: 'suv'
    },
    {
        id: 'rav4-hybrid-2025-woodland',
        make: 'Toyota',
        model: 'RAV4 Hybrid',
        year: 2025,
        trim: 'Woodland Edition',
        msrp: 36070,
        image: '/vehicles/rav4-woodland.jpg',
        features: [
            '18" TRD Bronze Wheels',
            'TRD Off-Road Suspension',
            'Falken All-Terrain Tires',
            '120V Power Outlet'
        ],
        fuelEconomy: {
            city: 38,
            highway: 35
        },
        category: 'suv'
    },
    {
        id: 'rav4-hybrid-2025-se',
        make: 'Toyota',
        model: 'RAV4 Hybrid',
        year: 2025,
        trim: 'SE',
        msrp: 35545,
        image: '/vehicles/rav4-hybrid-se.jpg',
        features: [
            '18" Black Sport Wheels',
            'Sport Tuned Suspension',
            'Sport Fabric Seats',
            'Blue Stitching'
        ],
        fuelEconomy: {
            city: 41,
            highway: 38
        },
        category: 'suv'
    },
    {
        id: 'rav4-hybrid-2025-xse',
        make: 'Toyota',
        model: 'RAV4 Hybrid',
        year: 2025,
        trim: 'XSE',
        msrp: 38510,
        image: '/vehicles/rav4-hybrid-xse.jpg',
        features: [
            'Two-Tone Exterior',
            'SofTex Seats',
            '10.5" Touchscreen',
            'Sport Hybrid Design'
        ],
        fuelEconomy: {
            city: 41,
            highway: 38
        },
        category: 'suv'
    },
    {
        id: 'rav4-hybrid-2025-limited',
        make: 'Toyota',
        model: 'RAV4 Hybrid',
        year: 2025,
        trim: 'Limited',
        msrp: 41155,
        image: '/vehicles/rav4-hybrid-limited.jpg',
        features: [
            '18" Dark Metallic Wheels',
            '11-Speaker JBL Premium Audio',
            '10.5" Touchscreen',
            'Premium Hybrid'
        ],
        fuelEconomy: {
            city: 41,
            highway: 38
        },
        category: 'suv'
    },
    // ===== TOYOTA MINIVANS =====
    // 2025 Sienna (All-Hybrid Lineup) - Starting $39,485
    {
        id: 'sienna-2025-le',
        make: 'Toyota',
        model: 'Sienna',
        year: 2025,
        trim: 'LE',
        msrp: 39485,
        image: '/vehicles/sienna-le.jpg',
        features: [
            '245 HP Hybrid',
            'Dual Power Sliding Doors',
            'Blind Spot Monitor',
            '8 Passenger Seating',
            'Split & Stow 3rd Row'
        ],
        fuelEconomy: {
            city: 36,
            highway: 36
        },
        category: 'minivan'
    },
    {
        id: 'sienna-2025-xle',
        make: 'Toyota',
        model: 'Sienna',
        year: 2025,
        trim: 'XLE',
        msrp: 44295,
        image: '/vehicles/sienna-xle.jpg',
        features: [
            'Power Moonroof',
            'Hands-Free Sliding Doors',
            'SofTex Seats',
            'All-Hybrid Power'
        ],
        fuelEconomy: {
            city: 36,
            highway: 36
        },
        category: 'minivan'
    },
    {
        id: 'sienna-2025-xse',
        make: 'Toyota',
        model: 'Sienna',
        year: 2025,
        trim: 'XSE',
        msrp: 46940,
        image: '/vehicles/sienna-xse.jpg',
        features: [
            '20" Dark Wheels',
            'Sport Tuned Suspension',
            'SofTex Sport Seats',
            'Sporty Hybrid'
        ],
        fuelEconomy: {
            city: 36,
            highway: 36
        },
        category: 'minivan'
    },
    {
        id: 'sienna-2025-woodland',
        make: 'Toyota',
        model: 'Sienna',
        year: 2025,
        trim: 'Woodland Edition',
        msrp: 50725,
        image: '/vehicles/sienna-woodland.jpg',
        features: [
            'AWD',
            'Increased Ground Clearance',
            '1500W Power Outlet',
            'Tow Hitch (3500 lbs)',
            'Hybrid Adventure'
        ],
        fuelEconomy: {
            city: 34,
            highway: 36
        },
        category: 'minivan'
    },
    {
        id: 'sienna-2025-limited',
        make: 'Toyota',
        model: 'Sienna',
        year: 2025,
        trim: 'Limited',
        msrp: 50500,
        image: '/vehicles/sienna-limited.jpg',
        features: [
            '12-Speaker JBL Premium Audio',
            '12.3" Digital Cluster',
            'Leather Seats',
            'Premium Hybrid'
        ],
        fuelEconomy: {
            city: 36,
            highway: 36
        },
        category: 'minivan'
    },
    {
        id: 'sienna-2025-platinum',
        make: 'Toyota',
        model: 'Sienna',
        year: 2025,
        trim: 'Platinum',
        msrp: 56445,
        image: '/vehicles/sienna-platinum.jpg',
        features: [
            '20" Two-Tone Wheels',
            '10" Head-Up Display',
            'Panoramic View Monitor',
            '360-Degree Camera',
            'Luxury Hybrid'
        ],
        fuelEconomy: {
            city: 36,
            highway: 36
        },
        category: 'minivan'
    },
    // ===== TOYOTA TRUCKS =====
    // 2025 Tacoma - Starting $30,050
    {
        id: 'tacoma-2025-sr',
        make: 'Toyota',
        model: 'Tacoma',
        year: 2025,
        trim: 'SR',
        msrp: 30050,
        image: '/vehicles/tacoma-sr.jpg',
        features: [
            '2.4L Turbo',
            '278 HP',
            'Available 4WD',
            'Multi-Terrain Select',
            'Towing up to 6500 lbs'
        ],
        fuelEconomy: {
            city: 21,
            highway: 25
        },
        category: 'truck'
    },
    {
        id: 'tacoma-2025-sr5',
        make: 'Toyota',
        model: 'Tacoma',
        year: 2025,
        trim: 'SR5',
        msrp: 34500,
        image: '/vehicles/tacoma-sr5.jpg',
        features: [
            '8-Speed Automatic',
            'Blind Spot Monitor',
            'Toyota Safety Sense 3.0',
            'LED Headlights'
        ],
        fuelEconomy: {
            city: 21,
            highway: 25
        },
        category: 'truck'
    },
    {
        id: 'tacoma-2025-trd-sport',
        make: 'Toyota',
        model: 'Tacoma',
        year: 2025,
        trim: 'TRD Sport',
        msrp: 39850,
        image: '/vehicles/tacoma-trd-sport.jpg',
        features: [
            'TRD Sport Suspension',
            'Hood Scoop',
            'Sport Grille',
            'Premium JBL Audio'
        ],
        fuelEconomy: {
            city: 20,
            highway: 24
        },
        category: 'truck'
    },
    {
        id: 'tacoma-2025-trd-offroad',
        make: 'Toyota',
        model: 'Tacoma',
        year: 2025,
        trim: 'TRD Off-Road',
        msrp: 42050,
        image: '/vehicles/tacoma-trd-offroad.jpg',
        features: [
            'Multi-Terrain Select',
            'Crawl Control',
            'Rear Locking Differential',
            'Off-Road Suspension'
        ],
        fuelEconomy: {
            city: 20,
            highway: 23
        },
        category: 'truck'
    },
    {
        id: 'tacoma-2025-trd-pro',
        make: 'Toyota',
        model: 'Tacoma',
        year: 2025,
        trim: 'TRD Pro',
        msrp: 52680,
        image: '/vehicles/tacoma-trd-pro.jpg',
        features: [
            'FOX Internal Bypass Shocks',
            'TRD Pro Skid Plate',
            '18" BBS Wheels',
            'Rigid Industries LED Lights'
        ],
        fuelEconomy: {
            city: 19,
            highway: 22
        },
        category: 'truck'
    },
    // 2025 Tundra - Starting $40,805
    {
        id: 'tundra-2025-sr',
        make: 'Toyota',
        model: 'Tundra',
        year: 2025,
        trim: 'SR',
        msrp: 40805,
        image: '/vehicles/tundra-sr.jpg',
        features: [
            '3.5L Twin-Turbo V6',
            '389 HP',
            'Towing up to 12000 lbs',
            'Standard 4WD'
        ],
        fuelEconomy: {
            city: 18,
            highway: 24
        },
        category: 'truck'
    },
    {
        id: 'tundra-2025-sr5',
        make: 'Toyota',
        model: 'Tundra',
        year: 2025,
        trim: 'SR5',
        msrp: 46050,
        image: '/vehicles/tundra-sr5.jpg',
        features: [
            '10-Speed Automatic',
            'LED Headlights',
            'Toyota Safety Sense 2.5',
            '8" Touchscreen'
        ],
        fuelEconomy: {
            city: 18,
            highway: 24
        },
        category: 'truck'
    },
    {
        id: 'tundra-2025-limited',
        make: 'Toyota',
        model: 'Tundra',
        year: 2025,
        trim: 'Limited',
        msrp: 54520,
        image: '/vehicles/tundra-limited.jpg',
        features: [
            'Leather Seats',
            'JBL Premium Audio',
            '14" Touchscreen',
            'Panoramic View Monitor'
        ],
        fuelEconomy: {
            city: 18,
            highway: 24
        },
        category: 'truck'
    },
    {
        id: 'tundra-hybrid-2025-limited',
        make: 'Toyota',
        model: 'Tundra Hybrid',
        year: 2025,
        trim: 'Limited',
        msrp: 61345,
        image: '/vehicles/tundra-hybrid-limited.jpg',
        features: [
            '437 HP i-FORCE MAX Hybrid',
            'Towing up to 11450 lbs',
            'Premium Interior',
            'Hybrid Power'
        ],
        fuelEconomy: {
            city: 20,
            highway: 24
        },
        category: 'truck'
    },
    {
        id: 'tundra-2025-trd-pro',
        make: 'Toyota',
        model: 'Tundra',
        year: 2025,
        trim: 'TRD Pro',
        msrp: 71475,
        image: '/vehicles/tundra-trd-pro.jpg',
        features: [
            'FOX Shocks',
            'TRD Pro Skid Plates',
            '18" TRD Wheels',
            'TRD Pro Exhaust',
            'Off-Road Ready'
        ],
        fuelEconomy: {
            city: 17,
            highway: 22
        },
        category: 'truck'
    },
    // 2025 4Runner - Starting $41,270
    {
        id: '4runner-2025-sr5',
        make: 'Toyota',
        model: '4Runner',
        year: 2025,
        trim: 'SR5',
        msrp: 41270,
        image: '/vehicles/4runner-sr5.jpg',
        features: [
            '2.4L Turbo',
            '278 HP',
            'Available 4WD',
            '5 or 7 Passenger Seating'
        ],
        fuelEconomy: {
            city: 20,
            highway: 26
        },
        category: 'suv'
    },
    {
        id: '4runner-2025-trd-sport',
        make: 'Toyota',
        model: '4Runner',
        year: 2025,
        trim: 'TRD Sport',
        msrp: 47990,
        image: '/vehicles/4runner-trd-sport.jpg',
        features: [
            'TRD Sport Suspension',
            'Hood Scoop',
            'Sport Grille',
            'Premium Audio'
        ],
        fuelEconomy: {
            city: 20,
            highway: 26
        },
        category: 'suv'
    },
    {
        id: '4runner-2025-trd-offroad',
        make: 'Toyota',
        model: '4Runner',
        year: 2025,
        trim: 'TRD Off-Road',
        msrp: 49425,
        image: '/vehicles/4runner-trd-offroad.jpg',
        features: [
            'Multi-Terrain Select',
            'Crawl Control',
            'Locking Rear Differential',
            'Off-Road Package'
        ],
        fuelEconomy: {
            city: 19,
            highway: 25
        },
        category: 'suv'
    },
    {
        id: '4runner-hybrid-2025',
        make: 'Toyota',
        model: '4Runner i-FORCE MAX Hybrid',
        year: 2025,
        trim: 'Hybrid',
        msrp: 52490,
        image: '/vehicles/4runner-hybrid.jpg',
        features: [
            '326 HP Hybrid',
            'i-FORCE MAX System',
            '8-Speed Automatic',
            'Enhanced Capability'
        ],
        fuelEconomy: {
            city: 23,
            highway: 24
        },
        category: 'suv'
    },
    {
        id: '4runner-2025-trd-pro',
        make: 'Toyota',
        model: '4Runner',
        year: 2025,
        trim: 'TRD Pro',
        msrp: 60155,
        image: '/vehicles/4runner-trd-pro.jpg',
        features: [
            'FOX Internal Bypass Shocks',
            'TRD Pro Skid Plate',
            'Rigid Industries Lights',
            'Premium Off-Road'
        ],
        fuelEconomy: {
            city: 19,
            highway: 24
        },
        category: 'suv'
    },
    // Other Toyota SUVs
    {
        id: 'highlander-2025-le',
        make: 'Toyota',
        model: 'Highlander',
        year: 2025,
        trim: 'LE',
        msrp: 39120,
        image: '/vehicles/highlander-le.jpg',
        features: [
            '2.4L Turbo',
            '265 HP',
            '8 Passenger Seating',
            'Available AWD',
            'Toyota Safety Sense 3.0'
        ],
        fuelEconomy: {
            city: 22,
            highway: 29
        },
        category: 'suv'
    },
    {
        id: 'highlander-hybrid-2025-le',
        make: 'Toyota',
        model: 'Highlander Hybrid',
        year: 2025,
        trim: 'LE',
        msrp: 43370,
        image: '/vehicles/highlander-hybrid-le.jpg',
        features: [
            '243 HP Combined',
            'Standard AWD',
            'eCVT Transmission',
            '8 Passenger Hybrid SUV'
        ],
        fuelEconomy: {
            city: 36,
            highway: 35
        },
        category: 'suv'
    },
    {
        id: 'sequoia-2025-sr5',
        make: 'Toyota',
        model: 'Sequoia',
        year: 2025,
        trim: 'SR5',
        msrp: 62225,
        image: '/vehicles/sequoia-sr5.jpg',
        features: [
            '437 HP i-FORCE MAX Hybrid',
            'Towing up to 9520 lbs',
            '8 Passenger',
            'Full-Size Hybrid SUV'
        ],
        fuelEconomy: {
            city: 19,
            highway: 22
        },
        category: 'suv'
    },
    {
        id: 'landcruiser-2025',
        make: 'Toyota',
        model: 'Land Cruiser',
        year: 2025,
        trim: 'Base',
        msrp: 57345,
        image: '/vehicles/landcruiser.jpg',
        features: [
            '326 HP Hybrid',
            'i-FORCE MAX',
            'Multi-Terrain Select',
            'Crawl Control',
            'Off-Road Legend'
        ],
        fuelEconomy: {
            city: 22,
            highway: 25
        },
        category: 'suv'
    },
    // Crossovers
    {
        id: 'corolla-cross-2025-l',
        make: 'Toyota',
        model: 'Corolla Cross',
        year: 2025,
        trim: 'L',
        msrp: 24895,
        image: '/vehicles/corolla-cross-l.jpg',
        features: [
            '169 HP',
            'Available AWD',
            'Toyota Safety Sense 3.0',
            'Compact Crossover'
        ],
        fuelEconomy: {
            city: 31,
            highway: 33
        },
        category: 'crossover'
    },
    {
        id: 'corolla-cross-hybrid-2025',
        make: 'Toyota',
        model: 'Corolla Cross Hybrid',
        year: 2025,
        trim: 'Hybrid',
        msrp: 28495,
        image: '/vehicles/corolla-cross-hybrid.jpg',
        features: [
            '196 HP Combined',
            'Hybrid Power',
            'AWD',
            'Up to 42 Combined MPG'
        ],
        fuelEconomy: {
            city: 45,
            highway: 38
        },
        category: 'crossover'
    },
    {
        id: 'venza-2025-le',
        make: 'Toyota',
        model: 'Venza',
        year: 2025,
        trim: 'LE',
        msrp: 36795,
        image: '/vehicles/venza-le.jpg',
        features: [
            '219 HP Hybrid',
            'Standard AWD',
            'Star Gaze Panoramic Roof',
            'Premium Hybrid Crossover'
        ],
        fuelEconomy: {
            city: 40,
            highway: 37
        },
        category: 'crossover'
    },
    // Electric/Alternative Fuel
    {
        id: 'bz4x-2026',
        make: 'Toyota',
        model: 'bZ4X',
        year: 2026,
        trim: 'Base',
        msrp: 34900,
        image: '/vehicles/bz4x.jpg',
        features: [
            'Electric SUV',
            '252 HP',
            'AWD',
            'Up to 252 Mile Range',
            'Fast Charging'
        ],
        fuelEconomy: {
            city: 0,
            highway: 0
        },
        category: 'electric'
    },
    {
        id: 'mirai-2025',
        make: 'Toyota',
        model: 'Mirai',
        year: 2025,
        trim: 'XLE',
        msrp: 50190,
        image: '/vehicles/mirai.jpg',
        features: [
            'Hydrogen Fuel Cell',
            '182 HP',
            'Up to 402 Mile Range',
            'Zero Emissions',
            'Premium Sedan'
        ],
        fuelEconomy: {
            city: 0,
            highway: 0
        },
        category: 'sedan'
    },
    // ===== LEXUS LUXURY VEHICLES =====
    // Lexus Sedans
    {
        id: 'lexus-es-2025-300h',
        make: 'Lexus',
        model: 'ES',
        year: 2025,
        trim: '300h',
        msrp: 47490,
        image: '/vehicles/lexus-es-300h.jpg',
        features: [
            '215 HP Hybrid',
            'Luxury Interior',
            'Lexus Safety System+ 3.0',
            'Premium Sedan'
        ],
        fuelEconomy: {
            city: 43,
            highway: 44
        },
        category: 'sedan'
    },
    {
        id: 'lexus-is-2025-300',
        make: 'Lexus',
        model: 'IS',
        year: 2025,
        trim: '300',
        msrp: 42990,
        image: '/vehicles/lexus-is-300.jpg',
        features: [
            '241 HP',
            'RWD',
            'Sport Sedan',
            'Premium Audio'
        ],
        fuelEconomy: {
            city: 21,
            highway: 31
        },
        category: 'sedan'
    },
    {
        id: 'lexus-ls-2025-500',
        make: 'Lexus',
        model: 'LS',
        year: 2025,
        trim: '500',
        msrp: 79650,
        image: '/vehicles/lexus-ls-500.jpg',
        features: [
            '416 HP Twin-Turbo V6',
            'Flagship Luxury',
            'Mark Levinson Audio',
            'Executive Seating'
        ],
        fuelEconomy: {
            city: 18,
            highway: 30
        },
        category: 'sedan'
    },
    // Lexus SUVs
    {
        id: 'lexus-nx-2025-250',
        make: 'Lexus',
        model: 'NX',
        year: 2025,
        trim: '250',
        msrp: 42235,
        image: '/vehicles/lexus-nx-250.jpg',
        features: [
            '203 HP',
            'Luxury Compact SUV',
            '8-Speed Automatic',
            'Lexus Safety System+ 3.0'
        ],
        fuelEconomy: {
            city: 25,
            highway: 33
        },
        category: 'suv'
    },
    {
        id: 'lexus-nx-2025-350h',
        make: 'Lexus',
        model: 'NX',
        year: 2025,
        trim: '350h',
        msrp: 46370,
        image: '/vehicles/lexus-nx-350h.jpg',
        features: [
            '240 HP Hybrid',
            'AWD',
            'Premium Hybrid SUV',
            'Luxury Features'
        ],
        fuelEconomy: {
            city: 41,
            highway: 37
        },
        category: 'suv'
    },
    {
        id: 'lexus-rx-2025-350',
        make: 'Lexus',
        model: 'RX',
        year: 2025,
        trim: '350',
        msrp: 51325,
        image: '/vehicles/lexus-rx-350.jpg',
        features: [
            '275 HP Turbo',
            'Luxury Mid-Size SUV',
            'Panoramic Roof',
            'Premium Interior'
        ],
        fuelEconomy: {
            city: 21,
            highway: 29
        },
        category: 'suv'
    },
    {
        id: 'lexus-rx-2025-500h',
        make: 'Lexus',
        model: 'RX',
        year: 2025,
        trim: '500h',
        msrp: 55350,
        image: '/vehicles/lexus-rx-500h.jpg',
        features: [
            '366 HP Hybrid',
            'Performance Hybrid',
            'AWD',
            'Mark Levinson Audio'
        ],
        fuelEconomy: {
            city: 27,
            highway: 28
        },
        category: 'suv'
    },
    {
        id: 'lexus-gx-2025-550',
        make: 'Lexus',
        model: 'GX',
        year: 2025,
        trim: '550',
        msrp: 63250,
        image: '/vehicles/lexus-gx-550.jpg',
        features: [
            '349 HP Twin-Turbo V6',
            'Body-on-Frame SUV',
            'Off-Road Capable',
            'Luxury Adventure'
        ],
        fuelEconomy: {
            city: 15,
            highway: 19
        },
        category: 'suv'
    },
    {
        id: 'lexus-lx-2025-600',
        make: 'Lexus',
        model: 'LX',
        year: 2025,
        trim: '600',
        msrp: 93345,
        image: '/vehicles/lexus-lx-600.jpg',
        features: [
            '409 HP Twin-Turbo V6',
            'Full-Size Luxury SUV',
            'Premium Off-Road',
            'Executive Interior'
        ],
        fuelEconomy: {
            city: 17,
            highway: 22
        },
        category: 'suv'
    },
    // Lexus Performance
    {
        id: 'lexus-rc-2025-f',
        make: 'Lexus',
        model: 'RC F',
        year: 2025,
        trim: 'F',
        msrp: 69300,
        image: '/vehicles/lexus-rc-f.jpg',
        features: [
            '472 HP V8',
            'Performance Coupe',
            'Torque Vectoring Differential',
            'Track-Ready'
        ],
        fuelEconomy: {
            city: 16,
            highway: 25
        },
        category: 'sports'
    },
    {
        id: 'lexus-lc-2025-500',
        make: 'Lexus',
        model: 'LC',
        year: 2025,
        trim: '500',
        msrp: 97550,
        image: '/vehicles/lexus-lc-500.jpg',
        features: [
            '471 HP V8',
            'Grand Touring Coupe',
            '10-Speed Automatic',
            'Luxury Performance'
        ],
        fuelEconomy: {
            city: 16,
            highway: 26
        },
        category: 'sports'
    },
    // Lexus Electric
    {
        id: 'lexus-rz-2025-450e',
        make: 'Lexus',
        model: 'RZ',
        year: 2025,
        trim: '450e',
        msrp: 59650,
        image: '/vehicles/lexus-rz-450e.jpg',
        features: [
            '308 HP Electric',
            'AWD',
            'Up to 220 Mile Range',
            'Luxury Electric SUV'
        ],
        fuelEconomy: {
            city: 0,
            highway: 0
        },
        category: 'electric'
    }
]; /**
 * Total Vehicle Count: 80+ vehicles
 * - Toyota: 55+ models across all categories
 * - Lexus: 12 luxury models
 * 
 * Data includes:
 * - Sedans (Camry, Corolla, Mirai, ES, IS, LS)
 * - Sports Cars (GR86, GR Supra, GR Corolla, RC F, LC)
 * - SUVs (RAV4, 4Runner, Highlander, Sequoia, Land Cruiser, NX, RX, GX, LX)
 * - Crossovers (Corolla Cross, Venza)
 * - Trucks (Tacoma, Tundra)
 * - Minivans (Sienna)
 * - Electric (bZ4X, RZ)
 * - Hybrid variants for most models
 */ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/backend/src/data/dealers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDealerById",
    ()=>getDealerById,
    "getDealersWithVehicle",
    ()=>getDealersWithVehicle,
    "getNearestDealers",
    ()=>getNearestDealers,
    "mockDealers",
    ()=>mockDealers
]);
const mockDealers = [
    {
        id: 'dealer_001',
        name: 'Toyota of Downtown',
        address: '123 Main Street',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        phone: '(206) 555-0100',
        rating: 4.8,
        distance: 2.3,
        inventory: [
            'camry-2024-xle',
            'rav4-2024-xle',
            'highlander-2024-xle',
            'prius-2024-limited'
        ],
        specialOffers: [
            '0% APR for 60 months on select models',
            '$1,000 college grad rebate'
        ]
    },
    {
        id: 'dealer_002',
        name: 'Northside Toyota',
        address: '456 North Ave',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98103',
        phone: '(206) 555-0200',
        rating: 4.6,
        distance: 5.1,
        inventory: [
            'camry-2024-se',
            'corolla-2024-xse',
            'tacoma-2024-trd-sport',
            'tundra-2024-sr5'
        ],
        specialOffers: [
            'First responder discount',
            'Free maintenance for 2 years'
        ]
    },
    {
        id: 'dealer_003',
        name: 'Eastside Toyota Center',
        address: '789 Bellevue Way',
        city: 'Bellevue',
        state: 'WA',
        zipCode: '98004',
        phone: '(425) 555-0300',
        rating: 4.9,
        distance: 8.7,
        inventory: [
            'rav4-2024-adventure',
            'highlander-2024-xle',
            'bz4x-2024-limited'
        ],
        specialOffers: [
            '$2,500 loyalty rebate for current Toyota owners',
            'Extended warranty available'
        ]
    },
    {
        id: 'dealer_004',
        name: 'South Seattle Toyota',
        address: '321 Pacific Hwy',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98188',
        phone: '(206) 555-0400',
        rating: 4.5,
        distance: 12.4,
        inventory: [
            'camry-2024-xle',
            'camry-2024-se',
            'corolla-2024-xse',
            'prius-2024-limited'
        ],
        specialOffers: [
            'Military discount program',
            'Complimentary vehicle delivery'
        ]
    }
];
function getDealerById(id) {
    return mockDealers.find((d)=>d.id === id);
}
function getDealersWithVehicle(vehicleId) {
    return mockDealers.filter((d)=>d.inventory.includes(vehicleId));
}
function getNearestDealers() {
    let maxDistance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
    return mockDealers.filter((d)=>d.distance <= maxDistance).sort((a, b)=>a.distance - b.distance);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/dealer-connect/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DealerConnectPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$DealerChatbot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/dealer-connect/DealerChatbot.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$DealerList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/dealer-connect/DealerList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$SavedCars$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/dealer-connect/SavedCars.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$CarQuiz$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/dealer-connect/CarQuiz.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$data$2f$vehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/data/vehicles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$data$2f$dealers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/data/dealers.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function DealerConnectPage() {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('visual');
    const comparisonVehicles = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$data$2f$vehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVehicles"].slice(0, 3);
    const nearbyDealers = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$data$2f$dealers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDealers"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold mb-4",
                                    children: "🤝 Dealer Connect"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-600",
                                    children: "Find your perfect Toyota and connect with trusted dealers — your way."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMode('visual'),
                                    className: "px-4 py-2 rounded-lg font-medium transition-colors ".concat(mode === 'visual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'),
                                    children: "Visual Mode"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMode('chat'),
                                    className: "px-4 py-2 rounded-lg font-medium transition-colors ".concat(mode === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'),
                                    children: "Chat Mode"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-8",
                children: mode === 'chat' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$DealerChatbot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$SavedCars$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$CarQuiz$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold mb-6",
                                    children: "Nearby Toyota Dealers"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$dealer$2d$connect$2f$DealerList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    dealers: nearbyDealers
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/dealer-connect/page.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(DealerConnectPage, "Gnec8zTg8ZHC/K/zXEXUtlj1gMM=");
_c = DealerConnectPage;
var _c;
__turbopack_context__.k.register(_c, "DealerConnectPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_dc20ced7._.js.map