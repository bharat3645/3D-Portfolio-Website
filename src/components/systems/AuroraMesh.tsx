'use client';

// Pure CSS radial gradients — identical look to blur-based aurora but zero filter cost
export function AuroraMesh() {
    return (
        <div className="aurora-mesh" aria-hidden="true">
            <div className="aurora-orb aurora-orb--crimson" />
            <div className="aurora-orb aurora-orb--cyan" />
            <div className="aurora-orb aurora-orb--purple" />
        </div>
    );
}
