import type { CMEEvent } from "../types/cme.ts";

/**
 * Notable coronal mass ejections observed by SOHO (Solar and Heliospheric Observatory)
 * over the last 30 years.
 *
 * Source IDs reference Helioviewer data sources:
 *   4 = SOHO LASCO C2 (coronagraph, rendered as plane)
 *   5 = SOHO LASCO C3 (coronagraph, rendered as plane)
 *  13 = SDO AIA 304 (EUV, rendered on hemisphere)
 *
 * For CMEs, LASCO C2 (sourceId: 4) provides the best view of the ejection
 * expanding through the corona.
 */
const cmeEvents: CMEEvent[] = [
  {
    id: "1997-01-halo",
    name: "The Stealth Storm",
    date: "1997-01-06",
    startTime: "1997-01-06T14:00:00Z",
    endTime: "1997-01-06T20:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "A1.1",
    description:
      "One of the earliest significant halo CMEs recorded by SOHO/LASCO. Despite a very weak flare, this CME caused a notable geomagnetic storm, proving that CMEs — not flares — are the key drivers of space weather.",
    earthEffects:
      "Moderate geomagnetic storm on Jan 10-11, 1997. Demonstrated that weak solar surface activity can still produce significant geomagnetic disturbances.",
    source: "NASA CDAW SOHO/LASCO Halo CME Catalog; Webb et al. 1998",
    sourceUrl: "https://cdaw.gsfc.nasa.gov/CME_list/halo/halo.html",
  },
  {
    id: "2000-07-bastille",
    name: "The Bastille Day Storm",
    date: "2000-07-14",
    startTime: "2000-07-14T10:00:00Z",
    endTime: "2000-07-14T16:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X5.7",
    description:
      "An X5.7-class flare from AR9077 launched a fast halo CME at ~1500 km/s. The first extreme geomagnetic storm observed with the full fleet of modern solar satellites including SOHO, TRACE, ACE, and Wind.",
    earthEffects:
      "G5 extreme geomagnetic storm (Kp=9, Dst=-301 nT). Aurora visible as far south as El Paso, Texas. Solar wind speed jumped to 900 km/s. Minor satellite and power transformer damage.",
    source: "NOAA NESDIS; NASA; ESA SOHO",
    sourceUrl:
      "https://www.nesdis.noaa.gov/news/25th-anniversary-of-the-bastille-day-solar-event",
  },
  {
    id: "2001-04-x20",
    name: "The X20 Monster",
    date: "2001-04-02",
    startTime: "2001-04-02T21:00:00Z",
    endTime: "2001-04-03T03:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X20",
    description:
      "Active Region 9393 unleashed the biggest X-ray flare on record at the time, classified as X20 after the GOES sensors saturated. The CME traveled at ~2300 km/s and was observed overtaking a previous CME.",
    earthEffects:
      "Directed mostly off the west limb, limiting Earth impact. G2-G3 moderate storm on April 4-5. R4 radio blackout on the sunlit side during the flare.",
    source: "NASA SOHO Hotshots; ESA; NOAA SWPC",
    sourceUrl: "https://soho.nascom.nasa.gov/hotshots/",
  },
  {
    id: "2003-10-halloween1",
    name: "Halloween Storm: The First Punch",
    date: "2003-10-28",
    startTime: "2003-10-28T10:30:00Z",
    endTime: "2003-10-28T16:30:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X17.2",
    description:
      "AR 10486 produced an X17.2 flare and an enormous Earth-directed halo CME traveling at 2125-2300 km/s with the largest kinetic energy ever measured. Transit time to Earth was only 18.9 hours.",
    earthEffects:
      "G5 extreme storm lasting 27 hours. Power blackout in Malmoe, Sweden. 12 transformers disabled in South Africa. ISS astronauts took shelter. Aurora visible from Texas and Mediterranean Europe.",
    source:
      "NASA SOHO Hotshots; NOAA SWPC Service Assessment; Gopalswamy et al. 2006",
    sourceUrl: "https://soho.nascom.nasa.gov/hotshots/X17/",
  },
  {
    id: "2003-10-halloween2",
    name: "Halloween Storm: The Second Blow",
    date: "2003-10-29",
    startTime: "2003-10-29T20:00:00Z",
    endTime: "2003-10-30T02:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X10",
    description:
      "Less than 24 hours after the X17.2, AR 10486 produced another X10 flare and powerful Earth-directed CME at ~1948 km/s. Two 'fast transit' CMEs on consecutive days — unprecedented.",
    earthEffects:
      "Extended the already-extreme storm conditions. Additional satellite anomalies. Dst values reached -353 nT and -383 nT between Oct 29 and Nov 2.",
    source: "NOAA SWPC Service Assessment; NASA",
    sourceUrl:
      "https://www.weather.gov/media/publications/assessments/SWstorms_assessment.pdf",
  },
  {
    id: "2003-11-record",
    name: "The X28 — Most Powerful Flare Ever Recorded",
    date: "2003-11-04",
    startTime: "2003-11-04T19:00:00Z",
    endTime: "2003-11-05T01:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X28+",
    description:
      "AR 10486 unleashed the most powerful X-ray flare ever measured by GOES — initially X28, later modeled as potentially X45. The ultrafast CME reached 2657 km/s. Because the source was near the limb, the CME was directed mostly away from Earth.",
    earthEffects:
      "Limited direct Earth impact (glancing blow). Had it been aimed at Earth, scientists speculate it could have rivaled the 1859 Carrington Event. Detected by Mars Odyssey, Ulysses, Cassini, and Voyager 2.",
    source: "NASA SOHO Hotshots; ESA; NOAA SEC; ScienceDaily",
    sourceUrl:
      "https://www.esa.int/Science_Exploration/Space_Science/Extreme_space/The_biggest_solar_X-ray_flare_ever_is_classified_as_X28",
  },
  {
    id: "2012-07-nearmiss",
    name: "The Carrington-Class Near Miss",
    date: "2012-07-23",
    startTime: "2012-07-23T01:00:00Z",
    endTime: "2012-07-23T07:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "N/A (far-side)",
    description:
      "A massive CME from AR 1520 with initial speed of 2500 km/s, reaching STEREO-A at 3300 km/s — the fastest CME ever recorded by STEREO. If erupted just 9 days earlier, it would have been a direct hit on Earth.",
    earthEffects:
      "No direct Earth impact — missed by ~9 days of solar rotation. If it had hit, estimated Dst -1150 to -600 nT. Estimated US economic cost: $600 billion to $2.6 trillion.",
    source: "NASA Science; Baker et al. 2013; Liu et al. 2014 (Nature Comms)",
    sourceUrl:
      "https://science.nasa.gov/science-research/planetary-science/23jul_superstorm/",
  },
  {
    id: "2017-09-x93",
    name: "The Solar Cycle 24 Surprise",
    date: "2017-09-06",
    startTime: "2017-09-06T11:30:00Z",
    endTime: "2017-09-06T17:30:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X9.3",
    description:
      "During the declining phase of Solar Cycle 24, AR 12673 produced two major flares in one day: X2.2 and X9.3 — the most intense flare of Cycle 24. The CME was an asymmetric full halo at 1700-1800 km/s.",
    earthEffects:
      "CME arrived a full day early. G4 severe geomagnetic storm. GPS positioning errors increased 4x. HF radio blackouts. Triggered global aurora on Mars 25x brighter than any previously seen.",
    source: "NOAA SWPC; NASA GOES-16; SOHO/LASCO; SpaceWeatherLive",
    sourceUrl:
      "https://www.spaceweatherlive.com/en/news/view/303/20170906-x93-earth-directed-coronal-mass-ejection.html",
  },
  {
    id: "2024-05-gannon",
    name: "The Gannon Storm (Mother's Day)",
    date: "2024-05-09",
    startTime: "2024-05-09T08:00:00Z",
    endTime: "2024-05-09T14:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X2.25",
    description:
      "A series of CMEs from AR 13664/13668 including a 'cannibal CME' where a faster CME caught up with and merged with a slower one. Solar wind speed reached 1000 km/s. Best-documented geomagnetic storm in history.",
    earthEffects:
      "G5 extreme storm (first since 2003). Aurora visible from Florida Keys, Hawaii, Puerto Rico, Spain, Iran, and near Beijing. Starlink degraded. Two extra radiation belts created.",
    source: "NASA Science; NOAA SWPC; Kim et al. 2024",
    sourceUrl:
      "https://science.nasa.gov/science-research/heliophysics/how-nasa-tracked-the-most-intense-solar-storm-in-decades/",
  },
  {
    id: "2024-10-x90",
    name: "The Cycle 25 Record-Breaker",
    date: "2024-10-03",
    startTime: "2024-10-03T11:30:00Z",
    endTime: "2024-10-03T17:30:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X9.0",
    description:
      "The strongest solar flare of Solar Cycle 25, an X9.0 from AR 3842. A full halo CME was produced with shock velocity of ~573 km/s. This period coincided with the Sun reaching its solar maximum.",
    earthEffects:
      "Communication blackout over parts of Africa and the South Atlantic during the flare. G4 severe storm on October 10-11. Widespread aurora visible across the US including Florida.",
    source: "NOAA SWPC; NASA SVS; SOHO/LASCO CME Catalog (CDAW)",
    sourceUrl:
      "https://watchers.news/2024/10/03/major-x9-0-solar-flare-erupts-from-geoeffective-region-3842-the-strongest-of-solar-cycle-25-cme-produced/",
  },
  {
    id: "2025-03-aurora",
    name: "The March 2025 Aurora Storm",
    date: "2025-03-23",
    startTime: "2025-03-23T10:00:00Z",
    endTime: "2025-03-23T16:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X1.0+",
    description:
      "A significant Earth-directed CME in March 2025 that produced spectacular auroral displays visible at unusually low latitudes. Part of the elevated activity during the peak of Solar Cycle 25.",
    earthEffects:
      "G4 severe geomagnetic storm. Vivid aurora visible across the northern United States, UK, and central Europe. Widespread social media reports of aurora sightings.",
    source: "NOAA SWPC; SpaceWeatherLive",
    sourceUrl: "https://www.spaceweatherlive.com/",
  },
  {
    id: "2025-11-armistice",
    name: "The Armistice Day Storm",
    date: "2025-11-11",
    startTime: "2025-11-11T09:00:00Z",
    endTime: "2025-11-11T15:00:00Z",
    cadenceSeconds: 1200,
    sourceId: 4,
    flareClass: "X5.1",
    description:
      "AR 14274 produced four solar flares and four CMEs in days, with three Earth-directed. The X5.1 flare's CME traveled at ~1500 km/s and arrived at Earth in under 24 hours. ESA's Solar Orbiter also recorded it.",
    earthEffects:
      "G4 severe storm reaching G5 at UK observatories. Aurora visible from Arizona, Texas, Florida, and Mexico. Swarm constellation detected magnetic fluctuations 10x above normal.",
    source: "ESA; NOAA SWPC; British Geological Survey; SOHO/LASCO",
    sourceUrl:
      "https://www.esa.int/Space_Safety/Space_weather/Lessons_from_the_November_2025_solar_storm",
  },
];

export default cmeEvents;
