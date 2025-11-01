import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

const Particles = ({ count = 200 }) => {
    const mesh = useRef();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const particleCount = isMobile ? 30 : count;

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < particleCount; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 10,
                    Math.random() * 10 + 5,
                    (Math.random() - 0.5) * 10,
                ],
                speed: 0.010 + Math.random() * 0.001,
            });
        }
        return temp;
    }, [particleCount]);

    useFrame(() => {
        if (!mesh.current) return;
        const positions = mesh.current.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            let y = positions[i * 3 + 1];
            y -= particles[i].speed;
            if (y < -2) y = Math.random() * 10 + 5;
            positions[i * 3 + 1] = y;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    const positions = new Float32Array(particleCount * 3);
    particles.forEach((p, i) => {
        positions[i * 3] = p.position[0];
        positions[i * 3 + 1] = p.position[1];
        positions[i * 3 + 2] = p.position[2];
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={isMobile ? 0.08 : 0.05}
                transparent
                opacity={isMobile ? 0.6 : 0.9}
                depthWrite={false}
                sizeAttenuation={true}
            />
        </points>
    );
};

export default Particles;