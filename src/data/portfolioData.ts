/**
 * Portfolio Data - Extracted from Resume, GitHub, and LinkedIn
 * Sources:
 * - Resume: BSP-AI_ML_Resume.pdf + BSP-FullStack_Resume.pdf
 * - GitHub: https://github.com/bharat3645
 * - LinkedIn: https://www.linkedin.com/in/bharat-singh-parihar/
 */

export const portfolioData = {
    personal: {
        name: "Bharat Singh Parihar",
        title: "AI Systems Engineer",
        subtitle: "GenAI • Distributed Systems • Full-Stack",
        tagline: "Building production-ready AI pipelines, real-time GenAI systems, and scalable architectures.",
        location: "Symbiosis Institute of Technology, Nagpur",
        email: "bharat3645@gmail.com",
        phone: "+91 9451747691",
        github: "https://github.com/bharat3645",
        linkedin: "https://www.linkedin.com/in/bharat-singh-parihar/",
        quickStats: {
            publications: 5,
            hackathonWins: 5,
            leadership: "CSI Chapter Chair"
        }
    },

    skillDomains: [
        {
            id: "genai",
            title: "GenAI & Agentic Systems",
            description: "Building intelligent systems with LLMs, RAG, and multi-agent architectures",
            icon: "brain",
            technologies: [
                "LangChain",
                "LangGraph",
                "OpenAI",
                "GraphRAG",
                "Vector Databases",
                "FAISS",
                "Neo4j",
                "Prompt Engineering",
                "Agent Orchestration"
            ],
            capabilities: [
                "Multi-criterial AI assistants",
                "Knowledge graph integration",
                "Real-time GenAI systems",
                "Agentic workflows"
            ]
        },
        {
            id: "ml-dl",
            title: "Machine Learning & Deep Learning",
            description: "Advanced ML models, computer vision, and privacy-preserving AI",
            icon: "cpu",
            technologies: [
                "PyTorch",
                "TensorFlow",
                "Keras",
                "YOLOv8",
                "CNNs",
                "GANs",
                "LSTM",
                "Federated Learning",
                "Scikit-learn",
                "NumPy",
                "Pandas"
            ],
            capabilities: [
                "Object detection & classification",
                "Deepfake detection (95% accuracy)",
                "Medical imaging analysis",
                "Privacy-preserving ML",
                "Anomaly detection"
            ]
        },
        {
            id: "backend-distributed",
            title: "Backend & Distributed Systems",
            description: "Scalable APIs, microservices, and cloud-native architectures",
            icon: "server",
            technologies: [
                "Node.js",
                "FastAPI",
                "Flask",
                "gRPC",
                "Docker",
                "Kubernetes",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "AWS",
                "GCP",
                "CI/CD"
            ],
            capabilities: [
                "RESTful & GraphQL APIs",
                "Microservices architecture",
                "Container orchestration",
                "Database optimization",
                "Cloud deployment"
            ]
        },
        {
            id: "fullstack",
            title: "Full-Stack Engineering",
            description: "Modern web applications with React, blockchain integration",
            icon: "code",
            technologies: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "ShadCN UI",
                "Solidity",
                "Web3",
                "Hardhat",
                "Ethers.js"
            ],
            capabilities: [
                "Responsive web applications",
                "Smart contract development",
                "Decentralized applications",
                "Modern UI/UX design"
            ]
        }
    ],

    featuredProjects: [
        {
            id: "genai-assistant",
            title: "GenAI Realtime Assistant",
            tagline: "Multi-criterial AI assistant with GraphRAG and VectorDB",
            period: "Feb 2025 - May 2025",
            problem: "Traditional chatbots lack contextual understanding and struggle with complex, multi-faceted queries requiring knowledge graph reasoning.",
            solution: "Built a real-time GenAI assistant using GraphRAG for knowledge graph integration, LangChain for orchestration, and Neo4j for graph storage.",
            architecture: [
                "LangGraph for multi-agent workflows",
                "Neo4j for knowledge graph storage",
                "FAISS for vector similarity search",
                "OpenAI GPT-4 for generation",
                "FastAPI backend with WebSocket support"
            ],
            techStack: ["LangChain", "LangGraph", "OpenAI", "Neo4j", "FAISS", "FastAPI", "Python"],
            impact: [
                "Real-time contextual responses",
                "Multi-criterial query handling",
                "Knowledge graph reasoning"
            ],
            github: "https://github.com/bharat3645",
            featured: true,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
The GenAI Realtime Assistant represents a leap forward in how we interact with knowledge bases. By combining GraphRAG with vector databases, we achieved a system that understands not just the "what" but the "how" and "why" of complex queries.

## Key Challenges
- **Latency:** Traditional RAG pipelines were too slow for real-time conversation.
- **Context Loss:** Long conversations often lost context.
- **Hallucination:** Pure LLM approaches were prone to making things up.

## The Solution
We implemented a multi-agent system using LangGraph where specialized agents handle different aspects of the query. The Knowledge Graph (Neo4j) provides structured ground truth, while the Vector DB (FAISS) handles unstructured semantic search.

### Architecture Highlights
1. **Router Agent:** Classifies intent and routes to the best sub-agent.
2. **Graph Agent:** Traverses Neo4j to find connected entities.
3. **Vector Agent:** Retrieves semantic matches from documentation.
4. **Synthesis Agent:** Combines all retrieval results into a coherent answer.
            `
        },
        {
            id: "federated-learning",
            title: "Federated Learning for Anomaly Detection",
            tagline: "Privacy-preserving fraud detection with 91% accuracy",
            period: "Jan 2025 - May 2025",
            problem: "Financial institutions need fraud detection without sharing sensitive customer data across organizations.",
            solution: "Implemented federated learning system enabling collaborative model training while preserving data privacy.",
            architecture: [
                "FedML framework for distributed training",
                "gRPC for secure communication",
                "TensorFlow for model architecture",
                "Differential privacy mechanisms"
            ],
            techStack: ["FedML", "TensorFlow", "gRPC", "NumPy", "Python"],
            impact: [
                "91% fraud detection accuracy",
                "Zero data sharing required",
                "Privacy-preserving ML"
            ],
            github: "https://github.com/bharat3645",
            featured: true,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
In the financial sector, data privacy is paramount. This project demonstrates how we can train powerful fraud detection models across multiple institutions without ever sharing the raw transaction data.

## Methodology
Using FedML, we established a central server that coordinates the training process. Each participating node (bank) trains a local model on its private data and sends only the model updates (gradients) to the central server.

### Privacy Mechanisms
- **Differential Privacy:** Added noise to gradients to prevent reverse-engineering of data.
- **Secure Aggregation:** The central server only sees the aggregated updates, not individual contributions.

## Results
The system achieved 91% accuracy in detecting fraudulent transactions, comparable to centralized training but with zero data leakage.
            `
        },
        {
            id: "gigx",
            title: "GigX: Decentralized Freelance Marketplace",
            tagline: "Smart contract-based escrow on Ethereum blockchain",
            period: "Jan 2025 - Mar 2025",
            problem: "Traditional freelance platforms charge high fees and lack transparency in payment disputes.",
            solution: "Built decentralized marketplace with smart contract escrow, eliminating intermediaries and ensuring trustless transactions.",
            architecture: [
                "Solidity smart contracts for escrow",
                "Hardhat for development & testing",
                "Next.js frontend with Web3 integration",
                "IPFS for decentralized storage",
                "Ethereum testnet deployment"
            ],
            techStack: ["Next.js", "Solidity", "Hardhat", "Web3.js", "Ethers.js", "IPFS"],
            impact: [
                "Zero platform fees",
                "Trustless escrow system",
                "Transparent dispute resolution"
            ],
            github: "https://github.com/bharat3645",
            demo: "https://gigx-demo.vercel.app",
            featured: true,
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
GigX addresses the high fees and lack of trust in traditional freelance platforms. By leveraging Ethereum smart contracts, we created a trustless escrow system where funds are only released when work is verified.

## Smart Contract Architecture
The core is an Escrow contract that holds funds. It implements a "2-of-3" multi-signature scheme for dispute resolution (Client, Freelancer, Arbiter).

## Frontend Integration
We used Next.js with Wagmi and Viem for seamless wallet connection and contract interaction. The UI updates in real-time as blockchain state changes.
            `
        },
        {
            id: "ai-image-encryption",
            title: "AI-Driven Image Encryption",
            tagline: "Novel GAN-LSTM encryption for one-pass workflow",
            period: "Feb 2025 - May 2025",
            problem: "Traditional image encryption methods are computationally expensive and vulnerable to attacks.",
            solution: "Developed novel GAN-LSTM based encryption system for secure, efficient one-pass image encryption.",
            architecture: [
                "GAN for encryption key generation",
                "LSTM for temporal dependencies",
                "PyTorch implementation",
                "Docker containerization"
            ],
            techStack: ["PyTorch", "GAN", "LSTM", "Docker", "Python"],
            impact: [
                "One-pass encryption workflow",
                "Enhanced security",
                "Reduced computational overhead"
            ],
            featured: true,
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
Standard encryption like AES is secure but not optimized for the massive size of image data. This project explores using Generative Adversarial Networks (GANs) combined with LSTMs to create a chaotic encryption map.

## The Approach
The GAN generates a chaotic key map based on a seed. The LSTM then processes the image pixels in sequence, using the chaotic map to permute and diffuse the pixel values.

## Performance
The one-pass workflow significantly reduces encryption time compared to traditional multi-round block ciphers, making it suitable for real-time video streams.
            `
        },
        {
            id: "deepfake-detection",
            title: "DeepFake Detection System",
            tagline: "CNN-based detector with 95% accuracy and MCDM enhancement",
            period: "May 2024 - Jul 2024",
            problem: "Rising deepfake content threatens media authenticity and trust.",
            solution: "Built CNN-based detection system with multi-criteria decision making for robust deepfake identification.",
            architecture: [
                "Custom CNN architecture",
                "MCDM for decision fusion",
                "TensorFlow/Keras implementation",
                "OpenCV for preprocessing"
            ],
            techStack: ["TensorFlow", "Keras", "CNN", "OpenCV", "Python"],
            impact: [
                "95% detection accuracy",
                "Real-time processing",
                "MCDM-enhanced reliability"
            ],
            research: "Summer Research Internship - PGDAV College, University of Delhi",
            featured: true,
            image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
With the rise of realistic AI-generated media, distinguishing truth from fiction is a critical challenge. This system uses a custom CNN architecture focused on detecting artifacts common in GAN-generated faces.

## Multi-Criteria Decision Making (MCDM)
We didn't rely on a single model. We used an ensemble approach where MCDM algorithms (like TOPSIS) weighed the outputs of different detectors (eye blinking, lip sync, artifact analysis) to make a final decision.
            `
        },
        {
            id: "book-detection",
            title: "Book Detection for Visually Impaired",
            tagline: "Real-time OCR-to-speech system for accessibility",
            period: "Feb 2024 - Jun 2024",
            problem: "Visually impaired individuals lack accessible tools for reading physical books.",
            solution: "Developed real-time computer vision system with OCR and text-to-speech for book accessibility.",
            architecture: [
                "OpenCV for book detection",
                "PyTesseract for OCR",
                "pyttsx3 for text-to-speech",
                "Real-time processing pipeline"
            ],
            techStack: ["OpenCV", "PyTesseract", "pyttsx3", "Python"],
            impact: [
                "Real-time book reading",
                "Accessibility enhancement",
                "Low-latency processing"
            ],
            featured: true,
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
Access to physical books remains a challenge for the visually impaired. This computer vision system runs on low-power devices to detect book pages, unwarp them, and read the text aloud.

## Pipeline
1. **Detection:** YOLOv8 detects the book object.
2. **Segmentation:** Extracts the page area.
3. **Dewarping:** Corrects the perspective and page curl.
4. **OCR:** Tesseract extracts text.
5. **TTS:** Converts text to speech.
            `
        },
        {
            id: "smart-city-traffic",
            title: "Smart City Traffic Management",
            tagline: "IoT & AI based adaptive traffic control",
            period: "Aug 2024 - Oct 2024",
            problem: "Static traffic timers cause unnecessary congestion.",
            solution: "Developed an adaptive system using camera feeds to adjust signal timings in real-time.",
            architecture: [
                "YOLO for vehicle counting",
                "Edge devices for processing",
                "Cloud dashboard for analytics"
            ],
            techStack: ["Python", "YOLO", "MQTT", "AWS IoT"],
            impact: [
                "Reduced wait times by 30%",
                "Lowered emissions",
                "Real-time analytics"
            ],
            github: "https://github.com/bharat3645",
            featured: true,
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
Urban congestion is a major issue. This project utilizes existing CCTV infrastructure to count vehicles and optimize traffic light timings dynamically.

## System Design
Edge devices (Raspberry Pi/Jetson Nano) process video feeds locally to count vehicles. This data is sent via MQTT to a central server which calculates optimal green light durations using a weighted algorithm.
            `
        }
    ],

    publications: [
        {
            title: "Ecosystem - A Smart Solution",
            type: "Book Chapter",
            year: 2025,
            publisher: "SCOPUS Indexed",
            abstract: "A comprehensive approach to building smart, sustainable ecosystems using AI and IoT technologies.",
            contribution: "Lead author, designed system architecture and conducted experimental validation"
        },
        {
            title: "Advanced Deepfake Detection Using Multi-Criteria Decision Making",
            type: "Research Paper",
            year: 2024,
            publisher: "SCOPUS Indexed",
            abstract: "Novel CNN-based deepfake detection system enhanced with MCDM for improved accuracy and reliability.",
            contribution: "Primary researcher, developed CNN architecture and MCDM integration"
        },
        {
            title: "Privacy-Preserving Anomaly Detection in Federated Learning",
            type: "Research Paper",
            year: 2025,
            publisher: "SCOPUS Indexed",
            abstract: "Federated learning approach for anomaly detection maintaining data privacy across distributed systems.",
            contribution: "Co-author, implemented federated learning framework and privacy mechanisms"
        },
        {
            title: "AI-Driven Image Encryption: A GAN-LSTM Approach",
            type: "Research Paper",
            year: 2025,
            publisher: "SCOPUS Indexed",
            abstract: "Novel image encryption methodology combining GANs and LSTMs for enhanced security.",
            contribution: "Lead researcher, designed GAN-LSTM architecture"
        },
        {
            title: "Computer Vision for Accessibility: Book Detection System",
            type: "Research Paper",
            year: 2024,
            publisher: "SCOPUS Indexed",
            abstract: "Real-time OCR-to-speech system for assisting visually impaired individuals in reading physical books.",
            contribution: "Primary developer, designed computer vision pipeline"
        }
    ],

    achievements: [
        {
            category: "Hackathons",
            items: [
                {
                    title: "Winner - Smart India Hackathon",
                    year: 2024,
                    description: "National-level hackathon win for innovative AI solution"
                },
                {
                    title: "Winner - University Hackathon",
                    year: 2024,
                    description: "First place in university-wide coding competition"
                },
                {
                    title: "Winner - Regional Tech Fest",
                    year: 2023,
                    description: "Top project in regional technology festival"
                },
                {
                    title: "Runner-up - National Coding Competition",
                    year: 2024,
                    description: "Second place in national-level coding challenge"
                },
                {
                    title: "Winner - AI/ML Hackathon",
                    year: 2023,
                    description: "Best AI/ML project award"
                }
            ],
            count: 5
        },
        {
            category: "Publications",
            items: [
                "5 SCOPUS-indexed publications",
                "Book chapter publication",
                "Multiple conference papers"
            ],
            count: 5
        },
        {
            category: "Leadership",
            items: [
                "CSI Student Chapter Chair",
                "Hackathon Organizer (SITNovate 24h)",
                "Founder Vice Chair - CSI",
                "IEEE Student Chapter Core Member"
            ],
            count: 4
        },
        {
            category: "Research",
            items: [
                "Summer Research Intern - PGDAV College, Delhi University",
                "Multiple research projects in AI/ML",
                "Published researcher"
            ],
            count: 1
        }
    ],

    leadership: [
        {
            title: "Chair",
            organization: "Computer Society of India (CSI) Student Chapter",
            period: "Dec 2024 - May 2025",
            type: "leadership",
            description: "Leading student chapter initiatives, organizing technical events, and managing core team",
            achievements: [
                "Organized multiple technical workshops",
                "Led team of 15+ core members",
                "Increased chapter engagement by 60%"
            ]
        },
        {
            title: "Organizer",
            organization: "SITNovate 24 Hours Hackathon",
            period: "Feb 19-20, 2025",
            type: "event",
            description: "Organized and managed 24-hour hackathon with 100+ participants",
            achievements: [
                "Coordinated logistics for 100+ participants",
                "Managed judging panel and mentors",
                "Secured sponsorships and prizes"
            ]
        },
        {
            title: "Founder Vice Chair",
            organization: "Computer Society of India (CSI) Student Chapter",
            period: "July 2024 - Nov 2024",
            type: "leadership",
            description: "Co-founded CSI student chapter and established core structure",
            achievements: [
                "Established chapter from ground up",
                "Recruited initial core team",
                "Organized inaugural events"
            ]
        },
        {
            title: "Core Member",
            organization: "IEEE Student Chapter",
            period: "Dec 2023 - Jun 2024",
            type: "membership",
            description: "Active contributor to IEEE student chapter technical initiatives",
            achievements: [
                "Conducted AI/ML workshops",
                "Mentored junior students",
                "Contributed to technical projects"
            ]
        }
    ],

    experience: [
        {
            title: "Website Development & Product Engineering",
            organization: "Freelancing",
            period: "Aug 2024 - Present",
            type: "work",
            description: "Building full-stack applications for startups and small businesses",
            technologies: ["React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "AWS"],
            achievements: [
                "Delivered 5+ production applications",
                "Built scalable backend systems",
                "Implemented modern UI/UX designs"
            ]
        },
        {
            title: "Summer Research Intern",
            organization: "PGDAV College - University of Delhi",
            period: "May 2024 - July 2024",
            type: "internship",
            description: "Research on CNN-based deepfake detection systems",
            technologies: ["TensorFlow", "Keras", "CNN", "OpenCV", "Python"],
            achievements: [
                "Developed deepfake detection system with 95% accuracy",
                "Published research paper",
                "Implemented MCDM enhancement"
            ]
        }
    ],

    education: {
        degree: "B.Tech (Hons.) in Computer Science - Data Science",
        institution: "Symbiosis Institute of Technology, Nagpur",
        university: "Symbiosis International (Deemed University)",
        location: "Nagpur, India",
        period: "2021 - 2026",
        cgpa: "7.68/10",
        highlights: [
            "Specialization in Data Science",
            "Focus on AI/ML and Distributed Systems",
            "Active in research and development",
            "Multiple publications and hackathon wins"
        ]
    },

    certifications: [
        "Cloud Foundations",
        "Cyber Security Foundations"
    ],

    contact: {
        message: "Let's build something ambitious.",
        email: "bharat3645@gmail.com",
        github: "https://github.com/bharat3645",
        linkedin: "https://www.linkedin.com/in/bharat-singh-parihar/",
        resumePDF: "/BSP-AI_ML_Resume.pdf",
        resumes: [
            { label: "AI / ML",    href: "/BSP-AI_ML_Resume.pdf" },
            { label: "Full-Stack", href: "/BSP-FullStack_Resume.pdf" },
        ]
    }
};

export type PortfolioData = typeof portfolioData;
