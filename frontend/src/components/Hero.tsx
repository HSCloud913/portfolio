import {motion, type Variants} from 'framer-motion'
import ShootingStars from './ShootingStars'

const container: Variants = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.15, delayChildren: 0.4}},
}

const item: Variants = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8, ease: 'easeOut'}},
}

export default function Hero() {
    return (
        <section id="hero"
                 className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white">

            {/* 유성 애니메이션 */}
            <ShootingStars count={18}/>

            {/* 배경 성운 글로우 */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
                    style={{background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)'}}
                />
                <div
                    className="pulse-glow absolute top-1/4 left-1/3 w-[350px] h-[350px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
                        animationDelay: '2s'
                    }}
                />
                <div
                    className="pulse-glow absolute bottom-1/4 right-1/4 w-[280px] h-[280px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)',
                        animationDelay: '1s'
                    }}
                />
            </div>

            {/* 메인 콘텐츠 */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* 네뷸라 아이콘 */}
                <motion.div variants={item} className="float relative mb-10">
                    <div
                        className="absolute inset-0 rounded-full blur-3xl opacity-50"
                        style={{background: 'radial-gradient(circle, #a855f7, #ec4899)'}}
                    />
                    <img src="/nebula.png" alt="Nebula" className="relative w-36 h-36"/>
                </motion.div>

                <motion.p variants={item} className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-4">
                    Portfolio · 최성운
                </motion.p>

                <motion.h1
                    variants={item}
                    className="text-6xl font-bold mb-3"
                    style={{
                        background: 'linear-gradient(135deg, #e9d5ff 0%, #c084fc 45%, #f472b6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Nebula
                </motion.h1>

                <motion.p variants={item} className="text-gray-400 text-lg mb-5 tracking-wide">
                    시스템 소프트웨어 개발자 · 8년+ 경력
                </motion.p>

                <motion.div
                    variants={item}
                    className="w-24 h-px mb-7"
                    style={{background: 'linear-gradient(to right, transparent, #a855f7, transparent)'}}
                />

                <motion.p variants={item} className="text-gray-300 leading-relaxed mb-8 max-w-lg text-sm">
                    C++ 및 C#을 주로 사용하는 소프트웨어 개발자로, 다양한 프로젝트에서 경험을 쌓았습니다.<br/>
                    최신 기술 트렌드를 반영한 효율적인 코드와 좋은 협업 문화,<br/>
                    두 가지를 함께 추구합니다.
                </motion.p>

                {/* CTA 버튼 */}
                <motion.div variants={item} className="flex gap-4 mb-12">
                    <motion.a
                        href="#projects"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.97}}
                        className="px-6 py-3 rounded-full text-sm font-medium text-white"
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                            boxShadow: '0 0 30px rgba(124,58,237,0.3)',
                        }}
                    >
                        프로젝트 보기
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.97}}
                        className="px-6 py-3 rounded-full text-sm font-medium text-purple-300 hover:text-white transition-colors duration-200"
                        style={{border: '1px solid rgba(168,85,247,0.4)', background: 'rgba(88,28,135,0.2)'}}
                    >
                        연락하기
                    </motion.a>
                </motion.div>

                {/* 스크롤 인디케이터 */}
                <motion.div variants={item}
                            className="flex flex-col items-center gap-2 text-gray-600 text-xs tracking-[0.3em]">
                    <span>SCROLL</span>
                    <div className="w-px h-8" style={{background: 'linear-gradient(to bottom, #a855f7, transparent)'}}/>
                </motion.div>
            </motion.div>
        </section>
    )
}
