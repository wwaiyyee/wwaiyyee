"use client";

import React, { useState } from 'react';
import { NavBar } from '../../components/NavBar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BoardItem {
    id: number;
    type: 'photo' | 'note';
    src?: string;
    caption?: string;
    text?: string;
    color?: string;
    rotate: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    zIndex: number;
}

// Sample data for the board
const BOARD_ITEMS: BoardItem[] = [
  { id: 1, type: 'photo', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400', caption: 'Late night coding', rotate: 'rotate-[-5deg]', top: '10%', left: '5%', zIndex: 10 },
  { id: 2, type: 'note', text: 'Thinking about the user journey...', color: 'bg-yellow-200', rotate: 'rotate-[3deg]', top: '15%', left: '25%', zIndex: 5 },
  { id: 3, type: 'photo', src: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=400', caption: 'Product Strategy Session', rotate: 'rotate-[6deg]', top: '45%', left: '10%', zIndex: 8 },
  { id: 4, type: 'note', text: 'Role: Frontend Lead\nProject: E-commerce Refactor', color: 'bg-blue-200', rotate: 'rotate-[-2deg]', top: '35%', left: '50%', zIndex: 7 },
  { id: 5, type: 'photo', src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400', caption: 'Team brainstorming', rotate: 'rotate-[-8deg]', top: '60%', left: '20%', zIndex: 6 },
  { id: 6, type: 'note', text: 'Design is intelligence made visible.', color: 'bg-pink-200', rotate: 'rotate-[4deg]', top: '55%', left: '70%', zIndex: 9 },
  { id: 7, type: 'photo', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400', caption: 'Launch day!', rotate: 'rotate-[2deg]', top: '20%', left: '60%', zIndex: 11 },
  { id: 8, type: 'note', text: 'Reminder: Update portfolio case studies', color: 'bg-green-200', rotate: 'rotate-[-4deg]', top: '80%', left: '40%', zIndex: 4 },
  { id: 9, type: 'photo', src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400', caption: 'Workshop facilitation', rotate: 'rotate-[10deg]', top: '75%', left: '65%', zIndex: 3 },
  { id: 10, type: 'note', text: 'Currently reading: "The Design of Everyday Things"', color: 'bg-orange-200', rotate: 'rotate-[-6deg]', top: '5%', right: '10%', zIndex: 2 },
  { id: 11, type: 'photo', src: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=400', caption: 'Desk setup', rotate: 'rotate-[15deg]', bottom: '10%', right: '5%', zIndex: 1 },
  { id: 12, type: 'note', text: 'Idea: Mood board for new project', color: 'bg-purple-200', rotate: 'rotate-[8deg]', bottom: '20%', left: '5%', zIndex: 12 }
];

export default function AboutPage() {
    const [items, setItems] = useState<BoardItem[]>(BOARD_ITEMS);
    
    // Simple drag implementation placeholder
    const handleMouseDown = (e: React.MouseEvent, item: BoardItem) => {
        // Future implementation: Drag and drop logic
    };

    return (
        <div className="min-h-screen bg-[#F0F0E8] overflow-hidden relative font-sans">
            <div className="absolute top-0 left-0 w-full z-50">
               <NavBar />
            </div>

            <main className="w-full h-[150vh] relative pt-24 overflow-y-auto">
                 <h1 className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-center tracking-tighter text-black opacity-[0.03] select-none pointer-events-none whitespace-nowrap z-0">
                    ABOUT ME
                </h1>

                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`absolute shadow-lg transition-transform hover:scale-105 hover:z-50 cursor-grab active:cursor-grabbing group ${item.rotate} p-2 bg-white/50 backdrop-blur-sm rounded-sm`}
                        style={{ 
                            top: item.top, 
                            left: item.left, 
                            right: item.right,
                            bottom: item.bottom,
                            zIndex: item.zIndex
                        }}
                        onMouseDown={(e) => handleMouseDown(e, item)}
                    >
                        {item.type === 'photo' ? (
                            <div className="bg-white p-3 pb-8 w-64 md:w-80 transform transition-all duration-300 shadow-sm border border-gray-100">
                                <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 relative">
                                    <img 
                                        src={item.src} 
                                        alt={item.caption} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="mt-3 flex justify-between items-end">
                                    <p className="font-handwriting text-sm text-gray-800 font-medium">
                                        {item.caption}
                                    </p>
                                    <span className="text-[10px] text-gray-400 font-mono">0{item.id}</span>
                                </div>
                                {/* Tape effect */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-12 bg-white/30 backdrop-blur-sm border-l border-r border-white/50 rotate-[-2deg] shadow-sm transform -translate-y-2 opacity-60"></div>
                            </div>
                        ) : (
                            <div className={`${item.color} w-56 h-56 p-6 flex flex-col justify-between shadow-sm transform hover:-rotate-2 transition-transform`}>
                                <div className="w-full h-8 flex justify-center -mt-8 mb-2">
                                     <div className="w-4 h-4 rounded-full bg-red-400 opacity-80 shadow-inner"></div>
                                </div>
                                <p className="font-mono text-sm leading-relaxed text-gray-800 font-medium whitespace-pre-line flex-grow">
                                    {item.text}
                                </p>
                                <div className="text-right text-xs text-black/40 font-mono mt-2 pt-2 border-t border-black/5">
                                    archived
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </main>
        </div>
    );
}
