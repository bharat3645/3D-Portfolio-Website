'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/TextReveal';

const row1 = [
    { name: 'Python',      icon: '/tech/python.png'     },
    { name: 'React',       icon: '/tech/reactjs.png'    },
    { name: 'TypeScript',  icon: '/tech/typescript.png' },
    { name: 'Node.js',     icon: '/tech/nodejs.png'     },
    { name: 'Docker',      icon: '/tech/docker.png'     },
    { name: 'Kubernetes',  icon: '/tech/k8s.png'        },
    { name: 'FastAPI',     icon: '/tech/fastapi.png'    },
    { name: 'MongoDB',     icon: '/tech/mongodb.png'    },
    { name: 'PostgreSQL',  icon: '/tech/postgresql.png' },
    { name: 'AWS',         icon: '/tech/aws.png'        },
    { name: 'Django',      icon: '/tech/django.png'     },
    { name: 'Bootstrap',   icon: '/tech/bootstrap.png'  },
];

const row2 = [
    { name: 'Three.js',    icon: '/tech/threejs.svg'    },
    { name: 'Tailwind',    icon: '/tech/tailwind.png'   },
    { name: 'JavaScript',  icon: '/tech/javascript.png' },
    { name: 'Git',         icon: '/tech/git.png'        },
    { name: 'Linux',       icon: '/tech/linux.png'      },
    { name: 'Firebase',    icon: '/tech/firebase.png'   },
    { name: 'GCP',         icon: '/tech/gcp.webp'       },
    { name: 'Flask',       icon: '/tech/flask.png'      },
    { name: 'MySQL',       icon: '/tech/mysql.png'      },
    { name: 'Figma',       icon: '/tech/figma.png'      },
    { name: 'Redux',       icon: '/tech/redux.png'      },
    { name: 'Nginx',       icon: '/tech/nginx.webp'     },
];

function MarqueeRow({ items, reverse = false, paused = false }: { items: typeof row1; reverse?: boolean; paused?: boolean }) {
    const doubled = [...items, ...items];
    return (
        <div className={`marquee-track ${reverse ? 'marquee-track--reverse' : ''} ${paused ? 'marquee-paused' : ''}`}>
            <div className="marquee-content">
                {doubled.map((tech, i) => (
                    <div key={`${tech.name}-${i}`} className="marquee-item" data-cursor="hover">
                        <div className="marquee-item-icon">
                            <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={28}
                                height={28}
                                className={`object-contain${tech.name === 'Three.js' ? ' invert' : ''}`}
                            />
                        </div>
                        <span className="marquee-item-name">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TechSection() {
    const ref = useRef<HTMLElement>(null);
    // once:false so the marquee re-pauses whenever the section scrolls out of view.
    const inView = useInView(ref, { once: false, margin: '-100px' });
    const paused = !inView;

    return (
        <section ref={ref} id="tech" className="py-24 overflow-hidden relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeading label="System Capabilities" heading="Tech Stack" />
            </div>

            <div className="marquee-container">
                <MarqueeRow items={row1} paused={paused} />
                <MarqueeRow items={row2} reverse paused={paused} />
            </div>

            {/* Fade edges */}
            <div className="marquee-fade-left" aria-hidden="true" />
            <div className="marquee-fade-right" aria-hidden="true" />
        </section>
    );
}
