"use client";

import Link from "next/link";
import { useState } from "react";
import { clientPrepChecklist, serviceLimitations } from "@/lib/services";

export type ChecklistTierFilter = "all" | "standard" | "deep" | "move-out";

type InclusionTier = "all-visits" | "deep-and-move" | "move-out-only";

type ChecklistTask = {
  id: number;
  task: string;
  note?: string;
  inclusion: InclusionTier;
};

type RoomCard = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tasks: ChecklistTask[];
};

const FILTER_TABS: {
  key: ChecklistTierFilter;
  label: string;
  popular?: boolean;
  quoteHref: string;
}[] = [
  {
    key: "all",
    label: "Compare All 3",
    quoteHref: "/book-now",
  },
  {
    key: "standard",
    label: "Standard ($165+)",
    quoteHref: "/book-now?service=standard-cleaning",
  },
  {
    key: "deep",
    label: "Deep Clean ($235+)",
    popular: true,
    quoteHref: "/book-now?service=deep-cleaning",
  },
  {
    key: "move-out",
    label: "Move-In / Out ($325+)",
    quoteHref: "/book-now?service=move-out-cleaning",
  },
];

const ROOM_CARDS: RoomCard[] = [
  {
    id: "room-kitchen",
    number: "01",
    title: "Kitchen & Dining",
    subtitle:
      "Accessible counters, sinks, stovetops, appliance exteriors, floors, and empty-cabinet turnover work.",
    tasks: [
      {
        id: 1,
        task: "Counters and backsplashes wiped where cleared",
        inclusion: "all-visits",
      },
      {
        id: 2,
        task: "Kitchen sink scrubbed and faucet fixtures shined",
        inclusion: "all-visits",
      },
      {
        id: 3,
        task: "Stovetop, burner grates, and control knobs cleaned",
        inclusion: "all-visits",
      },
      {
        id: 4,
        task: "Empty microwave interior wiped clean when accessible",
        inclusion: "all-visits",
      },
      {
        id: 5,
        task: "Range hood exterior wiped and shined",
        inclusion: "all-visits",
      },
      {
        id: 6,
        task: "Dishwasher and major appliance exteriors wiped",
        note: "Inside oven ($45) and inside refrigerator ($35) are optional add-ons",
        inclusion: "all-visits",
      },
      {
        id: 7,
        task: "Cabinet and drawer fronts spot-cleaned",
        inclusion: "all-visits",
      },
      {
        id: 8,
        task: "Kitchen and dining floors vacuumed or swept and mopped",
        inclusion: "all-visits",
      },
      {
        id: 9,
        task: "Accessible kitchen trash bins emptied",
        inclusion: "all-visits",
      },
      {
        id: 10,
        task: "Cabinet fronts, handles, and reachable small-appliance exteriors detailed",
        inclusion: "deep-and-move",
      },
      {
        id: 11,
        task: "Range hood filter degreased and dishwasher interior checked",
        inclusion: "move-out-only",
      },
      {
        id: 12,
        task: "Empty kitchen cabinet, pantry shelf, and drawer interiors wiped",
        note: "Included when empty on Move-In / Move-Out; optional add-on on occupied homes",
        inclusion: "move-out-only",
      },
    ],
  },
  {
    id: "room-bathrooms",
    number: "02",
    title: "Bathrooms & Tile",
    subtitle:
      "Toilets, tubs, showers, mirrors, vanities, and reachable tile buildup across every bathroom.",
    tasks: [
      {
        id: 13,
        task: "Toilets scrubbed and disinfected inside, behind, and around the base",
        inclusion: "all-visits",
      },
      {
        id: 14,
        task: "Tub and shower surfaces cleaned and rinsed",
        inclusion: "all-visits",
      },
      {
        id: 15,
        task: "Vanity counters, sinks, and chrome fixtures cleaned and polished",
        inclusion: "all-visits",
      },
      {
        id: 16,
        task: "Bathroom mirrors and reachable glass cleaned",
        inclusion: "all-visits",
      },
      {
        id: 17,
        task: "Bathroom cabinet fronts spot-cleaned",
        inclusion: "all-visits",
      },
      {
        id: 18,
        task: "Bathroom floors vacuumed or swept and mopped",
        inclusion: "all-visits",
      },
      {
        id: 19,
        task: "Accessible bathroom trash bins emptied",
        inclusion: "all-visits",
      },
      {
        id: 20,
        task: "Shower glass, tile, and light bathroom buildup detailed",
        note: "Permanent hard-water etching or damaged grout may remain",
        inclusion: "deep-and-move",
      },
      {
        id: 21,
        task: "Reachable grout lines and fixture bases detailed",
        inclusion: "deep-and-move",
      },
      {
        id: 22,
        task: "Bathroom floor edges and corners detailed",
        inclusion: "deep-and-move",
      },
      {
        id: 23,
        task: "Empty bathroom vanity cabinet and drawer interiors wiped",
        inclusion: "move-out-only",
      },
    ],
  },
  {
    id: "room-living",
    number: "03",
    title: "Bedrooms & Living Areas",
    subtitle:
      "Accessible dusting, fans, mirrors, carpets, hardwood, tile, and LVP floor care.",
    tasks: [
      {
        id: 24,
        task: "Accessible dressers, nightstands, tables, and surfaces dusted",
        note: "We clean around personal items left out; organizing is not included",
        inclusion: "all-visits",
      },
      {
        id: 25,
        task: "Light fixtures and ceiling fans dusted within normal reach",
        inclusion: "all-visits",
      },
      {
        id: 26,
        task: "Mirrors and reachable interior glass surfaces cleaned",
        inclusion: "all-visits",
      },
      {
        id: 27,
        task: "Visible cobwebs removed within normal reach",
        inclusion: "all-visits",
      },
      {
        id: 28,
        task: "Carpeted rooms, stairs, and area rugs vacuumed",
        inclusion: "all-visits",
      },
      {
        id: 29,
        task: "Hardwood, tile, and LVP floors swept and mopped",
        inclusion: "all-visits",
      },
      {
        id: 30,
        task: "Accessible bedroom and living-area trash bins emptied",
        inclusion: "all-visits",
      },
      {
        id: 31,
        task: "Reachable high ledges and shelf tops dusted",
        inclusion: "deep-and-move",
      },
      {
        id: 32,
        task: "Ceiling fan blades detailed within normal reach",
        inclusion: "deep-and-move",
      },
      {
        id: 33,
        task: "Under accessible furniture vacuumed without heavy moving",
        inclusion: "deep-and-move",
      },
      {
        id: 34,
        task: "Empty-room floors vacuumed edge to edge and mopped",
        inclusion: "move-out-only",
      },
    ],
  },
  {
    id: "room-details",
    number: "04",
    title: "Doors, Trim, Closets & Details",
    subtitle:
      "Baseboards, vents, switch plates, door frames, window sills, blinds, and empty closets.",
    tasks: [
      {
        id: 35,
        task: "Entry handles and main high-touch door hardware wiped",
        inclusion: "all-visits",
      },
      {
        id: 36,
        task: "Open hallway floors and room transitions vacuumed and mopped",
        inclusion: "all-visits",
      },
      {
        id: 37,
        task: "Accessible baseboards wiped across rooms and hallways",
        inclusion: "deep-and-move",
      },
      {
        id: 38,
        task: "Reachable vent covers and return air grilles wiped",
        inclusion: "deep-and-move",
      },
      {
        id: 39,
        task: "Light switch plates and outlet covers wiped",
        inclusion: "deep-and-move",
      },
      {
        id: 40,
        task: "Door frames, trim, and door fronts spot-cleaned and detailed",
        inclusion: "deep-and-move",
      },
      {
        id: 41,
        task: "Accessible interior window sills wiped",
        inclusion: "deep-and-move",
      },
      {
        id: 42,
        task: "Floor edges and room corners detailed",
        inclusion: "deep-and-move",
      },
      {
        id: 43,
        task: "Accessible blinds dusted where intact and safe to handle",
        note: "Included on Move-In / Move-Out; optional add-on ($5/set) on Standard or Deep",
        inclusion: "move-out-only",
      },
      {
        id: 44,
        task: "Empty closet shelves and hanging rods wiped",
        inclusion: "move-out-only",
      },
      {
        id: 45,
        task: "Empty hallway cabinets and built-in drawers wiped inside",
        inclusion: "move-out-only",
      },
    ],
  },
];

const OPTIONAL_ADDONS = [
  {
    title: "Inside Oven",
    price: "$45",
    description:
      "Interior oven racks, walls, and door glass cleaned when the oven is empty, cool, and safe to service.",
  },
  {
    title: "Inside Refrigerator",
    price: "$35",
    description:
      "Interior shelves, drawers, and walls wiped clean when food is removed or consolidated before arrival.",
  },
  {
    title: "Interior Window Glass",
    price: "$6/pane",
    description:
      "Reachable interior window glass polished clean. Screens, exterior windows, and ladder work are excluded.",
  },
  {
    title: "Window Tracks & Sills",
    price: "$3/window",
    description:
      "Reachable interior window tracks and sills vacuumed and wiped for built-up valley dust.",
  },
  {
    title: "Blind Dusting",
    price: "$5/set",
    description:
      "Light dusting on accessible, intact blinds. Already included in Move-In / Move-Out when safe to handle.",
  },
  {
    title: "Carpet Shampoo",
    price: "$60/room",
    description:
      "Optional per-room carpet shampoo refresh when requested ahead of time and listed on your confirmed quote.",
  },
] as const;

function isTaskIncluded(task: ChecklistTask, tier: Exclude<ChecklistTierFilter, "all">): boolean {
  if (tier === "standard") return task.inclusion === "all-visits";
  if (tier === "deep") return task.inclusion === "all-visits" || task.inclusion === "deep-and-move";
  return true;
}

function pillForInclusion(inclusion: InclusionTier): { label: string; className: string } {
  if (inclusion === "all-visits") {
    return { label: "All Visits", className: "fcl-pill fcl-pill-all" };
  }
  if (inclusion === "deep-and-move") {
    return { label: "+ Deep & Move-Out", className: "fcl-pill fcl-pill-deep" };
  }
  return { label: "Move-Out Empty Home", className: "fcl-pill fcl-pill-move" };
}

const TOTAL_TASKS = ROOM_CARDS.reduce((sum, room) => sum + room.tasks.length, 0);

export default function FresnoInteractiveChecklist() {
  const [activeTier, setActiveTier] = useState<ChecklistTierFilter>("all");

  const activeTab = FILTER_TABS.find((tab) => tab.key === activeTier) ?? FILTER_TABS[0];
  const includedCount =
    activeTier === "all"
      ? TOTAL_TASKS
      : ROOM_CARDS.reduce(
          (sum, room) => sum + room.tasks.filter((t) => isTaskIncluded(t, activeTier)).length,
          0,
        );

  return (
    <div className="fcl-wrap">
      {/* Sticky Filter Tabs + Live Task Counter */}
      <div className="fcl-sticky-bar">
        <div className="fcl-tabs" role="tablist" aria-label="Filter room checklist by service tier">
          {FILTER_TABS.map((tab) => {
            const selected = activeTier === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTier(tab.key)}
                className={`fcl-tab${selected ? " is-active" : ""}`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="fcl-meta-row" aria-live="polite">
          <div className="fcl-counter">
            <strong>
              {activeTier === "all"
                ? `${TOTAL_TASKS} Tasks`
                : `${includedCount} of ${TOTAL_TASKS} Included`}
            </strong>
            <span>
              {activeTier === "all"
                ? "Showing all room touchpoints side by side"
                : `Active scope: ${activeTab.label}`}
            </span>
          </div>

          <div className="fcl-legend" aria-label="Inclusion key">
            <span className="fcl-pill fcl-pill-all">All Visits</span>
            <span className="fcl-pill fcl-pill-deep">+ Deep &amp; Move-Out</span>
            <span className="fcl-pill fcl-pill-move">Move-Out Empty Home</span>
          </div>
        </div>
      </div>

      {/* 2x2 Visual Room Cards */}
      <div className="fcl-rooms-grid">
        {ROOM_CARDS.map((room) => {
          const roomIncludedCount =
            activeTier === "all"
              ? room.tasks.length
              : room.tasks.filter((t) => isTaskIncluded(t, activeTier)).length;

          return (
            <article key={room.id} id={room.id} className="fcl-room-card">
              <header className="fcl-room-head">
                <div>
                  <span className="fcl-room-kicker">Room {room.number}</span>
                  <h3>{room.title}</h3>
                  <p>{room.subtitle}</p>
                </div>
                <span className="fcl-room-count">
                  {activeTier === "all"
                    ? `${room.tasks.length} items`
                    : `${roomIncludedCount}/${room.tasks.length} included`}
                </span>
              </header>

              <ul className="fcl-task-list">
                {room.tasks.map((item) => {
                  const pill = pillForInclusion(item.inclusion);
                  const included =
                    activeTier === "all" ? true : isTaskIncluded(item, activeTier);
                  const unlockTier: Exclude<ChecklistTierFilter, "all"> =
                    item.inclusion === "deep-and-move" ? "deep" : "move-out";
                  const unlockText =
                    item.inclusion === "deep-and-move"
                      ? "Unlocks in Deep ($235+)"
                      : "Unlocks in Move-Out ($325+)";

                  return (
                    <li
                      key={item.id}
                      className={`fcl-task-row${included ? "" : " is-locked"}`}
                    >
                      <div className="fcl-task-main">
                        <span className="fcl-task-check" aria-hidden="true">
                          {included ? "✓" : "+"}
                        </span>
                        <div className="fcl-task-copy">
                          <strong>{item.task}</strong>
                          {item.note ? <small>{item.note}</small> : null}
                        </div>
                      </div>

                      <div className="fcl-task-status">
                        {included ? (
                          <span className={pill.className}>{pill.label}</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveTier(unlockTier)}
                            className="fcl-unlock-btn"
                          >
                            {unlockText} →
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>

      {/* Visual Optional Add-Ons Card Strip */}
      <section id="optional-addons" className="fcl-addons-box" aria-labelledby="fcl-addons-heading">
        <div className="fcl-addons-head">
          <div>
            <span className="fcl-addons-kicker">Optional Extras · Fresno, Clovis &amp; Madera</span>
            <h3 id="fcl-addons-heading">Optional Add-Ons Quoted Upfront</h3>
          </div>
          <p>
            Request any add-on before your appointment so your confirmed quote and cleaner schedule
            include the right time. Empty cabinet, drawer, and closet interiors are already included
            in Move-In / Move-Out cleaning.
          </p>
        </div>

        <div className="fcl-addons-grid">
          {OPTIONAL_ADDONS.map((addon) => (
            <article key={addon.title} className="fcl-addon-card">
              <div className="fcl-addon-top">
                <strong>{addon.title}</strong>
                <span className="fcl-addon-price">{addon.price}</span>
              </div>
              <p>{addon.description}</p>
            </article>
          ))}
        </div>

        <div className="fcl-addons-note">
          <span>
            Need oven, fridge, interior windows, or blinds added? Select them when requesting your
            quote so there are zero day-of surprises.
          </span>
          <Link href={activeTab.quoteHref} className="home-button">
            Request Quote With Extras <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Side-by-Side 5-Minute Prep vs Honest Boundaries */}
      <div className="fcl-boundaries-grid">
        <article className="fcl-boundary-card fcl-boundary-prep">
          <div>
            <span className="fcl-pill fcl-pill-all">Quick Client Prep</span>
            <h3 className="mt-2">5-Minute Prep Before We Arrive</h3>
            <p className="fcl-boundary-lead mt-1">
              Quick prep keeps counters and floors open so your cleaner spends the visit cleaning
              surfaces rather than working around items:
            </p>
          </div>
          <ul className="fcl-boundary-list">
            {clientPrepChecklist.map((step) => (
              <li key={step}>
                <span className="fcl-boundary-icon" aria-hidden="true">
                  ✓
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="fcl-boundary-card fcl-boundary-limits">
          <div>
            <span className="fcl-pill fcl-pill-deep">Scope Boundaries</span>
            <h3 className="mt-2">Honest Boundaries (Not Included)</h3>
            <p className="fcl-boundary-lead mt-1">
              Laundry, dishes, bed making, organizing, packing, moving furniture, exterior windows,
              and biohazards are outside our residential cleaning service:
            </p>
          </div>
          <ul className="fcl-boundary-list">
            {serviceLimitations.map((limit) => (
              <li key={limit}>
                <span className="fcl-boundary-icon" aria-hidden="true">
                  ✕
                </span>
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
