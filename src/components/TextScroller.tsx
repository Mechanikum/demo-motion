import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {cn} from "@/lib/utils.ts";

interface TextScrollerProps {
    text: string;
    direction?: "ltr" | "rtl"
}

const TextScroller: React.FC<TextScrollerProps> = ({ text, direction = "ltr" }) => {
    const containerRef = useRef<HTMLUListElement | null>(null);
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [itemText, setItemText] = useState(text);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const child = containerRef.current!.children[0] as HTMLLIElement;

                if (child) {
                    // Calculate the width of the item
                    setItemWidth(child.offsetWidth);
                }
            }
        };

        const fillContainerWithText = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const child = containerRef.current!.children[0] as HTMLLIElement;

                if (child) {
                    // Get the computed font size of the text element
                    const fontSize = window.getComputedStyle(child).fontSize;

                    // Convert font size to pixels
                    const fontSizeInPixels = parseFloat(fontSize);

                    // Approximate text width based on font size (assuming average character width is about 0.6 * font size)
                    const textWidth = fontSizeInPixels * 0.55 * text.length - 1;

                    // Calculate how many times to repeat the text
                    const repeatCount = Math.ceil(containerWidth / textWidth);
                    setItemText(text.repeat(repeatCount));
                }
            }
        };

        // Set initial width and fill container with text
        updateWidth();
        fillContainerWithText();

        // Update width and text on window resize
        window.addEventListener('resize', () => {
            updateWidth();
            fillContainerWithText();
        });

        return () => window.removeEventListener('resize', () => {
            updateWidth();
            fillContainerWithText();
        });
    }, [text, containerRef.current?.offsetWidth]);

    // Ensure travel distance is at least the itemWidth
    const travel = itemWidth > 0 ? itemWidth : 0;
    const speed = 1

    return (
        <ul className={cn("flex w-full", direction === "ltr" ? "flex-row-reverse" : "flex-row")} ref={containerRef}>
            <motion.li
                initial={{ x: 0 }}
                animate={{ x: direction === "ltr" ? travel : -travel }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop'
                }}
                className="whitespace-nowrap"
            >
                {text}
            </motion.li>
            <motion.li
                initial={{ x: 0 }}
                animate={{ x: direction === "ltr" ? travel : -travel }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop'
                }}
                className="whitespace-nowrap"
            >
                {itemText}
            </motion.li>
        </ul>
    );
};

export default TextScroller;
