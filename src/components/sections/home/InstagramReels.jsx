import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Instagram, ChevronLeft, ChevronRight, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import './InstagramReels.css';
import bgImage from '../../../assets/images/home/news-updates/bg.avif';

// 10 Verified Krisar Academy Instagram Reels streamed via Cloudinary CDN
const reelsData = [
    {
        id: 'smart-education',
        category: 'Digital Innovation',
        title: 'Step Towards Smarter Education & Digital Facilities',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794223860/savefromins.com_A_step_towards_smarter_education.___With_upgraded_digital_facilities_We_continue_to_embrace_innovation_enhance_engagement_and_empower_young_minds_for_tomorrow.__instagood_trending_ranipet_vira.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794223860/savefromins.com_A_step_towards_smarter_education.___With_upgraded_digital_facilities_We_continue_to_embrace_innovation_enhance_engagement_and_empower_young_minds_for_tomorrow.__instagood_trending_ranipet_vira.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Upgraded digital facilities and smart education classroom at Krisar Academy'
    },
    {
        id: 'kindergarten-dreams',
        category: 'Early Childhood',
        title: 'Where Little Dreams Begin & Bright Futures Grow',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794223769/savefromins.com_Where_little_dreams_begin_and_bright_futures_grow____instagood_kidsofinstagram_viral_ranipet_thekrisaracademy_0_720P.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794223769/savefromins.com_Where_little_dreams_begin_and_bright_futures_grow____instagood_kidsofinstagram_viral_ranipet_thekrisaracademy_0_720P.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Kindergarten children learning and growing at Krisar Academy'
    },
    {
        id: 'bilateral-coordination',
        category: 'Skill Development',
        title: 'Little Hands, Growing Skills: Bilateral Coordination',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1793969206/savefromins.com_Little_hands_growing_skills___Our_Krisarites_are_practising_bilateral_coordination_learning_to_use_both_sides_of_their_body_together_to_improve_balance_coordination_and_motor_skills.____fyppp.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1793969206/savefromins.com_Little_hands_growing_skills___Our_Krisarites_are_practising_bilateral_coordination_learning_to_use_both_sides_of_their_body_together_to_improve_balance_coordination_and_motor_skills.____fyppp.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Krisarites practicing bilateral coordination, balance, and motor skills'
    },
    {
        id: 'vedantu-scholarship',
        category: 'Scholarships & Merit',
        title: 'District-Level Merit Scholarship Exam with Vedantu',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1793968920/savefromins.com_BIG_OPPORTUNITIES._BRIGHTER_FUTURES___The_Krisar_Academy_in_association_with_Vedantu_proudly_presents_the_District_Level_Merit_Scholarship_Examination_2026_for_students_of_Grades_V_X_____.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1793968920/savefromins.com_BIG_OPPORTUNITIES._BRIGHTER_FUTURES___The_Krisar_Academy_in_association_with_Vedantu_proudly_presents_the_District_Level_Merit_Scholarship_Examination_2026_for_students_of_Grades_V_X_____.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'District Level Merit Scholarship Examination 2026 in association with Vedantu'
    },
    {
        id: 'parent-conversations',
        category: 'Parent Community',
        title: 'Growing Together: One Conversation at a Time',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794380669/savefromins.com_Growing_together_one_conversation_at_a_time.___At_The_Krisar_Academy_every_parent_s_voice_matters_and_every_child_s_growth_is_our_priority.___education_trending_instagood_viral_ranipet_0_1.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794380669/savefromins.com_Growing_together_one_conversation_at_a_time.___At_The_Krisar_Academy_every_parent_s_voice_matters_and_every_child_s_growth_is_our_priority.___education_trending_instagood_viral_ranipet_0_1.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Parent-teacher collaboration and child growth at Krisar Academy'
    },
    {
        id: 'home-visits',
        category: 'Beyond Classroom',
        title: 'A School That Cares: Heartfelt Home Visits',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794380608/savefromins.com_A_school_that_cares_connects_beyond_the_classroom.__At_The_Krisar_Academy_our_bond_with_students_and_parents_goes_beyond_school_hours._%EF%B8%8F_Our_home_visits_gave_us_a_chance_to_listen_understand_and.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794380608/savefromins.com_A_school_that_cares_connects_beyond_the_classroom.__At_The_Krisar_Academy_our_bond_with_students_and_parents_goes_beyond_school_hours._%EF%B8%8F_Our_home_visits_gave_us_a_chance_to_listen_understand_and.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Krisar Academy home visits connecting with students and parents beyond the classroom'
    },
    {
        id: 'senior-citizens',
        category: 'Values & Empathy',
        title: 'Respecting, Caring For & Valuing Senior Citizens',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794380176/savefromins.com_A_generation_that_teaches_us_without_ever_calling_it_a_lesson.__Our_students_speak_about_something_that_truly_matters_respecting_caring_for_and_valuing_our_senior_citizens.Their_wisdom_stories_and.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794380176/savefromins.com_A_generation_that_teaches_us_without_ever_calling_it_a_lesson.__Our_students_speak_about_something_that_truly_matters_respecting_caring_for_and_valuing_our_senior_citizens.Their_wisdom_stories_and.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Students speaking on respecting and valuing our senior citizens'
    },
    {
        id: 'skill-award-2026',
        category: 'Accolades & Milestones',
        title: 'Outstanding School in Skill Development Award 2026',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794379982/savefromins.com_Prestigious_Recognition_for_The_Krisar_Academy_We_are_delighted_to_announce_that_The_Krisar_Academy_has_been_conferred_the_Outstanding_School_in_Learning_Initiative_Skill_Development_2026_award.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794379982/savefromins.com_Prestigious_Recognition_for_The_Krisar_Academy_We_are_delighted_to_announce_that_The_Krisar_Academy_has_been_conferred_the_Outstanding_School_in_Learning_Initiative_Skill_Development_2026_award.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'The Krisar Academy conferred Outstanding School in Learning Initiative & Skill Development Award 2026'
    },
    {
        id: 'student-council',
        category: 'Student Leadership',
        title: 'Student Council Election: Celebrating Democracy',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794224864/savefromins.com_%EF%B8%8F_Every_great_leader_begins_with_a_single_vote.__At_The_Krisar_Academy_Senior_Secondary_CBSE_School_our_Student_Council_Election_was_a_celebration_of_democracy_responsibility_and_leadership.___.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794224864/savefromins.com_%EF%B8%8F_Every_great_leader_begins_with_a_single_vote.__At_The_Krisar_Academy_Senior_Secondary_CBSE_School_our_Student_Council_Election_was_a_celebration_of_democracy_responsibility_and_leadership.___.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Krisar Academy Student Council Election celebration of democracy and leadership'
    },
    {
        id: 'global-peace',
        category: 'Global Peace & Harmony',
        title: 'Peace & Empathy: Classrooms Nurturing Understanding',
        poster: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794224044/savefromins.com_In_many_parts_of_the_world_today_children_hear_sounds_of_conflict_instead_of_school_bells._This_video_is_a_reminder_that_peace_is_precious_and_every_classroom_has_the_power_to_nurture_understanding.jpg',
        videoSrc: 'https://res.cloudinary.com/enlowpdk/video/upload/v1794224044/savefromins.com_In_many_parts_of_the_world_today_children_hear_sounds_of_conflict_instead_of_school_bells._This_video_is_a_reminder_that_peace_is_precious_and_every_classroom_has_the_power_to_nurture_understanding.mp4',
        link: 'https://www.instagram.com/thekrisaracademy_cbse/',
        alt: 'Classrooms nurturing peace, empathy and global understanding at Krisar Academy'
    }
];

const TOTAL_SLIDES = reelsData.length; // 10
const STEP_ANGLE = 360 / TOTAL_SLIDES; // 36 deg

const InstagramReels = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dimensions, setDimensions] = useState({
        cardW: 285,
        cardH: 450,
        radius: 580,
        perspective: 2800
    });

    const ringRef = useRef(null);
    const cameraRef = useRef(null);
    const viewRef = useRef(null);
    const cardsRef = useRef([]);
    const videoRefs = useRef([]);
    const activeIndexRef = useRef(0);
    const isMutedRef = useRef(true);
    const reducedMotionRef = useRef(false);
    const wheelTimerRef = useRef(null);

    // Keep muted ref in sync
    useEffect(() => {
        isMutedRef.current = isMuted;
    }, [isMuted]);

    // Responsive dimension measurement & reduced motion detection
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateDimensions = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDimensions({
                    cardW: 210,
                    cardH: 330,
                    radius: 360,
                    perspective: 1500
                });
            } else if (width < 1024) {
                setDimensions({
                    cardW: 245,
                    cardH: 390,
                    radius: 470,
                    perspective: 2200
                });
            } else {
                setDimensions({
                    cardW: 285,
                    cardH: 450,
                    radius: 580,
                    perspective: 2800
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotionRef.current = motionQuery.matches;
        const handleMotionChange = (e) => {
            reducedMotionRef.current = e.matches;
        };
        motionQuery.addEventListener?.('change', handleMotionChange);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            motionQuery.removeEventListener?.('change', handleMotionChange);
        };
    }, []);

    // Physics state
    const stateRef = useRef({
        angle: 0,
        velocity: 0,
        target: null,
        holdUntil: 0,
        drag: false,
        hover: false,
        suppressClick: false,
        pointerInside: false,
        pointerX: 0,
        pointerY: 0,
        yaw: 0,
        pitch: 0,
        press: null
    });

    // 60-120fps direct GPU transformation & Critically Damped Spring Physics Loop
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let animId;
        let lastTime = performance.now();

        const tick = (now) => {
            const dt = Math.min(0.05, (now - lastTime) / 1000);
            lastTime = now;

            const state = stateRef.current;

            // 1. Target Spring Physics (sub-stepped critically damped integration)
            if (state.target !== null) {
                const k = 118; // Spring stiffness
                const c = 2 * Math.sqrt(k); // Damping coefficient (critical damping)
                let remTime = dt;
                while (remTime > 0) {
                    const stepDt = Math.min(remTime, 1 / 240);
                    const accel = k * (state.target - state.angle) - c * state.velocity;
                    state.velocity += accel * stepDt;
                    state.angle += state.velocity * stepDt;
                    remTime -= stepDt;
                }
                if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) {
                    state.angle = state.target;
                    state.velocity = 0;
                    state.target = null;
                }
            } else if (!state.drag) {
                // 2. Gentle, smooth auto-rotation drift (right-to-left) with smooth deceleration on hover / pause
                const isHeld = (state.hover && !reducedMotionRef.current) || (Date.now() < state.holdUntil);
                const driftVelocity = (!isHeld && !reducedMotionRef.current) ? 4.0 : 0; // Reduced to a gentle 4.0 deg/sec
                const tau = 0.6;
                state.velocity += (driftVelocity - state.velocity) * (1 - Math.exp(-dt / tau));
                state.angle += state.velocity * dt;
            }

            // 3. Smooth mouse parallax
            const targetYaw = state.pointerInside ? state.pointerX * 2.7 : 0;
            const targetPitch = state.pointerInside ? -state.pointerY * 1.8 : 0;
            state.yaw += (targetYaw - state.yaw) * (1 - Math.exp(-dt / 0.35));
            state.pitch += (targetPitch - state.pitch) * (1 - Math.exp(-dt / 0.35));

            // 4. Update camera and ring DOM directly for 60-120fps GPU performance
            if (cameraRef.current) {
                cameraRef.current.style.transform = `translate3d(0px, 0px, ${dimensions.radius}px) rotateX(${state.pitch.toFixed(3)}deg) rotateY(${state.yaw.toFixed(3)}deg)`;
            }

            if (ringRef.current) {
                ringRef.current.style.transform = `rotateY(${state.angle.toFixed(3)}deg)`;
            }

            // 5. Update active center slide index
            const normalizedIndex = (Math.round(state.angle / STEP_ANGLE) % TOTAL_SLIDES + TOTAL_SLIDES) % TOTAL_SLIDES;
            if (normalizedIndex !== activeIndexRef.current) {
                activeIndexRef.current = normalizedIndex;
                setActiveIndex(normalizedIndex);
            }

            // 6. Update card depth, opacity and culling (smooth depth fade curve)
            if (cardsRef.current) {
                cardsRef.current.forEach((cardEl, idx) => {
                    if (!cardEl) return;
                    const cardAngle = -idx * STEP_ANGLE;
                    const diff = ((((cardAngle + state.angle) % 360) + 540) % 360) - 180;
                    const absDiff = Math.abs(diff);

                    if (absDiff < 88) {
                        cardEl.style.visibility = 'visible';
                        const cosAngle = Math.cos(diff * (Math.PI / 180));
                        const depthFade = 0.55 * Math.pow((1 - cosAngle) / 2, 1.25);
                        cardEl.style.opacity = Math.max(0.35, 1 - depthFade).toFixed(3);

                        if (absDiff < 18) {
                            cardEl.style.zIndex = '30';
                        } else if (absDiff < 54) {
                            cardEl.style.zIndex = '20';
                        } else {
                            cardEl.style.zIndex = '10';
                        }
                    } else {
                        // Rear cards facing away from user are culled to save GPU rendering
                        cardEl.style.visibility = 'hidden';
                        cardEl.style.opacity = '0';
                        cardEl.style.zIndex = '1';
                    }
                });
            }

            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, [dimensions.radius]);

    // Intelligent Video Playback: Only play active and immediate neighbor videos to optimize CPU/GPU
    useEffect(() => {
        videoRefs.current.forEach((vid, idx) => {
            if (!vid) return;
            const diff = Math.abs(idx - activeIndex);
            const dist = Math.min(diff, TOTAL_SLIDES - diff);

            // Play center card and immediate neighbors (dist <= 1), pause others
            if (dist <= 1) {
                const playPromise = vid.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Autoplay gracefully prevented by browser policy
                    });
                }
            } else {
                if (!vid.paused) {
                    vid.pause();
                }
            }

            // Audio isolation: only the direct center card (dist === 0) has sound when unmuted
            vid.muted = isMuted || dist !== 0;
        });
    }, [activeIndex, isMuted]);

    // Trackpad / Horizontal Wheel Gesture Handling
    useEffect(() => {
        const viewEl = viewRef.current;
        if (!viewEl) return;

        const handleWheel = (e) => {
            const isHoriz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            if (!isHoriz) return;
            e.preventDefault();
            const degPerPx = 180 / (Math.PI * dimensions.radius);
            stateRef.current.target = null;
            stateRef.current.angle += e.deltaX * degPerPx;
            stateRef.current.velocity = e.deltaX * degPerPx * 30;
            stateRef.current.holdUntil = Date.now() + 1600;
            clearTimeout(wheelTimerRef.current);
            wheelTimerRef.current = setTimeout(() => {
                stateRef.current.target = Math.round(stateRef.current.angle / STEP_ANGLE) * STEP_ANGLE;
            }, 140);
        };

        viewEl.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            viewEl.removeEventListener('wheel', handleWheel);
            clearTimeout(wheelTimerRef.current);
        };
    }, [dimensions.radius]);

    // Pointer Drag & Swipe Handling
    const handlePointerDown = (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;

        stateRef.current.suppressClick = false;
        stateRef.current.press = {
            id: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            angle: stateRef.current.angle,
            moved: false,
            origin: 0,
            samples: [{ time: Date.now(), angle: stateRef.current.angle }]
        };
    };

    const handlePointerMove = (e) => {
        const press = stateRef.current.press;
        if (!press || press.id !== e.pointerId) return;

        const deltaX = e.clientX - press.x;
        const deltaY = e.clientY - press.y;

        if (!press.moved) {
            if (Math.abs(deltaX) < 6) return;
            if (Math.abs(deltaY) > Math.abs(deltaX) * 1.2 && e.pointerType !== 'mouse') {
                stateRef.current.press = null;
                return;
            }
            press.moved = true;
            press.origin = deltaX;
            stateRef.current.drag = true;
            stateRef.current.target = null;
            stateRef.current.velocity = 0;
            setIsDragging(true);
            try {
                e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
                // Ignore pointer capture errors
            }
        }

        const degPerPx = 180 / (Math.PI * dimensions.radius);
        stateRef.current.angle = press.angle - (deltaX - press.origin) * degPerPx;

        const now = Date.now();
        press.samples.push({ time: now, angle: stateRef.current.angle });
        while (press.samples.length > 2 && now - press.samples[0].time > 110) {
            press.samples.shift();
        }
    };

    const handlePointerUp = (e) => {
        const press = stateRef.current.press;
        if (!press || press.id !== e.pointerId) return;
        stateRef.current.press = null;

        if (e.currentTarget.releasePointerCapture) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore
            }
        }

        if (!press.moved) return;

        stateRef.current.drag = false;
        setIsDragging(false);
        stateRef.current.suppressClick = true;

        const first = press.samples[0];
        const last = press.samples[press.samples.length - 1];
        const dt = (last.time - first.time) / 1000;
        const velocity = dt > 0.008 ? Math.max(-1400, Math.min(1400, (last.angle - first.angle) / dt)) : 0;
        stateRef.current.velocity = velocity;

        const tau = 0.18 + 0.6 * 1.5;
        const projectedAngle = stateRef.current.angle + velocity * tau * 0.55;
        stateRef.current.target = Math.round(projectedAngle / STEP_ANGLE) * STEP_ANGLE;
        stateRef.current.holdUntil = Date.now() + 2800;
    };

    // Parallax mouse move handlers
    const handleMouseMove = (e) => {
        if (!viewRef.current) return;
        const rect = viewRef.current.getBoundingClientRect();
        const px = Math.min(1, Math.max(-1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        const py = Math.min(1, Math.max(-1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
        stateRef.current.pointerInside = true;
        stateRef.current.pointerX = px;
        stateRef.current.pointerY = py;
    };

    const handleMouseEnter = () => {
        stateRef.current.hover = true;
    };

    const handleMouseLeave = () => {
        stateRef.current.hover = false;
        stateRef.current.pointerInside = false;
        stateRef.current.pointerX = 0;
        stateRef.current.pointerY = 0;
    };

    // Navigation and Card Click Handlers
    const handlePrev = useCallback(() => {
        const curTarget = stateRef.current.target ?? stateRef.current.angle;
        stateRef.current.target = Math.round((curTarget - STEP_ANGLE) / STEP_ANGLE) * STEP_ANGLE;
        stateRef.current.holdUntil = Date.now() + 2800;
    }, []);

    const handleNext = useCallback(() => {
        const curTarget = stateRef.current.target ?? stateRef.current.angle;
        stateRef.current.target = Math.round((curTarget + STEP_ANGLE) / STEP_ANGLE) * STEP_ANGLE;
        stateRef.current.holdUntil = Date.now() + 2800;
    }, []);

    const handleDotClick = useCallback((index) => {
        let target = index * STEP_ANGLE;
        target += 360 * Math.round((stateRef.current.angle - target) / 360);
        stateRef.current.target = target;
        stateRef.current.holdUntil = Date.now() + 2800;
    }, []);

    const handleCardClick = useCallback((index, reel) => {
        if (stateRef.current.suppressClick) {
            stateRef.current.suppressClick = false;
            return;
        }

        const cardAngle = -index * STEP_ANGLE;
        const diff = ((((cardAngle + stateRef.current.angle) % 360) + 540) % 360) - 180;
        const absDiff = Math.abs(diff);

        if (absDiff < 18) {
            // Active center card clicked -> Open verified Instagram reel
            if (reel.link) {
                window.open(reel.link, '_blank', 'noopener,noreferrer');
            }
        } else {
            // Side card clicked -> Smoothly spin to center that card using spring engine
            let target = index * STEP_ANGLE;
            target += 360 * Math.round((stateRef.current.angle - target) / 360);
            stateRef.current.target = target;
            stateRef.current.holdUntil = Date.now() + 2800;
        }
    }, []);

    // Keyboard ArrowLeft / ArrowRight Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext]);

    const toggleAudio = (e) => {
        e.stopPropagation();
        setIsMuted((prev) => {
            const next = !prev;
            videoRefs.current.forEach((vid, idx) => {
                if (vid) {
                    const diff = Math.abs(idx - activeIndexRef.current);
                    const dist = Math.min(diff, TOTAL_SLIDES - diff);
                    vid.muted = next || dist !== 0;
                }
            });
            return next;
        });
    };

    const { cardW, cardH, radius, perspective } = dimensions;

    return (
        <section
            id="reels"
            className="relative w-full py-16 sm:py-24 border-y border-white/10 bg-cover bg-center text-white overflow-hidden scroll-mt-20 select-none"
            style={{ backgroundImage: `url(${bgImage})` }}
            aria-label="Campus Reels Showcase"
        >
            {/* Deep Navy Dark Theme Overlay */}
            <div className="absolute inset-0 bg-[#061E3F]/85 backdrop-blur-[2px] -z-10" />

            {/* Background Decorative Watermark */}
            <div
                className="absolute pointer-events-none select-none z-0 overflow-hidden flex flex-col items-center justify-center transition-opacity duration-300 right-3 sm:right-10 top-4 sm:top-8"
                aria-hidden="true"
                style={{ width: 'clamp(240px, 28vw, 420px)', height: 'clamp(240px, 28vw, 420px)' }}
            >
                <div className="w-full h-full flex flex-col items-center justify-center will-change-transform opacity-[0.05] rotate-12 text-brand-secondary">
                    <Instagram size={320} strokeWidth={1} />
                </div>
            </div>

            {/* Section Header */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mb-8 sm:mb-12 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 bg-white/10 backdrop-blur-sm mb-3">
                            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                            <span className="text-[11px] font-semibold text-gray-200 uppercase tracking-[0.18em]">
                                CAMPUS LIFE &bull; INSTAGRAM REELS
                            </span>
                        </div>
                        <h2 className="font-bold text-2xl sm:text-3xl md:text-5xl text-white tracking-[-0.025em] leading-tight">
                            Life at <span className="text-brand-secondary">Krisar Academy</span>.
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
                            Drag or swipe to spin the 3D ring &bull; Click any reel to explore on Instagram.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3D Circular Ring Carousel Container */}
            <div className="w-full relative h-[480px] sm:h-[560px] md:h-[640px] lg:h-[700px]">
                <div
                    className="reels-carousel-root"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Image and video carousel"
                    tabIndex={0}
                    data-draggable=""
                    data-dragging={isDragging ? "" : undefined}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                >
                    <div
                        ref={viewRef}
                        className="reels-carousel__view"
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                    >
                        {/* 3D Stage with Reference Perspective */}
                        <div
                            className="reels-carousel__stage"
                            style={{
                                perspective: `${perspective}px`,
                                transform: 'translate3d(0px, 0px, 0px)'
                            }}
                        >
                            {/* Camera translated by +radius */}
                            <div
                                ref={cameraRef}
                                className="reels-carousel__camera"
                                style={{
                                    transform: `translate3d(0px, 0px, ${radius}px)`
                                }}
                            >
                                {/* 3D Rotating Ring */}
                                <div ref={ringRef} className="reels-carousel__ring">
                                    {reelsData.map((reel, index) => {
                                        const cardAngle = -index * STEP_ANGLE;
                                        return (
                                            <div
                                                key={reel.id}
                                                ref={(el) => { cardsRef.current[index] = el; }}
                                                className="reels-carousel__card cursor-pointer group/card"
                                                role="group"
                                                aria-roledescription="slide"
                                                aria-label={`${reel.title}, ${index + 1} of ${TOTAL_SLIDES}`}
                                                style={{
                                                    transform: `rotateY(${cardAngle}deg) translateZ(-${radius}px)`
                                                }}
                                                onClick={() => handleCardClick(index, reel)}
                                            >
                                                {/* Tile Container */}
                                                <div
                                                    className="reels-carousel__tile"
                                                    style={{
                                                        left: `${-cardW / 2}px`,
                                                        top: `${-cardH / 2}px`,
                                                        width: `${cardW}px`,
                                                        height: `${cardH}px`
                                                    }}
                                                >
                                                    {/* Frame Wrapper */}
                                                    <div
                                                        className="reels-carousel__frame"
                                                        style={{ height: `${cardH}px` }}
                                                    >
                                                        {/* High-Performance Cloudinary Video */}
                                                        <video
                                                            ref={(el) => { videoRefs.current[index] = el; }}
                                                            className="reels-carousel__photo reels-carousel__video"
                                                            src={reel.videoSrc}
                                                            poster={reel.poster}
                                                            playsInline
                                                            loop
                                                            muted={isMuted || index !== activeIndex}
                                                            preload="metadata"
                                                        />

                                                        {/* Top Action Badges: Instagram Link (Left) & Audio Toggle (Right) */}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(reel.link, '_blank', 'noopener,noreferrer');
                                                            }}
                                                            className="reels-carousel__insta-btn"
                                                            aria-label="View reel on Instagram"
                                                            title="View reel on Instagram"
                                                        >
                                                            <Instagram size={16} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={toggleAudio}
                                                            className="reels-carousel__volume-btn"
                                                            aria-label={isMuted ? "Unmute this video" : "Mute this video"}
                                                            title={isMuted ? "Click to unmute" : "Click to mute"}
                                                        >
                                                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                                        </button>

                                                        {/* Bottom Gradient Shade & Caption */}
                                                        <div className="reels-carousel__shade"></div>
                                                        <div className="reels-carousel__content">
                                                            <span className="text-[10px] font-bold tracking-wider uppercase text-brand-secondary drop-shadow mb-1 block">
                                                                {reel.category}
                                                            </span>
                                                            <h3 className="text-white font-bold text-xs sm:text-sm leading-snug drop-shadow line-clamp-2">
                                                                {reel.title}
                                                            </h3>
                                                            <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-brand-secondary opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                                <span>View on Instagram</span>
                                                                <ArrowUpRight size={13} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons placed OUTSIDE view for 100% click reliability and zero drag interference */}
                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        aria-label="Previous reel"
                        className="absolute left-2 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#0B1221]/90 hover:bg-brand-secondary text-white hover:text-brand-primary border border-white/20 hover:border-brand-secondary shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-secondary cursor-pointer group select-none pointer-events-auto"
                    >
                        <ChevronLeft size={26} className="transition-transform group-hover:-translate-x-0.5" />
                    </button>

                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        aria-label="Next reel"
                        className="absolute right-2 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#0B1221]/90 hover:bg-brand-secondary text-white hover:text-brand-primary border border-white/20 hover:border-brand-secondary shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-secondary cursor-pointer group select-none pointer-events-auto"
                    >
                        <ChevronRight size={26} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Bottom Controls & Follow CTA Bar */}
            <div className="max-w-[1400px] mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                {/* 10 Navigation Dots + Numeric Counter */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-brand-secondary tracking-wider">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL_SLIDES).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-1.5 ml-2">
                        {reelsData.map((r, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => handleDotClick(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                                        isActive
                                            ? 'w-7 bg-brand-secondary shadow-[0_0_10px_rgba(255,193,7,0.6)]'
                                            : 'w-2 bg-white/30 hover:bg-white/60'
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Follow on Instagram CTA */}
                <div>
                    <a
                        href="https://www.instagram.com/thekrisaracademy_cbse/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-secondary text-brand-primary font-bold text-sm shadow-[0_4px_20px_rgba(255,193,7,0.3)] hover:bg-[#ffcd38] hover:scale-105 active:scale-95 transition-all duration-300 group"
                    >
                        <Instagram size={18} className="text-brand-primary group-hover:rotate-12 transition-transform" />
                        <span>Follow @thekrisaracademy_cbse</span>
                        <ArrowUpRight size={16} className="text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramReels;