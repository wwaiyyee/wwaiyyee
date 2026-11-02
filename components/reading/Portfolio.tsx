"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Moon, Volume2, VolumeX, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { chapters, findProject, interests, profile, projects, type PortfolioProject } from "@/data/portfolio";
import type { ReadingSceneState } from "./ReadingScene";
import HeroArtwork from "./HeroArtwork";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const ReadingScene = dynamic(() => import("./ReadingScene"), { ssr: false });
const sectionNames = ["home", "about", "work", "connect"] as const;


export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const home = useRef<HTMLElement>(null);
  const work = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const story = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const triggerButton = useRef<HTMLElement | null>(null);
  const projectScroll = useRef<number | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const scene = useRef<ReadingSceneState>({ phase: 0, work: 0, chapter: 0, burst: 0, velocity: 0, paused: false });
  const [motion, setMotion] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [chapter, setChapter] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("reading-motion"); } catch {}
      setMotion(saved ? saved === "full" : !preference.matches);
    };
    update(); preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const sync = () => {
      const project = findProject(new URLSearchParams(location.search).get("project"));
      setActiveProject(project ?? null); setGalleryIndex(0);
      if (project) setActiveIndex(projects.indexOf(project));
      else if (projectScroll.current !== null) {
        const top = projectScroll.current; projectScroll.current = null;
        requestAnimationFrame(() => {
          if (lenis.current) lenis.current.scrollTo(top, { immediate: true });
          else window.scrollTo({ top, behavior: "instant" });
          triggerButton.current?.focus({ preventScroll: true });
        });
      }
    };
    sync(); window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    const sections = sectionNames.map(name => document.getElementById(name)).filter((element): element is HTMLElement => Boolean(element));
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * .42;
      const passed = sections.map(section => ({ id: section.id, top: section.getBoundingClientRect().top }))
        .filter(section => section.top <= marker).sort((a, b) => b.top - a.top);
      setActiveSection(passed[0]?.id ?? "home");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  useEffect(() => {
    if (!motion || !window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) return;
    const scroller = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false, anchors: false, prevent: node => Boolean(node.closest("[data-lenis-prevent]")) });
    lenis.current = scroller; scroller.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => scroller.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); scroller.destroy(); lenis.current = null; };
  }, [motion]);

  useGSAP(() => {
    if (!motion) { scene.current.phase = 0; return; }
    const media = gsap.matchMedia();
    gsap.from(".hero-intro .intro-line", { y: 12, opacity: 0, duration: .95, stagger: .09, ease: "power2.out", delay: .1 });
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
      gsap.from(element, { y: 20, opacity: 0, duration: .8, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
    });
    let anchors = { story: 0, work: 0, workEnd: 0, skills: 0, about: 0, connect: 0 };
    const measure = () => {
      const top = (id: string) => { const element = document.getElementById(id); return element ? element.getBoundingClientRect().top + window.scrollY : 0; };
      anchors = { story: top("introduction"), work: top("work"), workEnd: top("work") + (work.current?.offsetHeight ?? 0) - innerHeight, skills: top("perspectives"), about: top("about"), connect: top("connect") };
    };
    const unit = (value: number, start: number, end: number) => gsap.utils.clamp(0, 1, (value - start) / Math.max(1, end - start));
    const goPhase = gsap.quickTo(scene.current, "phase", { duration: .48, ease: "power2.out" });
    const updatePhase = () => {
      const y = window.scrollY;
      let phase = unit(y, 0, anchors.story);
      if (y >= anchors.story) phase = 1 + unit(y, anchors.story + innerHeight * .45, anchors.work);
      if (y >= anchors.work) phase = 2 + .16 * unit(y, anchors.work, anchors.workEnd);
      if (y >= anchors.workEnd) phase = 2.16 + .84 * unit(y, anchors.workEnd, anchors.skills - innerHeight * .1);
      if (y >= anchors.skills + innerHeight * .2) phase = 3 + unit(y, anchors.skills + innerHeight * .2, anchors.about - innerHeight * .15);
      if (y >= anchors.about) phase = 4 + .4 * unit(y, anchors.about, anchors.connect - innerHeight * .75);
      if (y >= anchors.connect - innerHeight * .75) phase = 4.4 + .6 * unit(y, anchors.connect - innerHeight * .75, anchors.connect - innerHeight * .12);
      goPhase(phase);
    };
    measure();
    ScrollTrigger.create({ start: 0, end: () => ScrollTrigger.maxScroll(window), onUpdate: self => { updatePhase(); scene.current.velocity = gsap.utils.clamp(-1, 1, self.getVelocity() / 2000); }, onRefresh: () => { measure(); updatePhase(); } });
    updatePhase();
    media.add("(min-width: 900px)", () => {
      gsap.to(".hero-intro", { y: -60, opacity: 0, ease: "none", scrollTrigger: { trigger: home.current, start: "top top", end: "40% top", scrub: .65 } });
      gsap.to(".hero-art-fallback, .hero-bottom", { opacity: 0, ease: "none", scrollTrigger: { trigger: home.current, start: "top top", end: "30% top", scrub: .5 } });
      const words = gsap.utils.toArray<HTMLElement>(".narrative-word");
      gsap.fromTo(words, { color: "#c8bfc0" }, { color: "#2d2729", stagger: .055, ease: "none", scrollTrigger: { trigger: "#introduction", start: "top 35%", end: "65% 40%", scrub: .6 } });
      gsap.fromTo(words, { y: 15, rotationX: 55, opacity: .2, filter: "blur(3px)" }, { y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", stagger: .025, ease: "none", scrollTrigger: { trigger: "#introduction", start: "top 50%", end: "55% 45%", scrub: .65 } });
      gsap.fromTo(".narrative-copy", { y: 45, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: "#introduction", start: "top 75%", end: "top 25%", scrub: .6 } });
      gsap.to(".narrative-copy, .narrative-note", { y: -75, opacity: 0, scrollTrigger: { trigger: "#introduction", start: "65% top", end: "bottom top", scrub: .6 } });
      const planes = gsap.utils.toArray<HTMLElement>(".project-plane");
      const slots = [
        { x: -.77, y: .37, z: 200, ry: 24, rz: -7 },
        { x: -.51, y: .28, z: 145, ry: 20, rz: -7 },
        { x: -.40, y: .02, z: -540, ry: 14, rz: -5 },
        { x: 0, y: 0, z: 0, ry: -16, rz: 6.5 },
        { x: .32, y: -.19, z: -350, ry: -18, rz: -4 },
        { x: .59, y: -.43, z: -850, ry: -20, rz: -5 },
        { x: .82, y: -.5, z: -1200, ry: -25, rz: -8 },
      ];
      let previous = -1;
      const draw = (progress: number) => {
        const cursor = progress * (projects.length - 1); scene.current.work = progress;
        planes.forEach((plane, index) => {
          const raw = index - cursor;
          const delta = ((raw + projects.length * 1.5) % projects.length) - projects.length / 2;
          const lower = Math.floor(delta), fraction = delta - lower;
          const t = fraction * fraction * (3 - 2 * fraction);
          const a = slots[Math.max(0, Math.min(6, lower + 3))], b = slots[Math.max(0, Math.min(6, lower + 4))];
          const blend = (key: keyof typeof a) => a[key] + (b[key] - a[key]) * t;
          const distance = Math.abs(delta);
          gsap.set(plane, { xPercent: -50, yPercent: -50, x: blend("x") * innerWidth, y: blend("y") * innerHeight, z: blend("z"), rotationY: blend("ry"), rotationZ: blend("rz"), autoAlpha: 1 - gsap.utils.clamp(0, 1, (distance - 2.1) / .36), zIndex: Math.round(1000 + blend("z")) });
          plane.inert = distance > .6;
        });
        const next = Math.max(0, Math.min(projects.length - 1, Math.round(cursor)));
        if (next !== previous) { previous = next; setActiveIndex(next); }
      };
      const projectTrigger = ScrollTrigger.create({ trigger: work.current, start: "top top", end: "bottom bottom", onUpdate: self => draw(self.progress), onRefresh: self => draw(self.progress), invalidateOnRefresh: true });
      draw(projectTrigger.progress);
      gsap.fromTo(".project-spread", { opacity: 0, scale: .7, y: 160, rotationX: 12, rotationY: -14 }, { opacity: 1, scale: 1, y: 0, rotationX: 0, rotationY: 0, scrollTrigger: { trigger: work.current, start: "top 85%", end: "top top", scrub: .8 } });
      gsap.to(".project-spread", { scale: .83, rotationY: 9, opacity: 0, scrollTrigger: { trigger: work.current, start: "bottom bottom", end: "bottom 10%", scrub: .7 } });
      gsap.fromTo(".work-intro", { y: 35, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: work.current, start: "top 60%", end: "top top", scrub: .65 } });
      gsap.fromTo(".capability-word", { opacity: .08, x: -60, y: 55, rotationX: -35, filter: "blur(5px)" }, { opacity: 1, x: 0, y: 0, rotationX: 0, filter: "blur(0px)", stagger: .2, scrollTrigger: { trigger: "#perspectives", start: "top 55%", end: "65% 65%", scrub: .8 } });
      gsap.to(".capability-stage h2, .capability-stage>p", { y: -90, opacity: 0, scrollTrigger: { trigger: "#perspectives", start: "75% top", end: "bottom top", scrub: .65 } });
      gsap.from(".about-visual img", { clipPath: "inset(15% 15% 15% 15%)", opacity: 0, scale: .92, duration: 1.4, stagger: .18, ease: "power3.out", scrollTrigger: { trigger: ".about-visual", start: "top 90%", once: true } });
      gsap.to(".about-portrait", { y: -55, rotation: 1.5, ease: "none", scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".about-memory", { y: 45, rotation: -3, ease: "none", scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 1.1 } });
      gsap.from(".connect-labels span:first-child", { x: -65, opacity: 0, scrollTrigger: { trigger: "#connect", start: "top 65%", end: "top top", scrub: .9 } });
      gsap.from(".connect-labels span:last-child", { x: 65, opacity: 0, scrollTrigger: { trigger: "#connect", start: "top 65%", end: "top top", scrub: .9 } });
      return () => { planes.forEach(plane => { plane.inert = false; }); };
    });
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });

  useGSAP(() => {
    scene.current.chapter = chapter;
    if (motion && story.current) gsap.fromTo(story.current, { y: 8, opacity: .3 }, { y: 0, opacity: 1, duration: .4, ease: "power2.out" });
  }, { scope: root, dependencies: [chapter], revertOnUpdate: true });

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!activeProject) { if (element.open) element.close(); return; }
    if (!element.open) element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden"; lenis.current?.stop(); scene.current.paused = true;
    return () => { document.body.style.overflow = previous; lenis.current?.start(); scene.current.paused = false; if (element.open) element.close(); triggerButton.current?.focus({ preventScroll: true }); };
  }, [activeProject]);

  useEffect(() => () => { void audio.current?.close(); }, []);

  const scrollTo = useCallback((target: string | number) => {
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.15 });
    else if (typeof target === "number") window.scrollTo({ top: target, behavior: motion ? "smooth" : "instant" });
    else document.querySelector(target)?.scrollIntoView({ behavior: motion ? "smooth" : "instant" });
  }, [motion]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, name: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); history.pushState(null, "", `#${name}`); scrollTo(`#${name}`);
  };
  const selectProject = (index: number) => {
    setActiveIndex(index);
    if (motion && window.matchMedia("(min-width: 900px)").matches && work.current) {
      const top = work.current.getBoundingClientRect().top + window.scrollY;
      scrollTo(top + index / (projects.length - 1) * (work.current.offsetHeight - window.innerHeight));
    } else scrollTo(`#project-${projects[index].id}`);
  };
  const openProject = (project: PortfolioProject, target: HTMLElement) => {
    triggerButton.current = target;
    projectScroll.current = window.scrollY;
    const url = new URL(location.href); url.searchParams.set("project", project.id); url.hash = "work";
    history.pushState({ readingProject: true }, "", url); setGalleryIndex(0); setActiveProject(project);
  };
  const closeProject = () => {
    if (history.state?.readingProject) history.back();
    else { const url = new URL(location.href); url.searchParams.delete("project"); history.replaceState(null, "", url); setActiveProject(null); }
  };
  const toggleMotion = () => {
    const next = !motion; setMotion(next);
    try { localStorage.setItem("reading-motion", next ? "full" : "reduced"); } catch {}
    setStatus(next ? "Full motion enabled." : "Reduced motion enabled.");
  };
  const toggleSound = async () => {
    if (soundOn) { await audio.current?.close(); audio.current = null; setSoundOn(false); return; }
    try {
      const context = new AudioContext(); audio.current = context;
      const volume = context.createGain(); volume.gain.value = .012; volume.connect(context.destination);
      [130.81, 196, 261.63].forEach(frequency => { const oscillator = context.createOscillator(); oscillator.frequency.value = frequency; oscillator.type = "sine"; oscillator.connect(volume); oscillator.start(); });
      await context.resume(); setSoundOn(true);
    } catch { setStatus("Sound is unavailable in this browser."); }
  };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setStatus("Email address copied."); window.setTimeout(() => setCopied(false), 2400); }
    catch { setStatus(`You can select and copy ${profile.email}.`); }
  };
  const tilt = (event: MouseEvent<HTMLButtonElement>) => {
    if (!motion || !window.matchMedia("(pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tilt-x", `${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 5}deg`);
  };

  return (
    <div ref={root} className="portfolio" data-motion={motion === false ? "reduced" : "full"} data-enhanced={motion !== null}>
      <a className="skip-link" href="#about">Skip the visual introduction</a>
      <header className="site-header">
        <a href="#home" className="site-mark" aria-label="Wai Yee — home" onClick={event => navigate(event, "home")}><Moon size={25} strokeWidth={1.15} /></a>
        <nav className="primary-nav" id="primary-navigation" aria-label="Main navigation">{sectionNames.map(name => <a key={name} href={`#${name}`} aria-current={activeSection === name ? "location" : undefined} onClick={event => navigate(event, name)}>{name}</a>)}</nav>

      </header>
      <ReadingScene state={scene} motion={motion === true} />
      <main>
        <section ref={home} id="home" className="home-section" aria-labelledby="home-title"><div className="home-stage">
          <div className="hero-art-fallback" aria-hidden="true"><HeroArtwork /></div>
          <div className="hero-intro"><h1 id="home-title"><span className="intro-line">Wai Yee — building digital experiences</span><span className="intro-line">with logic, curiosity & intuition.</span></h1></div>
          <div className="hero-bottom"><span className="micro">01 — the reading</span><a className="scroll-cue" href="#introduction" onClick={event => navigate(event, "introduction")}><span>scroll to explore</span><ArrowDown size={17} strokeWidth={1} /></a><button type="button" className="stir-particles micro" onClick={() => { scene.current.burst += 1; }} disabled={motion !== true}>stir the particles <span aria-hidden="true">↗</span></button></div>
        </div></section>

        <section id="introduction" className="narrative-section" aria-label="Introduction"><div className="narrative-stage"><p className="narrative-copy">{"I’m an AI graduate and aspiring software engineer, exploring the space between intelligent systems, thoughtful software, and human curiosity. I build with code, make room for intuition, and find new perspectives through tarot, travel, and photography.".split(" ").map((word, index) => <span className="narrative-word" key={index}>{word}{" "}</span>)}</p><p className="narrative-note micro">AI by training. Curious by nature.</p></div></section>

        <section ref={work} id="work" className="work-section" aria-labelledby="work-title"><div className="work-stage">
          <div className="work-intro"><h2 id="work-title">Selected work,<br />drawn from curiosity.</h2><div className="work-current" aria-live="polite"><span className="micro">{projects[activeIndex].number} / {String(projects.length).padStart(2, "0")} — {projects[activeIndex].title}</span></div></div>
          <div className="project-spread">{projects.map((project, index) => <article id={`project-${project.id}`} key={project.id} className={`project-plane ${activeIndex === index ? "is-selected" : ""}`}><div className="project-surface">
            <button type="button" className="plane-art" aria-label={`View ${project.title} project details`} onClick={event => openProject(project, event.currentTarget)} onMouseMove={tilt} onMouseLeave={event => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); }}><Image src={project.images[0].src} alt={project.images[0].alt} width={1440} height={900} sizes="(max-width: 700px) 92vw, (max-width: 899px) 46vw, 50vw" loading="lazy" /><span className="plane-open"><ArrowUpRight size={19} strokeWidth={1.3} /></span></button>
            <div className="plane-caption"><div><h3>{project.title}</h3><p>{project.category}</p></div><button type="button" className="text-link" onClick={event => openProject(project, event.currentTarget)}>view project <ArrowUpRight size={12} /></button></div><p className="mobile-project-summary">{project.summary}</p>
          </div></article>)}</div>
          <nav className="project-index" aria-label="Select a featured project"><button className="icon-button project-previous" type="button" aria-label="Previous project" disabled={activeIndex === 0} onClick={() => selectProject(activeIndex - 1)}><ArrowLeft size={16} /></button>{projects.map((project, index) => <button type="button" key={project.id} aria-current={activeIndex === index ? "true" : undefined} onClick={() => selectProject(index)}><span className="project-index-number">{project.number}</span>{project.title}</button>)}<button className="icon-button project-next" type="button" aria-label="Next project" disabled={activeIndex === projects.length - 1} onClick={() => selectProject(activeIndex + 1)}><ArrowRight size={16} /></button></nav>
          <span className="work-scroll-note" aria-hidden="true"><ArrowDown size={20} strokeWidth={1} /></span>
        </div></section>

        <section id="perspectives" className="capability-section" aria-label="Areas of interest"><div className="capability-stage"><span className="micro">different tools. the same curiosity.</span><h2><span className="capability-word">Artificial intelligence.</span><span className="capability-word">Software engineering.</span><span className="capability-word">Human curiosity.</span></h2><p>Models, systems, and the ideas that connect them.</p></div></section>

        <section id="about" className="about-section section-shell" aria-labelledby="about-title">
          <div className="section-label" data-reveal><span>the person behind the projects</span><span>Kuala Lumpur, Malaysia</span></div>
          <div className="about-layout"><div className="about-copy">
            <h2 id="about-title" data-reveal>A little about me.</h2>
            <p className="about-introduction" data-reveal>I’m a First Class AI graduate from Taylor’s University, drawn to building production-ready AI and software that solves real problems. My recent work with TNG Digital’s Applied AI team took me into computer vision and eKYC systems—from document and landmark detection to training, evaluating, and optimising models.</p>
            <div className="chapter-tabs" role="tablist" aria-label="Different sides of Wai Yee" data-reveal>{chapters.map((item, index) => <button type="button" role="tab" key={item.id} id={`tab-${item.id}`} aria-controls="personal-story" aria-selected={chapter === index} onClick={() => setChapter(index)} onKeyDown={event => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (chapter + (event.key === "ArrowRight" ? 1 : 2)) % 3; setChapter(next); document.getElementById(`tab-${chapters[next].id}`)?.focus(); }}>{item.label}</button>)}</div>
            <div ref={story} className="personal-story" role="tabpanel" id="personal-story" aria-labelledby={`tab-${chapters[chapter].id}`}><h3>{chapters[chapter].subtitle}</h3><p>{chapters[chapter].text}</p></div>
            <noscript><p>I also enjoy tarot reading, travel, and photography—other ways to stay curious and see from a different perspective.</p></noscript>
            <a className="text-link about-resume" href="/Resume.pdf" target="_blank" rel="noreferrer">Read my résumé <ArrowUpRight size={14} /></a>
          </div><div className="about-visual" data-reveal>
            <figure className="about-portrait"><Image src="/profile pic.jpeg" alt="Wai Yee at graduation, holding a bouquet beside a lake" width={800} height={800} sizes="(max-width: 700px) 72vw, 31vw" /><figcaption>Wai Yee, beyond the screen.</figcaption></figure>
            <figure className="about-memory"><Image src="/grp-photo/1-twinkle.jpg" alt="The Twinkle team together at a hackathon" width={1200} height={800} sizes="(max-width: 700px) 45vw, 20vw" /><figcaption>Making things, together.</figcaption></figure>
          </div></div>
          <div className="experience-grid">
            <article data-reveal><div className="experience-top"><span className="micro">01 / foundation</span><span className="micro">2026</span></div><h3>{profile.university}</h3><p className="experience-role">{profile.degree}</p><p className="experience-description">{profile.honours} · CGPA {profile.cgpa}<br />Dean’s List every semester.</p></article>
            <article data-reveal><div className="experience-top"><span className="micro">02 / in practice</span><span className="micro">Apr — Oct 2026</span></div><h3>TNG Digital</h3><p className="experience-role">AI Engineering Intern · Applied AI</p><p className="experience-description">Computer vision and eKYC systems, including document detection, classification, landmark detection, and model training, evaluation, and optimisation.</p></article>
          </div>
          <div className="interests-row" data-reveal><span className="micro">currently drawn to</span><p>{interests.map((interest, index) => <span key={interest}>{index > 0 && <span className="interest-divider" aria-hidden="true"> / </span>}{interest}</span>)}</p></div>
        </section>

        <section id="connect" className="connect-section" aria-labelledby="connect-title"><div className="contact-stage"><p className="contact-kicker micro">the next chapter</p><h2 id="connect-title" className="connect-labels"><span>AI.</span><span>Software.</span></h2><div className="contact-invitation"><p>Let’s build something worthwhile.</p><p className="micro">Open to full-time AI, software, backend & R&D roles.<br />{profile.availability} · remote or hybrid</p><button type="button" className="copy-email-button" onClick={copyEmail}>{copied ? "email copied" : "copy email"}{copied ? <Check size={12} /> : <Copy size={12} />}</button><a className="contact-address" href={`mailto:${profile.email}`}>{profile.email}</a></div><div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer">github <ArrowUpRight size={12} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin <ArrowUpRight size={12} /></a><a href="/Resume.pdf" target="_blank" rel="noreferrer">résumé <ArrowUpRight size={12} /></a><a href={`mailto:${profile.email}`}>say hello <ArrowUpRight size={12} /></a></div><footer className="site-footer"><span>© 2026 Lee Wai Yee</span><span>{profile.location}</span></footer></div></section>
      </main>
      <div className="experience-controls"><button type="button" onClick={toggleMotion} aria-pressed={motion === true}>motion {motion === false ? "reduced" : "on"}</button><span aria-hidden="true">/</span><button type="button" onClick={() => void toggleSound()} aria-pressed={soundOn}>{soundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}sound {soundOn ? "on" : "off"}</button></div>
      <div className="sr-only" role="status">{status}</div>
      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" data-lenis-prevent onCancel={event => { event.preventDefault(); closeProject(); }} onClick={event => { if (event.target === event.currentTarget) closeProject(); }}>
        {activeProject && <div className="project-dialog-content"><header className="dialog-header"><span className="micro">selected work / {activeProject.number}</span><button className="dialog-close text-link" type="button" onClick={closeProject}>close <X size={17} strokeWidth={1.3} /></button></header><div className="dialog-project-title"><div><p className="micro arcana-label">{activeProject.arcana}</p><h2 id="project-title">{activeProject.title}</h2></div><span className="micro">{activeProject.year}</span></div><p className="dialog-summary">{activeProject.summary}</p><dl className="project-facts"><div><dt>My role</dt><dd>{activeProject.role}</dd></div><div><dt>Tools & technologies</dt><dd>{activeProject.stack.join(" · ")}</dd></div></dl><p className="dialog-contribution">{activeProject.contribution}</p><div className="project-real-links">{activeProject.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-link">{link.label}<ArrowUpRight size={14} /></a>)}</div><figure className="detail-gallery"><Image src={activeProject.images[galleryIndex].src} alt={activeProject.images[galleryIndex].alt} width={1600} height={1000} sizes="(max-width: 700px) 95vw, 80vw" /><figcaption><span>{activeProject.images[galleryIndex].alt}</span><span className="gallery-controls"><button className="icon-button" type="button" aria-label="Previous screenshot" disabled={galleryIndex === 0} onClick={() => setGalleryIndex(galleryIndex - 1)}><ArrowLeft size={16} /></button><span className="micro">{galleryIndex + 1} / {activeProject.images.length}</span><button className="icon-button" type="button" aria-label="Next screenshot" disabled={galleryIndex === activeProject.images.length - 1} onClick={() => setGalleryIndex(galleryIndex + 1)}><ArrowRight size={16} /></button></span></figcaption></figure><div className="dialog-bottom"><span className="micro">A project from the collection.</span><button type="button" className="text-link" onClick={closeProject}>back to the collection <ArrowLeft size={13} /></button></div></div>}
      </dialog>
    </div>
  );
}
