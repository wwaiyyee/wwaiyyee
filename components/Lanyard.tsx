/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Lightformer } from '@react-three/drei';
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

// ── Modal Wrapper ─────────────────────────────────────────────────────────────
interface LanyardModalProps {
    open: boolean;
    onClose: () => void;
}

export function LanyardModal({ open, onClose }: LanyardModalProps) {
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center"
            style={{ background: 'rgba(10,10,10,0.80)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-8 text-white/60 hover:text-white text-3xl font-light transition-colors z-10"
                aria-label="Close"
            >
                ×
            </button>

            {/* Hint */}
            <p className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 pointer-events-none">
                drag the card
            </p>

            {/* 3D Canvas — stop click propagation so dragging doesn't close */}
            <div className="w-full h-full" onClick={e => e.stopPropagation()}>
                <Lanyard />
            </div>
        </div>
    );
}

// ── Lanyard Scene ─────────────────────────────────────────────────────────────
function Lanyard() {
    const [isMobile, setIsMobile] = useState<boolean>(
        () => typeof window !== 'undefined' && window.innerWidth < 768
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 26], fov: 22 }}
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ alpha: true }}
            onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
        >
            <ambientLight intensity={Math.PI} />
            <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
                <Band isMobile={isMobile} />
            </Physics>
            <Environment blur={0.75}>
                <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
            </Environment>
        </Canvas>
    );
}

// ── Card Canvas Texture ───────────────────────────────────────────────────────
function useCardTexture() {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

    useEffect(() => {
        const W = 512, H = 720;
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d')!;

        const draw = (img?: HTMLImageElement) => {
            // Background
            ctx.fillStyle = '#F2F2ED';
            ctx.fillRect(0, 0, W, H);

            // Top color bar (beige-dark accent)
            ctx.fillStyle = '#111111';
            ctx.fillRect(0, 0, W, 12);

            // Red left stripe (like the developer log)
            ctx.fillStyle = '#d73a3a';
            ctx.fillRect(0, 0, 12, H);

            // Bottom bar
            ctx.fillStyle = '#111111';
            ctx.fillRect(0, H - 12, W, 12);

            // Clip hole at top center
            ctx.beginPath();
            ctx.arc(W / 2, 36, 16, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#c0c0c0';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Photo circle
            const photoX = W / 2, photoY = 180, photoR = 90;
            ctx.save();
            ctx.beginPath();
            ctx.arc(photoX, photoY, photoR, 0, Math.PI * 2);
            ctx.clip();
            if (img) {
                ctx.drawImage(img, photoX - photoR, photoY - photoR, photoR * 2, photoR * 2);
            } else {
                // placeholder silhouette
                ctx.fillStyle = '#c4c4c4';
                ctx.fillRect(photoX - photoR, photoY - photoR, photoR * 2, photoR * 2);
            }
            ctx.restore();
            // Photo border
            ctx.beginPath();
            ctx.arc(photoX, photoY, photoR + 2, 0, Math.PI * 2);
            ctx.strokeStyle = '#d73a3a';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Name
            ctx.fillStyle = '#111111';
            ctx.font = 'bold 36px Georgia, serif';
            ctx.textAlign = 'center';
            ctx.fillText('Chloe Lee', W / 2, 300);

            // Role
            ctx.font = '15px "Courier New", monospace';
            ctx.fillStyle = '#555';
            ctx.fillText('SOFTWARE DEVELOPER  /  UI/UX DESIGNER', W / 2, 330);

            // Separator line
            ctx.strokeStyle = '#d73a3a';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(60, 355); ctx.lineTo(W - 60, 355);
            ctx.stroke();

            // Batch label
            ctx.font = '11px "Courier New", monospace';
            ctx.fillStyle = '#999';
            ctx.textAlign = 'center';
            ctx.fillText('BATCH NO. 2026-X  ·  ISO: 400', W / 2, 380);

            // GitHub label
            ctx.font = 'bold 14px "Courier New", monospace';
            ctx.fillStyle = '#111';
            ctx.textAlign = 'left';
            ctx.fillText('GH ', 80, 440);
            ctx.font = '14px "Courier New", monospace';
            ctx.fillStyle = '#d73a3a';
            ctx.fillText('github.com/wwaiyyee', 122, 440);

            // LinkedIn label
            ctx.font = 'bold 14px "Courier New", monospace';
            ctx.fillStyle = '#111';
            ctx.fillText('LI ', 80, 475);
            ctx.font = '14px "Courier New", monospace';
            ctx.fillStyle = '#d73a3a';
            ctx.fillText('linkedin.com/in/lee-wai-yee', 122, 475);

            // Bottom watermark
            ctx.font = '10px "Courier New", monospace';
            ctx.fillStyle = '#bbb';
            ctx.textAlign = 'center';
            ctx.fillText('PROCESS: C-41  ·  ANALOG PORTFOLIO', W / 2, 560);

            // ID number
            ctx.font = '9px "Courier New", monospace';
            ctx.fillStyle = '#ccc';
            ctx.fillText('ID-2026-WY-001', W / 2, 580);

            const tex = new THREE.CanvasTexture(canvas);
            tex.needsUpdate = true;
            setTexture(tex);
        };

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => draw(img);
        img.onerror = () => draw();
        img.src = '/resume.jpeg';
    }, []);

    return texture;
}

// ── Band (physics rope + card) ────────────────────────────────────────────────
interface BandProps {
    maxSpeed?: number;
    minSpeed?: number;
    isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps: any = {
        type: 'dynamic',
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4,
    };

    const { nodes } = useGLTF('/card.glb') as any;
    const cardTexture = useCardTexture();

    // Lanyard stripe texture
    const lanyardTexture = useMemo(() => {
        const c = document.createElement('canvas');
        c.width = 64; c.height = 256;
        const ctx = c.getContext('2d')!;
        for (let y = 0; y < 256; y += 16) {
            ctx.fillStyle = y % 32 === 0 ? '#d73a3a' : '#111111';
            ctx.fillRect(0, y, 64, 16);
        }
        const t = new THREE.CanvasTexture(c);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        return t;
    }, []);

    const [curve] = useState(
        () => new THREE.CatmullRomCurve3([
            new THREE.Vector3(), new THREE.Vector3(),
            new THREE.Vector3(), new THREE.Vector3(),
        ])
    );
    const [dragged, drag] = useState<false | THREE.Vector3>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => { document.body.style.cursor = 'auto'; };
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged && typeof dragged !== 'boolean') {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }
        if (fixed.current) {
            [j1, j2].forEach(ref => {
                if (!ref.current.lerped)
                    ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(
                    0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
                );
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    curve.curveType = 'chordal';

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type="dynamic">
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type="dynamic">
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type="dynamic">
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={3.0}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e: any) => {
                            e.target.releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e: any) => {
                            e.target.setPointerCapture(e.pointerId);
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
                        }}
                    >
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                map={cardTexture ?? undefined}
                                color={cardTexture ? '#ffffff' : '#f0f0ea'}
                                clearcoat={isMobile ? 0 : 0.8}
                                clearcoatRoughness={0.2}
                                roughness={0.8}
                                metalness={0.1}
                            />
                        </mesh>
                        <mesh geometry={nodes.clip.geometry}>
                            <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.2} />
                        </mesh>
                        <mesh geometry={nodes.clamp.geometry}>
                            <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.2} />
                        </mesh>
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                {/* @ts-expect-error meshline */}
                <meshLineGeometry />
                {/* @ts-expect-error meshline */}
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={isMobile ? [1000, 2000] : [1000, 1000]}
                    useMap
                    map={lanyardTexture}
                    repeat={[-4, 1]}
                    lineWidth={1.2}
                />
            </mesh>
        </>
    );
}
