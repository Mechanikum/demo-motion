import {useScroll, useTransform, motion} from "framer-motion";
import TextScroller from "@/components/TextScroller.tsx";
import {ChevronsDown} from "lucide-react";

function App() {
    const {scrollYProgress} = useScroll();
    const width = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], ["0%", "100%", "100%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], ["100%", "50%", "0%"]);

    const skewX = useTransform(scrollYProgress, [0, 0.2], ["-12deg", "12deg"]);
    const skewColor = useTransform(scrollYProgress, [0, 0.1, 0.2], ["#65a30d", "#f59e0b", "#dc2626"]);
    const textOffset = useTransform(scrollYProgress, [0, 0.22, 0.36], ["0%", "0%", "100%"]);

    const imageFrame = {
        width: useTransform(scrollYProgress, [0.36, 0.5, 0.7], ["0", "20%", "100%"]),
        height: useTransform(scrollYProgress, [0.36, 0.5, 0.7], ["0", "20%", "100%"]),
        rotate: useTransform(scrollYProgress, [0.36, 0.5, 0.7], ["0deg", "180deg", "360deg"]),
    }

    const imageCounterRotate = useTransform(scrollYProgress, [0.36, 0.5, 0.7], ["-0deg", "-180deg", "-360deg"]);

    const videoFrame = {
        width: useTransform(scrollYProgress, [0.55, 0.7, 1], ["0", "20%", "100%"]),
        height: useTransform(scrollYProgress, [0.55, 0.7, 1], ["0", "20%", "100%"]),
        skewX: useTransform(scrollYProgress, [0.55, 0.8, 1], ["-80deg", "-40deg", "0deg"])
    }

    const videoCounterSkewX = useTransform(scrollYProgress, [0.6, 0.8, 1], ["80deg", "40deg", "0deg"])

    const finishedScrollers = {
        opacity: useTransform(scrollYProgress, [0.8, 1], ["0", "100%"]),
        filter: useTransform(scrollYProgress, [0.8, 1], ["blur(10px)", "blur(0px)"]),
    }

    return (
        <div className="themes-wrapper bg-background relative z-0 flex min-h-[250vh] w-full">
            <div className="w-full fixed top-0 left-0">
                <motion.div style={{width}} className="bg-amber-500 relative overflow-hidden h-8 flex mx-auto">
                    <div className={"text-xl absolute left-1/2 -translate-x-1/2 uppercase font-mono mt-0.5 w-screen text-background font-semibold"}>
                        <TextScroller direction={"rtl"} text={"COOL_DEMO_"}/>
                    </div>
                </motion.div>
            </div>
            <div className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl uppercase overflow-hidden flex flex-row px-16"}>
                <motion.div
                    style={{right: textOffset}}
                    className={"relative pl-4 py-2 overflow-hidden"}
                >
                    <motion.div
                        style={{skewX: skewX, backgroundColor: skewColor}}
                        className={"absolute w-full h-full z-[-1] top-0 left-1.5 skew-x-12"}
                    />
                    <p>
                        I am here to bl
                    </p>
                </motion.div>
                <motion.div
                    style={{left: textOffset}}
                    className={"relative pr-4 py-2 overflow-hidden"}
                >
                    <motion.div
                        style={{skewX: skewX, backgroundColor: skewColor}}
                        className={"absolute w-full h-full z-[-1] top-0 right-1.5 skew-x-12"}
                    />
                    <p>
                        ow your mind
                    </p>
                </motion.div>
            </div>
            <motion.div style={{opacity}} className={"fixed bottom-6 left-1/2 -translate-x-1/2"}>
                <ChevronsDown className={"w-10 h-10 animate-pulse text-foreground/70"}/>
            </motion.div>
            <div className={"fixed z-[-2] w-screen h-screen flex items-center justify-center"}>
                <motion.div
                    style={imageFrame}
                    className={"overflow-hidden relative"}
                >
                    <motion.img
                        style={{rotate: imageCounterRotate}}
                        className={"absolute top-1/2 left-1/2 [translate:-50%_-50%] w-screen h-auto max-w-none"}
                        src={"/image.webp"}
                    />
                </motion.div>
            </div>
            <div className={"fixed z-[-1] w-screen h-screen flex items-center justify-center"}>
                <motion.div
                    style={videoFrame}
                    className={"overflow-hidden relative"}
                >
                    <motion.video
                        width="1920"
                        height="1080"
                        style={{skew: videoCounterSkewX}}
                        className={"absolute top-1/2 left-1/2 [translate:-50%_-50%] w-screen h-auto max-w-none"}
                        autoPlay={true}
                        loop={true}
                        muted={true}
                    >
                        <source
                            src="/video.webm"
                            type="video/webm"
                        />
                    </motion.video>
                </motion.div>
            </div>
            <div className={"fixed z-0 w-screen h-screen overflow-hidden"}>
                <motion.div
                    style={finishedScrollers}
                    className={"absolute bottom-1/2 -right-1/2 rotate-45 w-screen bg-pink-600 overflow-hidden text-lg"}
                >
                    <TextScroller direction={"rtl"} text={"DEMO_FINISHED_"}/>
                </motion.div>
                <motion.div
                    style={finishedScrollers}
                    className={"absolute bottom-1/2 right-1/2 rotate-45 w-screen bg-pink-600 overflow-hidden text-lg"}
                >
                    <TextScroller direction={"rtl"} text={"NO_FOR_REAL_"}/>
                </motion.div>
                <motion.div
                    style={finishedScrollers}
                    className={"absolute bottom-1/2 right-1/2 -rotate-45 w-screen bg-pink-600 overflow-hidden text-lg"}
                >
                    <TextScroller direction={"rtl"} text={"THATS_ALL_"}/>
                </motion.div>
                <motion.div
                    style={finishedScrollers}
                    className={"absolute bottom-1/2 -right-1/2 -rotate-45 w-screen bg-pink-600 overflow-hidden text-lg"}
                >
                    <TextScroller direction={"rtl"} text={"I_SPENT_5_HOURS_ON_THIS_HELP_"}/>
                </motion.div>
            </div>
        </div>
    );
}

export default App;
