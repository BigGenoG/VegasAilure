'use client';

import Link from 'next/link';

export default function PromotionSection() {
  return (
    <div className="pool-season">
      <div className="pool-season-content">
        <h2 className="pool-season-title">
          POOL SEASON<br />IS HERE
        </h2>
        <p className="pool-season-subtitle">
          Make a splash with an unforgettable Vegas getaway
        </p>
        <Link href="/stay/pool-party-picks">
          <button className="pool-season-button">
            Explore Stays
          </button>
        </Link>
      </div>
    </div>
  );
}
