"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { Clock, ArrowRight, Search, ChevronDown, Check } from 'lucide-react';

import { PROJECTS } from '@/components/projects';

// Add some extra metadata just for the case studies page so it works with the filter/sort
const ARTICLES_RAW = PROJECTS.map((project, index) => {
    // Generate some stable metadata for sorting and filtering if it's not present
    const categories = ['Data Vis', 'Fintech', 'AI Interface', 'Creative Tech'];
    const assignedCategory = categories[index % categories.length];
    
    let dateStr = '';
    let sortDate = '';
    let projectTags: string[] = [];
    const titleLower = project.title.toLowerCase();
    
    if (titleLower.includes('dopews')) {
        dateStr = 'Mar 2026';
        sortDate = '2026-03-01';
        projectTags = ['AI / Machine Learning', 'Data Visualization'];
    } else if (titleLower.includes('twinkle')) {
        dateStr = 'Dec 2025';
        sortDate = '2025-12-01';
        projectTags = ['EdTech', 'Game-Based Learning', 'Neurodiversity'];
    } else if (titleLower.includes('intellitrade')) {
        dateStr = 'Nov 2025';
        sortDate = '2025-11-01';
        projectTags = ['AI Agents', 'Web3', 'UI/UX Design'];
    } else {
        dateStr = 'Oct 2025';
        sortDate = '2025-10-01';
        projectTags = [project.tagline];
    }

    return {
        id: project.id,
        number: project.number,
        title: project.title,
        excerpt: project.caseStudy.overview,
        date: dateStr,
        sortDate: sortDate,
        category: assignedCategory,
        image: project.image,
        tagline: project.tagline,
        roles: project.roles,
        tags: projectTags
    };
});

// Arrange in descending order based on the new dates
const ARTICLES = ARTICLES_RAW.sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()).map((article, index) => ({
    ...article,
    featured: index === 0
}));

const CATEGORIES = ["All", 'Data Vis', 'Fintech', 'AI Interface', 'Creative Tech'];
const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" }
];

export default function CaseStudiesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    // Filter Logic
    const filteredArticles = ARTICLES.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || article.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime();
        } else if (sortBy === 'oldest') {
            return new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime();
        }
        return 0;
    });

    const featuredArticle = ARTICLES.find(a => a.featured);
    const otherArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

    return (
        <div className="min-h-screen bg-[#f9f6f1] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#F2F2ED]">
            <NavBar />

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">

                {/* Header Section */}
                <section className="mb-20 text-left max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]"
                    >
                        Case Studies
                        <br />
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest block mt-8 text-zinc-500 not-italic font-sans">
                            A deep dive into research, strategy, and execution.
                        </span>
                    </motion.h1>
                </section>

                {/* Search & Filter Section */}
                <section className="mb-20 pt-10 border-t border-[#111111]/10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-16">
                        {/* Search Input */}
                        <div className="flex-1 w-full md:max-w-md relative group">
                            <div className="relative flex items-center border-b border-[#111111]/20 py-2 focus-within:border-[#111111] transition-colors">
                                <span className="text-[10px] uppercase font-bold tracking-widest mr-4 text-zinc-500">Search</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent text-[#111111] text-sm md:text-base font-medium placeholder-zinc-400 focus:outline-none"
                                />
                                <Search className="w-5 h-5 text-[#111111]" />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end text-[10px] md:text-xs uppercase font-bold tracking-widest">
                            {/* Sort By */}
                            <div className="flex items-center gap-4 relative">
                                <span className="text-zinc-500">Sort by</span>
                                <div className="relative flex items-center">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-transparent pr-6 py-1 text-[#111111] hover:text-zinc-500 transition focus:outline-none cursor-pointer"
                                        aria-label="Sort articles"
                                    >
                                        {SORT_OPTIONS.map(option => (
                                            <option key={option.value} value={option.value} className="text-[#111111] bg-[#f9f6f1]">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="h-4 w-4 absolute right-0 pointer-events-none text-[#111111]" />
                                </div>
                            </div>

                            {/* Filter */}
                            <div className="flex items-center gap-4 relative">
                                <span className="text-zinc-500">Filter</span>
                                <div className="relative flex items-center">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="appearance-none bg-transparent pr-6 py-1 text-[#111111] hover:text-zinc-500 transition focus:outline-none cursor-pointer"
                                        aria-label="Filter articles"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat} className="text-[#111111] bg-[#f9f6f1]">
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="h-4 w-4 absolute right-0 pointer-events-none text-[#111111]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Article */}
                {selectedCategory === "All" && !searchQuery && featuredArticle && (
                    <Link href={`/case-studies/${featuredArticle.id}`}>
                        <section className="mb-32 cursor-pointer group">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Left Content */}
                                <div className="space-y-8 group-hover:opacity-80 transition-opacity order-2 md:order-1">
                                    <div className="flex flex-wrap gap-2">
                                        {featuredArticle.tags.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 rounded-full border border-zinc-300 text-[10px] font-bold uppercase tracking-widest text-[#111111] group-hover:bg-[#111111] group-hover:text-[#F2F2ED] transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] max-w-2xl pr-8">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-sm md:text-base text-zinc-600 font-medium leading-relaxed max-w-xl">
                                        {featuredArticle.excerpt}
                                    </p>
                                    
                                    <div className="space-y-6 pt-4">
                                        <div className="text-zinc-400 font-mono text-[10px]">
                                            {featuredArticle.date}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Image styled like the list items */}
                                <div className="relative w-full mx-auto md:ml-auto order-1 md:order-2">
                                    <motion.div
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative aspect-video w-full bg-white shadow-2xl overflow-hidden group border border-zinc-200"
                                    >
                                        <img
                                            src={featuredArticle.image}
                                            alt={featuredArticle.title}
                                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </section >
                    </Link>
                )}

                {/* Article List */}
                <section>
                    {selectedCategory !== "All" && (
                        <h2 className="text-[10px] uppercase tracking-widest font-bold mb-12 text-zinc-500 border-b border-[#111111]/10 pb-4">
                            Filtered By: {selectedCategory}
                        </h2>
                    )}

                    <div className="space-y-16">
                        {otherArticles.map((article, index) => (
                            <div key={article.id} className="relative">
                                <Link href={`/case-studies/${article.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center cursor-pointer"
                                    >
                                        {/* Date - Left Column */}
                                        <div className="md:col-span-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest pt-2">
                                            {article.date} <br/> No. {article.number}
                                        </div>

                                        {/* Thumbnail - Middle Column */}
                                        <div className="md:col-span-3">
                                            <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden border border-zinc-200 bg-white">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                                />
                                            </div>
                                        </div>

                                        {/* Content - Right Column */}
                                        <div className="md:col-span-7 flex flex-col items-start gap-4">
                                            <div className="flex justify-between w-full items-center">
                                                <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-[0.9] group-hover:opacity-70 transition-opacity">
                                                    {article.title}
                                                </h3>
                                                <ArrowRight className="w-6 h-6 text-[#111111] -rotate-45 group-hover:rotate-0 transition-transform duration-300 flex-shrink-0 ml-4" />
                                            </div>

                                            <p className="text-xs md:text-sm text-zinc-600 font-medium leading-relaxed max-w-2xl mt-2">
                                                {article.excerpt}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {article.tags.map((tag: string) => (
                                                    <span key={tag} className="px-3 py-1 rounded-full border border-zinc-200 text-[8px] font-bold uppercase tracking-widest text-[#111111]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                                {index !== otherArticles.length - 1 && (
                                    <hr className="mt-16 border-t border-zinc-200" />
                                )}
                            </div>
                        ))}
                    </div>

                    {otherArticles.length === 0 && (
                        <div className="text-center py-20 border-t border-[#111111]/10 mt-8">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">No projects found matching your criteria.</p>
                        </div>
                    )}
                </section>

            </main >
        </div >
    );
}