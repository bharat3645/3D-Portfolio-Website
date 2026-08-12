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
            github: "https://github.com/bharat3645/AppXcess-GigX",
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
        },
        {
            id: "velmora",
            title: "Velmora",
            tagline: "Cross-chain NFT gaming platform with real-time multiplayer battles",
            period: "Aug 2026",
            problem: "Most NFT games either bolt gameplay onto static JPEGs with no real interaction, or run real-time state entirely off-chain with no verifiable ownership behind it.",
            solution: "Built a five-subsystem monorepo where NFT minting and ownership live entirely on-chain while movement, trading, and combat are relayed through a server-authoritative real-time backend that validates every action.",
            architecture: [
                "Next.js 14 + Phaser 3 + Three.js game client with Privy wallet auth",
                "Node.js/Express/Socket.IO server-authoritative relay for player position, combat, and room state",
                "Hono on Cloudflare Workers backend for player profiles and XP, gated behind wallet-signature auth",
                "Solidity 0.8.24 contracts (Hardhat, OpenZeppelin): VelmoraCoin ERC-20 economy, an ERC-721 NFT collection with a Polygon mirror, and non-transferable soulbound achievement tokens",
                "Custom generative art engine producing the 1,200-piece layered NFT collection"
            ],
            techStack: ["Next.js", "Phaser 3", "Three.js", "Socket.IO", "Solidity", "Hardhat", "OpenZeppelin", "Cloudflare Workers", "MongoDB"],
            impact: [
                "Server-validated movement and combat, clamped and sanitized so a malicious client can't teleport or god-mode",
                "EIP-191 signature auth required on every mutating backend request",
                "Soulbound achievement tokens enforced as non-transferable at the contract level"
            ],
            github: "https://github.com/bharat3645/Velmora",
            featured: true,
            image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
Velmora is a cross-chain NFT gaming platform: players connect a wallet, mint a hand of generative NFTs, and take them into a real-time 2D multiplayer world to trade, battle, and earn soulbound achievement tokens.

## Architecture
The game is split into five independently deployable subsystems: a Next.js/Phaser/Three.js game client, a Socket.IO game server, a Cloudflare Workers backend for persistent progress, a Solidity contract suite, and a generative art engine for the NFT collection.

### Key Design Decisions
- **On-chain truth for ownership:** Minting and ownership are entirely on-chain — the client talks to the deployed contracts directly, no off-chain database of record.
- **Server-authoritative real-time state:** Movement and combat are relayed live through Socket.IO, with positions and health server-validated so clients can't cheat.
- **Wallet-signed persistence:** Every mutating request to the profile/XP backend requires an EIP-191 signature proving control of the wallet being modified.

## What's Next
The roadmap includes AI-driven NPCs for dynamic trade/battle negotiation, Chainlink VRF to replace the current pseudo-random mint draw, and trustless cross-chain bridging via LayerZero.
            `
        },
        {
            id: "firesat-ai",
            title: "FireSat-AI: Wildfire Risk Forecasting",
            tagline: "CNN-LSTM + attention model forecasting wildfire risk from satellite imagery",
            period: "Aug 2026",
            problem: "Wildfire risk models are frequently opaque and rarely disclose where they actually fail, making it hard to trust them for real decisions.",
            solution: "Built an end-to-end pipeline fusing Sentinel-1/2, Landsat, and MODIS satellite imagery with ERA5 reanalysis weather through a CNN + attention encoder feeding a BiLSTM, producing interpretable 1/3/6-month wildfire risk classifications for two fire-active Alaska regions.",
            architecture: [
                "ResNet-style CNN encoder with squeeze-excite channel attention over monthly satellite feature stacks (NDVI, NBR, SAR, fuel moisture)",
                "Bidirectional LSTM over a 24-month lookback, fused with ERA5 weather features",
                "Additive temporal attention feeding three multi-horizon classification heads (No Risk / Moderate / High)",
                "FastAPI backend + Leaflet dashboard exposing risk, attention, and historical trend data",
                "Real acquisition clients for Earth Engine, ERA5, NASA FIRMS, and Alaska Fire Service, plus a physically-motivated synthetic generator for offline development"
            ],
            techStack: ["PyTorch", "FastAPI", "CNN", "BiLSTM", "Attention", "Docker", "GitHub Actions"],
            impact: [
                "49/49 tests passing across feature indices, model, dataset, training, and API layers",
                "Gradient x input saliency and attention visualizations for model interpretability",
                "Evaluation report honestly discloses where the model does and doesn't beat a majority-class baseline"
            ],
            github: "https://github.com/bharat3645/firesat-ai",
            featured: true,
            image: "https://images.unsplash.com/photo-1601582589907-f92af5ed9db8?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
FireSat-AI is a GSoC-style MVP for the "Alaska Wildfire Prediction Using Satellite Imagery" proposal: a hybrid CNN-LSTM + attention model that fuses multi-source satellite imagery with weather reanalysis data to forecast wildfire risk at 1, 3, and 6 month horizons.

## Architecture
Monthly satellite feature stacks pass through a ResNet-style CNN with squeeze-excite channel attention, producing a spatial embedding per month. These are concatenated with ERA5 weather features and fed through a bidirectional LSTM over a 24-month lookback, with additive temporal attention producing the final context vector for three multi-horizon classification heads.

### Interpretability by Design
Both the channel attention and temporal attention are surfaced directly in the API and dashboard, alongside gradient x input saliency maps, so a predicted risk level always comes with an explanation of which regions and months drove it.

## Honesty Notes
The shipped demo ships with a physically-motivated synthetic dataset (real Alaska climate normals, seasonal vegetation cycles) rather than live satellite pulls, and the evaluation report plainly states where the demo checkpoint does and doesn't beat a naive majority-class baseline — reported rather than hidden.
            `
        },
        {
            id: "infranest-platform",
            title: "InfraNest: AI Backend-Generation Platform",
            tagline: "Natural language to a production-ready Django, Go Fiber, or Rails backend",
            period: "Aug 2026",
            problem: "Bootstrapping a new backend service means rewriting the same models, CRUD endpoints, auth wiring, and Docker config over and over, in whichever framework a team happens to use.",
            solution: "Built a platform that turns a plain-English description, or a hand-edited DSL spec, into a real, runnable backend project across three frameworks — verified by CI that builds the generated code with each framework's own toolchain.",
            architecture: [
                "React + Vite + TypeScript frontend with a visual DSL builder",
                "Flask code-generation engine: an agentic parser (GPT-4o/Claude, with a deterministic offline fallback) turns prompts into a validated DSL spec",
                "Three framework generators (Django + DRF, Go Fiber + GORM, Ruby on Rails) rendering Jinja2 templates and structured source",
                "Copilot CLI for describing, previewing, and generating backends from the terminal",
                "CI generator-smoke job that builds each generated project with its real toolchain (manage.py check, go build && go vet, ruby -c)"
            ],
            techStack: ["React", "TypeScript", "Flask", "Jinja2", "Python", "GPT-4o", "Claude", "Docker"],
            impact: [
                "74 backend pytest tests at 94% line coverage, plus 18 frontend Vitest tests",
                "CI verifies generated Django/Go/Rails projects actually compile with their real toolchains, not just that files are produced",
                "Works with zero API keys via a deterministic fallback parser when no LLM key is configured"
            ],
            github: "https://github.com/bharat3645/Backend-Builder",
            featured: true,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
            longDescription: `
## Overview
InfraNest collapses backend bootstrapping into one step: describe the system once, in English or in a small declarative DSL, and get a real, runnable project back for the framework you actually need — Django + DRF, Go Fiber + GORM, or Ruby on Rails.

## Pipeline
A prompt goes through an agentic parser to become a DSL spec; the spec is validated, then handed to one of three generator classes, which render Jinja2 templates (Django) or structured source (Go/Rails) into a project directory, zipped and returned to the client.

### Trust, Not Just Output
Generating files is easy; generating files that actually build is the hard part. CI doesn't just check that the generator ran — it builds every generated project with that ecosystem's real toolchain (\`manage.py check\`, \`go build && go vet\`, \`ruby -c\`) on every push, backed by 74 backend tests at 94% coverage and 18 frontend tests.

## Degrading Gracefully
When no OpenAI or Anthropic key is configured, prompt parsing falls back to a deterministic keyword-based parser instead of failing closed, so the platform works end-to-end with zero external dependencies.
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
