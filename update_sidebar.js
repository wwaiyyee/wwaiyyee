const fs = require('fs');

const path = 'app/work/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldStr = `                                    {/* Description */}
                                    <div className="space-y-4">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block">
                                                    Role / Summary
                                            </label>
                                            <p className="text-[11px] leading-relaxed text-zinc-500 font-light">
                                                    {activeProject.summary}
                                            </p>
                                    </div>

                                    {/* Details */}`;

const newStr = `                                    {/* Description */}
                                    <div className="space-y-4">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block">
                                                    Role / Summary
                                            </label>
                                            <p className="text-[11px] leading-relaxed text-zinc-500 font-light">
                                                    {activeProject.summary}
                                            </p>
                                    </div>

                                    {/* Specific Image Description for index > 0 */}
                                    {activeProject.imageIndex > 0 && activeProject.currentDescription && (
                                            <div className="space-y-4 animate-fade-in-up">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block">
                                                            Slide Info
                                                    </label>
                                                    <p className="text-[11px] leading-relaxed text-zinc-500 font-light italic">
                                                            {activeProject.currentDescription}
                                                    </p>
                                            </div>
                                    )}

                                    {/* Details */}`;

content = content.replace(oldStr, newStr);

fs.writeFileSync(path, content);
