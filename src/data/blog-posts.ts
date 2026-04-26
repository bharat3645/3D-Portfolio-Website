export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-ai-systems',
    title: 'The Future of Distributed AI Systems',
    excerpt: 'How federated learning and edge computing are reshaping AI infrastructure — lessons from building a privacy-preserving fraud detection system with 91% accuracy.',
    date: '2025-01-15',
    readTime: '7 min read',
    category: 'System Architecture',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    content: `
# The Future of Distributed AI Systems

While building a federated learning system for anomaly detection — one that achieved 91% fraud detection accuracy across distributed financial institutions — I kept running into the same fundamental tension: **the data needed to train powerful models is precisely the data organizations are least willing to share**.

This isn't a technical problem. It's a structural one. And it's reshaping how we think about AI infrastructure at scale.

## The Centralized Training Wall

The standard pipeline — collect data → centralize → train → deploy — breaks down the moment you need data that crosses organizational or jurisdictional boundaries. Financial institutions can't pool transaction records. Hospitals can't aggregate patient data across borders. Autonomous vehicle fleets can't share telemetry with competitors.

Yet all of these domains need the pattern-recognition power that comes from massive, diverse datasets.

## Federated Learning as Architecture

Federated learning flips the pipeline. Instead of bringing data to the model, you bring the model to the data.

In the fraud detection system I built using FedML and TensorFlow:

1. A **central coordination server** holds no data — only the global model weights
2. Each **participant node** (representing a financial institution) trains locally on private transaction data
3. Only **model gradients** — not raw data — travel over the network
4. The central server performs **secure aggregation**, averaging updates without seeing individual contributions

The result: a model that learned from data it never directly accessed.

\`\`\`python
# Simplified federated round
def federated_round(global_model, participants):
    local_updates = []
    for node in participants:
        local_model = copy.deepcopy(global_model)
        local_model.train(node.private_data)
        delta = local_model.weights - global_model.weights
        local_updates.append(delta)

    # Secure aggregation — only averaged delta visible
    global_model.weights += np.mean(local_updates, axis=0)
    return global_model
\`\`\`

## Differential Privacy: The Real Guarantee

Gradients alone can leak information. Through gradient inversion attacks, adversaries have demonstrated the ability to reconstruct training images from shared updates.

The fix is differential privacy: add calibrated noise to gradients before sharing.

\`\`\`python
def privatize_gradient(gradient, epsilon=1.0, sensitivity=1.0):
    noise_scale = sensitivity / epsilon
    noise = np.random.laplace(0, noise_scale, gradient.shape)
    return gradient + noise
\`\`\`

The privacy-utility tradeoff is real — more noise means stronger privacy guarantees but reduced model accuracy. At ε=0.5, we saw a 4% accuracy drop. At ε=2.0, the model was practically indistinguishable from centralized training. Finding that sweet spot is the real engineering challenge.

## Edge Computing: The Inference Half

Federated learning solves the training problem. Edge computing solves the inference problem.

Once a model is trained, deploying it centrally creates latency, bandwidth costs, and a single point of failure. Deploying it to edge devices — closer to the data source — solves all three.

In the traffic management system I built for SITNovate, YOLO-based vehicle counting ran on edge devices (Raspberry Pi / Jetson Nano) with results aggregated via MQTT to a central AWS IoT dashboard. Processing at the edge meant sub-100ms response times for signal timing decisions.

## What This Means for AI Infrastructure

The next decade of AI infrastructure won't be dominated by who has the largest GPU cluster. It'll be dominated by who can build systems that:

- **Learn without seeing** — federated training over private data
- **Act without phoning home** — edge inference with local decision-making
- **Adapt without retraining** — continual learning from local distributions

The centralized AI paradigm was a function of bandwidth limitations and organizational trust gaps that are slowly closing. The distributed AI paradigm is what comes after.

We're early. The tooling is rough. But the direction is clear.

---

*This post draws from my SCOPUS-indexed research paper: "Privacy-Preserving Anomaly Detection in Federated Learning" (2025) and practical experience building the system during my final year at SIT Nagpur.*
    `
  },
  {
    slug: 'optimizing-threejs-react',
    title: 'Optimizing 3D in React: From Janky to Buttery',
    excerpt: 'Hard-won lessons from building a 3D portfolio with Three.js and React Three Fiber — instancing, texture compression, context management, and why your GPU is probably doing more work than it needs to.',
    date: '2024-12-28',
    readTime: '9 min read',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    content: `
# Optimizing 3D in React: From Janky to Buttery

Building this portfolio taught me things about browser GPU pipelines I genuinely did not want to learn. The hard way.

Multiple simultaneous WebGL contexts. Unpooled geometries. Uncompressed 4K textures. At one point, I had three separate Three.js Canvas instances running on a single page, each fighting for GPU memory on mid-range hardware.

This is the post I wish existed before I started.

## The WebGL Context Problem

Browsers limit WebGL contexts to roughly 8–16 per page. Each \`<Canvas>\` in React Three Fiber creates one. When you exceed the limit, the browser starts destroying old contexts — silently, with no warning — and your scenes go blank.

More practically: even below the limit, each context maintains its own GPU memory pool, shader compilation cache, and state machine. Three simultaneous contexts on a mid-range GPU means three separate texture caches, three sets of compiled shaders, three draw call queues.

**The fix**: Consolidate. One canvas per page where possible. Use a single R3F \`<Canvas>\` and compose scenes with portals when you need multiple "views."

\`\`\`tsx
// ❌ Three separate contexts — expensive
<Canvas> <HeroScene /> </Canvas>
<Canvas> <BackgroundScene /> </Canvas>
<Canvas> <FooterScene /> </Canvas>

// ✅ One context, composed
<Canvas>
  <HeroScene />
  <BackgroundScene />
</Canvas>
// Footer scene: defer mount with IntersectionObserver
\`\`\`

## Instancing: The Single Biggest Win

If you're rendering the same geometry multiple times — particles, stars, a grid of cubes — you should almost always be using instanced meshes.

Normal rendering: N draw calls for N objects.
Instanced rendering: 1 draw call for N objects.

\`\`\`tsx
// ❌ 500 separate meshes = 500 draw calls
{stars.map((s, i) => (
  <mesh key={i} position={s.position}>
    <sphereGeometry args={[0.01, 4, 4]} />
    <meshBasicMaterial color="white" />
  </mesh>
))}

// ✅ 1 instanced mesh = 1 draw call
const mesh = useRef()
useEffect(() => {
  const matrix = new THREE.Matrix4()
  stars.forEach((s, i) => {
    matrix.setPosition(s.x, s.y, s.z)
    mesh.current.setMatrixAt(i, matrix)
  })
  mesh.current.instanceMatrix.needsUpdate = true
}, [])

<instancedMesh ref={mesh} args={[null, null, 500]}>
  <sphereGeometry args={[0.01, 4, 4]} />
  <meshBasicMaterial color="white" />
</instancedMesh>
\`\`\`

In the starfield I built for this portfolio, switching from 5000 individual Points to a single instanced setup dropped GPU time by ~60%.

## Texture Compression

Uncompressed textures are a silent killer. A 2048×2048 RGBA texture is 16MB in GPU memory. Load five of them and you've consumed 80MB before rendering a single frame.

GPU-native compressed formats (KTX2, Basis) provide 4–8× compression with negligible visual loss:

\`\`\`tsx
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'

const loader = new KTX2Loader()
  .setTranscoderPath('/basis/')
  .detectSupport(gl)

const texture = await loader.loadAsync('/textures/earth.ktx2')
\`\`\`

The Three.js Draco and KTX2 loaders handle this well. The tooling overhead at build time is real, but the runtime gain is worth it for any texture above 512×512.

## Geometry Pooling

Three.js geometries are expensive to create and not garbage collected until explicitly disposed. If you're creating geometries inside components that mount/unmount frequently, you're leaking GPU memory.

\`\`\`tsx
// ❌ New geometry on every render
function Particle({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial />
    </mesh>
  )
}

// ✅ Shared geometry reference
const SPHERE_GEO = new THREE.SphereGeometry(0.05, 8, 8)

function Particle({ position }) {
  return (
    <mesh position={position} geometry={SPHERE_GEO}>
      <meshBasicMaterial />
    </mesh>
  )
}
\`\`\`

## DPR Control

Device Pixel Ratio is perhaps the single highest-leverage knob. A Retina display at DPR=3 means 9× the pixels of DPR=1. For a 1440p monitor, that's rendering at 4320p equivalent.

\`\`\`tsx
<Canvas
  dpr={[1, 1.5]}  // Never exceed 1.5x — imperceptible difference above this
  performance={{ min: 0.5 }}  // Allow R3F to drop quality under load
>
\`\`\`

The \`performance.min\` setting is underused. It allows React Three Fiber to dynamically reduce the DPR when FPS drops — essentially adaptive resolution, like console games have done for years.

## Defer Everything Below the Fold

The Earth canvas in this portfolio's footer section was killing performance on first load — loading a 3D model, compiling shaders, building BVH acceleration structures — all before the user had scrolled anywhere near it.

The fix is an IntersectionObserver that only mounts the Canvas when the user is within 400px of the section:

\`\`\`tsx
const [earthMounted, setEarthMounted] = useState(false)
const ref = useRef(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setEarthMounted(true) },
    { rootMargin: '400px' }
  )
  observer.observe(ref.current)
  return () => observer.disconnect()
}, [])

return (
  <section ref={ref}>
    {earthMounted && <EarthCanvas />}
  </section>
)
\`\`\`

## The Real Lesson

The browser GPU pipeline has no magic. Every pixel you ask it to draw costs something. Every texture you upload occupies memory. Every shader you compile takes time.

The web 3D ecosystem has gotten dramatically better — R3F, Drei, and the Three.js ecosystem make it easy to build impressive things. The flip side is that it's also very easy to build impressively slow things without realizing it.

Profile first. Assume nothing. And DPR clamp to 1.5.

---

*Built with React Three Fiber 8.16, Three.js 0.165, and increasingly strong opinions about WebGL context management.*
    `
  },
  {
    slug: 'nextjs-14-server-actions',
    title: 'Building Type-Safe APIs with Next.js 14 Server Actions',
    excerpt: 'Why Server Actions are the most underrated feature in modern React — and how to use them to build end-to-end type-safe full-stack applications without a separate API layer.',
    date: '2024-11-10',
    readTime: '8 min read',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop',
    content: `
# Building Type-Safe APIs with Next.js 14 Server Actions

For three years, every Next.js project I built had the same structure: a \`/pages/api\` or \`/app/api\` folder full of route handlers, a \`lib/api-client.ts\` that typed the fetch calls, and a constant mental overhead of keeping the two in sync.

Server Actions in Next.js 14 eliminated most of that overhead. Here's why they matter, and how to use them correctly.

## What Server Actions Actually Are

A Server Action is an async function marked with \`"use server"\` that executes on the server but can be called directly from client components. The Next.js compiler handles the network boundary — you write a function call, it becomes an HTTP request under the hood.

\`\`\`ts
// app/actions/contact.ts
"use server"

import { z } from "zod"
import { Resend } from "resend"

const ContactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
})

export async function sendContactEmail(
  input: z.infer<typeof ContactSchema>
): Promise<{ success: boolean; error?: string }> {
  const result = ContactSchema.safeParse(input)

  if (!result.success) {
    return { success: false, error: "Invalid input" }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: "portfolio@404ghost.dev",
      to: "bharat3645@gmail.com",
      subject: \`Contact from \${result.data.name}\`,
      html: \`<p>\${result.data.message}</p>\`,
    })
    return { success: true }
  } catch {
    return { success: false, error: "Failed to send" }
  }
}
\`\`\`

\`\`\`tsx
// app/contact/page.tsx (Client Component)
"use client"

import { sendContactEmail } from "@/app/actions/contact"

export function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await sendContactEmail({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    })

    if (result.success) toast.success("Message sent!")
    else toast.error(result.error)
  }

  return <form onSubmit={handleSubmit}>{/* fields */}</form>
}
\`\`\`

The type safety flows end-to-end. If you change the signature of \`sendContactEmail\`, TypeScript errors immediately at every call site — no OpenAPI spec, no codegen, no manual sync.

## The Architecture Advantage

Traditional Next.js API routes create an artificial layer:

\`\`\`
Client Component
    ↓ fetch("/api/contact", { method: "POST", body: ... })
Route Handler (/api/contact/route.ts)
    ↓ parse, validate, execute
Business Logic
\`\`\`

Server Actions collapse this:

\`\`\`
Client Component
    ↓ await sendContactEmail({ ... })
Business Logic (runs on server)
\`\`\`

The intermediate layer — the route handler — is gone. You still get server execution, but without the indirection.

## Progressive Enhancement

One underappreciated property of Server Actions: they work without JavaScript.

If you wire them to a \`<form action={serverAction}>\` rather than an \`onSubmit\` handler, the form submits via a standard HTTP POST even if JavaScript hasn't loaded yet. The action still executes on the server. This is progressive enhancement by default.

\`\`\`tsx
// This works even with JS disabled
export function ContactForm() {
  return (
    <form action={sendContactEmail}>
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send</button>
    </form>
  )
}
\`\`\`

## Validation Pattern: Zod + Server Actions

The cleanest pattern I've found is Zod validation at the server action boundary. Never trust client input, even from your own forms.

\`\`\`ts
import { z } from "zod"

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fields?: Record<string, string[]> }

function createAction<TInput, TOutput>(
  schema: z.ZodType<TInput>,
  handler: (input: TInput) => Promise<TOutput>
) {
  return async (input: unknown): Promise<ActionResult<TOutput>> => {
    const result = schema.safeParse(input)

    if (!result.success) {
      return {
        success: false,
        error: "Validation failed",
        fields: result.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    try {
      const data = await handler(result.data)
      return { success: true, data }
    } catch (err) {
      return { success: false, error: "Server error" }
    }
  }
}

// Usage
export const sendContactEmail = createAction(
  ContactSchema,
  async ({ name, email, message }) => {
    // guaranteed-valid input
    await resend.emails.send({ ... })
  }
)
\`\`\`

## When Not to Use Server Actions

Server Actions aren't for everything. Avoid them for:

- **High-frequency requests** — polling, real-time updates, WebSocket alternatives. Use Route Handlers + SSE or WebSockets instead.
- **External API calls where you own the API** — if you're also the API consumer from mobile apps, keep Route Handlers for the shared endpoint.
- **File uploads to third-party storage** — presigned URLs + direct upload is still the right pattern.
- **Anything that needs request-level caching** — Route Handlers integrate better with Next.js \`fetch\` caching semantics.

For mutations from React components — contact forms, auth flows, data writes, user preferences — Server Actions are the cleanest primitive available in Next.js today.

---

*This pattern powers the contact form on this portfolio. The full implementation uses React Hook Form for client-side UX + Zod on the server action boundary + Resend for email delivery.*
    `
  }
];
