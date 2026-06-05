"use client";

import { useEffect, useRef, useCallback } from "react";

const SUBTLE_DARK_THEME_COLORS = [
    "#5582E4", // Muted Blue
    "#4FC0B3", // Muted Teal/Cyan
    "#9D7FEA", // Muted Purple
    "#E58C4C", // Muted Orange
    "#D96C6C", // Muted Red
    "#6A7B9D", // Desaturated Slate Blue
    "#70A9A1", // Another Muted Teal
    "#B88EBF", // Muted Lilac
];
const SHAPE_TYPES = ["circle", "square", "triangle", "rectangle"];
const NUM_SHAPES = 20;
const NUM_PARTICLES_MAX = 100;

class Shape {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 30 + 20;
        this.baseSize = this.size;
        this.color =
            SUBTLE_DARK_THEME_COLORS[
                Math.floor(Math.random() * SUBTLE_DARK_THEME_COLORS.length)
            ];

        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;

        this.pulseFactor = 1;
        this.pulseSpeed = Math.random() * 0.005 + 0.0025;
        this.pulseDirection = 1;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = this.color;
        ctx.beginPath();

        const currentSize = this.baseSize * this.pulseFactor;

        switch (this.type) {
            case "circle":
                ctx.arc(0, 0, currentSize / 2, 0, Math.PI * 2);
                break;
            case "square":
                ctx.rect(
                    -currentSize / 2,
                    -currentSize / 2,
                    currentSize,
                    currentSize
                );
                break;
            case "triangle":
                ctx.moveTo(0, -currentSize / 1.5);
                ctx.lineTo(currentSize / 1.5, currentSize / 3);
                ctx.lineTo(-currentSize / 1.5, currentSize / 3);
                ctx.closePath();
                break;
            case "rectangle":
                ctx.rect(
                    -currentSize * 0.75,
                    -currentSize / 2,
                    currentSize * 1.5,
                    currentSize
                );
                break;
        }
        ctx.fill();
        ctx.restore();
    }

    update(mousePos) {
        // Floating
        this.x += this.vx;
        this.y += this.vy;

        // Boundary check (wrap around)
        if (this.x > this.canvasWidth + this.size) this.x = -this.size;
        else if (this.x < -this.size) this.x = this.canvasWidth + this.size;
        if (this.y > this.canvasHeight + this.size) this.y = -this.size;
        else if (this.y < -this.size) this.y = this.canvasHeight + this.size;

        // Rotation
        this.angle += this.rotationSpeed;

        // Pulsing
        this.pulseFactor += this.pulseSpeed * this.pulseDirection;
        if (this.pulseFactor > 1.3 || this.pulseFactor < 0.7) {
            this.pulseDirection *= -1;
            this.pulseFactor += this.pulseSpeed * this.pulseDirection;
        }

        // Mouse interaction
        if (mousePos.x !== undefined && mousePos.y !== undefined) {
            const dxMouse = this.x - mousePos.x;
            const dyMouse = this.y - mousePos.y;
            const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            const interactionRadius = 120;

            if (distance < interactionRadius) {
                const force =
                    (interactionRadius - distance) / interactionRadius;
                this.x += (dxMouse / distance) * force * 1.5; // Repel
                this.y += (dyMouse / distance) * force * 1.5;
            }
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5; // Small sparkle
        this.color = color;
        this.life = 1;
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.fadeSpeed;
        return this.life > 0;
    }
}

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const mousePosition = useRef({ x: undefined, y: undefined });
    const shapesRef = useRef([]);
    const particlesRef = useRef([]);
    const animationFrameId = useRef(null);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        shapesRef.current = [];
        for (let i = 0; i < NUM_SHAPES; i++) {
            shapesRef.current.push(new Shape(canvas.width, canvas.height));
        }
        particlesRef.current = [];
    }, []);

    const drawRadialGradient = useCallback((ctx, width, height) => {
        const centerX = width / 2;
        const centerY = height / 2;
        const outerRadius = Math.max(width, height) * 0.7;

        const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            outerRadius
        );
        gradient.addColorStop(0, "rgba(45, 55, 75, 0.1)");
        gradient.addColorStop(0.3, "rgba(30, 40, 60, 0.3)");
        gradient.addColorStop(0.6, "rgba(20, 30, 50, 0.5)");
        gradient.addColorStop(1, "rgba(10, 15, 30, 0.7)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) {
            animationFrameId.current = requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Draw radial gradient for depth (behind shapes)
        drawRadialGradient(ctx, canvas.width, canvas.height);

        // Update and draw shapes
        shapesRef.current.forEach((shape) => {
            shape.update(mousePosition.current);
            shape.draw(ctx);
        });

        // Update, draw, and manage particles
        particlesRef.current = particlesRef.current.filter((particle) =>
            particle.update()
        );
        particlesRef.current.forEach((particle) => particle.draw(ctx));

        // Occasionally add new particles
        if (
            particlesRef.current.length < NUM_PARTICLES_MAX &&
            Math.random() < 0.2
        ) {
            const randomShape =
                shapesRef.current[
                    Math.floor(Math.random() * shapesRef.current.length)
                ];
            if (randomShape) {
                particlesRef.current.push(
                    new Particle(
                        randomShape.x,
                        randomShape.y,
                        randomShape.color
                    )
                );
            }
        }

        animationFrameId.current = requestAnimationFrame(animate);
    }, [drawRadialGradient]);

    useEffect(() => {
        initCanvas(); // Initialize on mount

        const handleMouseMove = (event) => {
            mousePosition.current = { x: event.clientX, y: event.clientY };
        };

        const handleResize = () => {
            initCanvas();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [initCanvas, animate]); // Add animate here

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            ß="true"
        />
    );
};

export default AnimatedBackground;
