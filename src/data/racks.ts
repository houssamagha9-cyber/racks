export type Flag = "yes" | "no" | "unstated";

export type Store = {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  state: string;
  address: string;
  phone: string | null;
  website: string | null;
  hours: string;
  sunday: Flag;
  furniture: Flag;
  books: Flag;
  kids: Flag;
  bargain: Flag;
  donation: Flag;
  role: "shop" | "dropoff";
  kind: "thrift" | "bargain" | "books" | "vintage" | "resale" | "restore" | "dropoff";
  closed: boolean;
  blurb: string;
  about: string[];
  source: string;
  lat: number | null;
  lng: number | null;
  image: string;
  imageAlt: string;
  pick: boolean;
};

export type City = {
  slug: string;
  name: string;
  state: string;
  intro: string[];
};

export type Loop = {
  slug: string;
  title: string;
  description: string;
  stops: string[];
  body: string[];
};

export type Chain = {
  slug: string;
  title: string;
  description: string;
  body: string[];
  test: (store: Store) => boolean;
};

export type Fit = {
  slug: string;
  title: string;
  description: string;
  body: string[];
  test: (store: Store) => boolean;
};

export type RackSearch = {
  q: string;
  city: string;
  sunday: string;
  furniture: string;
  books: string;
  bargain: string;
};

const plates = [
  {
    image: "/media/loft.jpg",
    imageAlt: "A brick warehouse interior. Room plate, not a photograph of this shop.",
  },
  {
    image: "/media/barn.jpg",
    imageAlt: "A timber hall. Room plate, not a photograph of this shop.",
  },
  {
    image: "/media/dining.jpg",
    imageAlt: "A dark wood table. Room plate, not a photograph of this shop.",
  },
  {
    image: "/media/theater.jpg",
    imageAlt: "A dim hall. Room plate, not a photograph of this shop.",
  },
  {
    image: "/media/waterfront.jpg",
    imageAlt: "A wide room with light from one side. Room plate, not a photograph of this shop.",
  },
  {
    image: "/media/garden.jpg",
    imageAlt: "An evening courtyard. Room plate, not a photograph of this shop.",
  },
];

let plateIndex = 0;
function plate() {
  const next = plates[plateIndex % plates.length];
  plateIndex += 1;
  return next;
}

const GW = "https://www.goodwillmemphis.org/locations";
const GW_SOURCE =
  "Goodwill Memphis locations map on goodwillmemphis.org/locations, read November 8, 2026. Hours are the map’s own text. Call before you drive.";
const HEY =
  "Hey Memphis, “Thrift Stores in Memphis,” updated October 11, 2026. Hours are as that guide printed them.";
const HAB = "Habitat for Humanity of Greater Memphis ReStore page, memphishabitat.com/restore/shop.";

function shop(partial: Omit<Store, "image" | "imageAlt" | "role">): Store {
  return { role: "shop", ...partial, ...plate() };
}

const shopList: Store[] = [
  shop({
    slug: "goodwill-southaven",
    name: "Goodwill Southaven",
    city: "Southaven",
    citySlug: "southaven",
    state: "MS",
    address: "925 Stateline Road West, Southaven, MS 38671",
    phone: "(662) 342-7097",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 34.9908343,
    lng: -90.006155,
    pick: true,
    blurb: "The only Goodwill shop inside Southaven city limits. The other Goodwill pins nearby are drop-off centers.",
    about: [
      "Goodwill Memphis lists this as Southaven Store & Donation Center. The map’s hours are Monday through Saturday 9am–8pm and Sunday 10am–6pm.",
      "Do not confuse it with the attended donation center at 57 Stateline Road, or the one at 1514 Goodman Road. Those take donations. They are not stores.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-union",
    name: "Goodwill Union Avenue",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "1810 Union Ave, Memphis, TN 38104",
    phone: "(901) 725-7982",
    website: GW,
    hours: "Mon–Sat 9am–7pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 35.1359541,
    lng: -90.0009198,
    pick: true,
    blurb: "The Midtown Goodwill shop and donation center, open Sunday. Pair it with the vintage stores on Central and Madison.",
    about: [
      "Listed by Goodwill Memphis as Union Ave. Store and Donation Center. Hours on the map: Monday–Saturday 9am–7pm, Sunday 10am–6pm.",
      "A Midtown loop can start here, then Flashback on Central and Second Kiss on Madison. Those two are vintage shops, not Goodwill.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-stage",
    name: "Goodwill Stage Road",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "6899 Stage Rd, Memphis, TN 38133",
    phone: "(901) 507-3284",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 35.204,
    lng: -89.8337486,
    pick: false,
    blurb: "Full Goodwill shop on Stage Road. The Bargain Barn is the same address with shorter hours and a separate door.",
    about: [
      "Goodwill lists the main store at 6899 Stage Rd, Monday–Saturday 9am–8pm, Sunday 10am–6pm, phone (901) 507-3284.",
      "The Stage Road Bargain Barn uses the same street address and the same phone, and closes at 6pm on weekdays. They are two listings on purpose.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-stage-bargain",
    name: "Goodwill Stage Road Bargain Barn",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "6899 Stage Rd, Memphis, TN 38133",
    phone: "(901) 507-3284",
    website: GW,
    hours: "Mon–Sat 9am–6pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "yes",
    donation: "yes",
    kind: "bargain",
    closed: false,
    lat: 35.204,
    lng: -89.8337486,
    pick: true,
    blurb: "Goodwill’s bargain counter at the Stage Road campus. Shorter hours than the full store next to it. Not a pay-by-the-pound outlet.",
    about: [
      "The map titles this Stage Rd. Bargain Barn and prints Monday–Saturday 9am–6pm, Sunday 10am–6pm.",
      "Mid-South Goodwill does not publish a pay-by-the-pound outlet in this set. A bargain barn is a cheaper Goodwill floor, not the blue-bin outlets other states run.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-riverdale",
    name: "Goodwill Riverdale",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "7114 Winchester Road, Memphis, TN 38125",
    phone: "(901) 753-6028",
    website: GW,
    hours: "Mon–Sat 9am–7pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 35.0510681,
    lng: -89.8264055,
    pick: false,
    blurb: "Southeast Memphis Goodwill shop on Winchester, a short hop from the Habitat ReStore at 7130 Winchester.",
    about: [
      "Goodwill’s map: Riverdale Store & Donation Center, Monday–Saturday 9am–7pm, Sunday 10am–6pm.",
      "The attended donation center at 6745 Winchester Road is not this store. Habitat’s Winchester ReStore is 7130 Winchester and keeps different hours.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-carriage",
    name: "Goodwill Carriage Crossing",
    city: "Collierville",
    citySlug: "collierville",
    state: "TN",
    address: "10217 E Shelby Dr, Collierville, TN 38017",
    phone: "(901) 286-6764",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 35.018617,
    lng: -89.7201672,
    pick: false,
    blurb: "Collierville’s full Goodwill shop, open Sunday. The bookstore on West Poplar is a different stop.",
    about: [
      "Listed as Carriage Crossing Store and Donation Center. Hours: Monday–Saturday 9am–8pm, Sunday 10am–6pm.",
      "Collierville also has a Goodwill bookstore at 1015 W. Poplar Ave and a Habitat ReStore at 920 W. Poplar Ave. Three shops, three jobs.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-collierville-books",
    name: "Goodwill Collierville Bookstore",
    city: "Collierville",
    citySlug: "collierville",
    state: "TN",
    address: "1015 W. Poplar Ave, Collierville, TN 38017",
    phone: "(901) 302-9788",
    website: GW,
    hours: "Mon–Sat 9am–7pm, Sunday 10am–7pm",
    sunday: "yes",
    furniture: "no",
    books: "yes",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "books",
    closed: false,
    lat: 35.0457317,
    lng: -89.6963234,
    pick: false,
    blurb: "A Goodwill bookstore, not the Carriage Crossing clothing floor. Sunday hours run later than the other shops.",
    about: [
      "The map lists Collierville Bookstore at 1015 W. Poplar Ave, Monday–Saturday 9am–7pm, Sunday 10am–7pm, phone (901) 302-9788.",
      "Goodwill also lists an attended donation center at that same address. The bookstore is the shop. The donation pin is not a second bookstore.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-hernando",
    name: "Goodwill Hernando East",
    city: "Hernando",
    citySlug: "hernando",
    state: "MS",
    address: "2670 McIngvale Road, Hernando, MS 38632",
    phone: "(662) 449-7507",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 34.8204629,
    lng: -89.9702519,
    pick: false,
    blurb: "Hernando’s full Goodwill shop. The bargain barn is on East Commerce Street, not this building.",
    about: [
      "Hernando East Store & Donation Center, 2670 McIngvale Road. Monday–Saturday 9am–8pm, Sunday 10am–6pm.",
      "From Southaven this is the next shop south after Stateline Road. The bargain barn at 480 East Commerce Street closes earlier.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-hernando-bargain",
    name: "Goodwill Hernando Bargain Barn",
    city: "Hernando",
    citySlug: "hernando",
    state: "MS",
    address: "480 East Commerce Street, Hernando, MS 38632",
    phone: "(662) 429-4043",
    website: GW,
    hours: "Mon–Sat 9am–6pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "yes",
    donation: "yes",
    kind: "bargain",
    closed: false,
    lat: 34.8246318,
    lng: -89.9815082,
    pick: false,
    blurb: "Hernando’s bargain barn. Weekday close is 6pm, two hours earlier than the McIngvale store.",
    about: [
      "Goodwill titles it Hernando Bargain Barn & Donation Center, phone (662) 429-4043, Monday–Saturday 9am–6pm, Sunday 10am–6pm.",
      "It is not a by-the-pound outlet. If you need the longer evening hours, use Hernando East on McIngvale.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-millington",
    name: "Goodwill Millington",
    city: "Millington",
    citySlug: "millington",
    state: "TN",
    address: "8059 U.S. 51, Millington, TN",
    phone: "(901) 872-0280",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 35.3474461,
    lng: -89.9059011,
    pick: false,
    blurb: "Millington’s full Goodwill shop on U.S. 51. The bargain center is the next address, 8061.",
    about: [
      "Millington Store & Donation Center, 8059 U.S. 51. Monday–Saturday 9am–8pm, Sunday 10am–6pm. Phone (901) 872-0280.",
      "The bargain center next door uses extension 19 on the same phone and closes at 6pm Monday through Saturday.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-millington-bargain",
    name: "Goodwill Millington Bargain Center",
    city: "Millington",
    citySlug: "millington",
    state: "TN",
    address: "8061 US HWY 51 N, Millington, TN 38053",
    phone: "(901) 872-0280 ext. 19",
    website: GW,
    hours: "Mon–Sat 9am–6pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "yes",
    donation: "yes",
    kind: "bargain",
    closed: false,
    lat: 35.3468615,
    lng: -89.906261,
    pick: false,
    blurb: "The Millington bargain floor, next door to the full store. Not a bins outlet.",
    about: [
      "Goodwill lists Millington Bargain Center at 8061 US HWY 51 N, Monday–Saturday 9am–6pm, Sunday 10am–6pm.",
      "Same campus idea as Stage Road and Hernando: a full store plus a cheaper floor with an earlier weekday close.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-covington",
    name: "Goodwill Covington",
    city: "Covington",
    citySlug: "covington",
    state: "TN",
    address: "975 Hwy. 51 S., Covington, TN 38019",
    phone: "(901) 560-2869",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 35.583093,
    lng: -89.6425638,
    pick: false,
    blurb: "The Covington shop. A separate attended donation center on Highway 51 is not this store.",
    about: [
      "Covington Store and Donation Center, 975 Hwy. 51 S. Monday–Saturday 9am–8pm, Sunday 10am–6pm.",
      "Goodwill also lists a donation center at 1655 Hwy. 51 S, Suite M. That suite is a drop-off, not a second shop.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-oxford",
    name: "Goodwill Oxford",
    city: "Oxford",
    citySlug: "oxford",
    state: "MS",
    address: "2540 Jackson Ave W, Oxford, MS 38655",
    phone: "(662) 513-6458",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 34.360368,
    lng: -89.5660486,
    pick: false,
    blurb: "Oxford’s Goodwill shop on West Jackson. One store in town on this map, open Sunday.",
    about: [
      "Oxford Store & Donation Center, 2540 Jackson Ave W. Monday–Saturday 9am–8pm, Sunday 10am–6pm.",
      "This list does not add other Oxford thrift shops until a second source prints an address and hours. One verified shop beats a guessed row.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-corinth",
    name: "Goodwill Corinth",
    city: "Corinth",
    citySlug: "corinth",
    state: "MS",
    address: "1651 Virginia Lane, Corinth, MS 38834",
    phone: "(662) 287-7182",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 34.9140595,
    lng: -88.5042075,
    pick: false,
    blurb: "Corinth’s Goodwill shop. Open Sunday, with a donation door at the same listing.",
    about: [
      "Corinth Store & Donation Center, 1651 Virginia Lane. Monday–Saturday 9am–8pm, Sunday 10am–6pm.",
      "No bargain barn is listed for Corinth on the Goodwill Memphis map.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-saltillo",
    name: "Goodwill Saltillo (Tupelo store)",
    city: "Saltillo",
    citySlug: "tupelo",
    state: "MS",
    address: "1046 Cross Creek Drive, Saltillo, MS 38866",
    phone: "(662) 840-5410",
    website: GW,
    hours: "Mon–Sat 9am–8pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: 34.3190272,
    lng: -88.6978785,
    pick: false,
    blurb: "Goodwill titles this the Tupelo store. The address is in Saltillo, not inside Tupelo.",
    about: [
      "Map title: Tupelo Store & Donation Center. Address printed under it: 1046 Cross Creek Drive, Saltillo, MS 38866. Hours Monday–Saturday 9am–8pm, Sunday 10am–6pm.",
      "The Tupelo bookstore is a different building, at 1885 McCullough Blvd in Tupelo. Searching “Tupelo Goodwill” and driving to Saltillo by surprise is the mistake this page is for.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-tupelo-books",
    name: "Goodwill Tupelo Bookstore",
    city: "Tupelo",
    citySlug: "tupelo",
    state: "MS",
    address: "1885 McCullough Blvd, Tupelo, MS 38801",
    phone: "(662) 678-1026",
    website: GW,
    hours: "Mon–Sat 9am–6pm, Sunday 10am–6pm",
    sunday: "yes",
    furniture: "no",
    books: "yes",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "books",
    closed: false,
    lat: 34.2875715,
    lng: -88.7438157,
    pick: false,
    blurb: "The Tupelo Goodwill bookstore on McCullough. The big store with that “Tupelo” name is in Saltillo.",
    about: [
      "McCullough (Tupelo) Bookstore, 1885 McCullough Blvd. Monday–Saturday 9am–6pm, Sunday 10am–6pm. Phone (662) 678-1026.",
      "A donation center is also listed at 1885 McCullough Blvd. North Gloster Street in Tupelo is an attended donation center, not a shop.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "goodwill-austin-peay",
    name: "Goodwill Austin Peay",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "3830 Austin Peay Highway, Memphis, TN 38128",
    phone: null,
    website: GW,
    hours: "Permanently closed",
    sunday: "no",
    furniture: "no",
    books: "no",
    kids: "no",
    bargain: "no",
    donation: "no",
    kind: "thrift",
    closed: true,
    lat: 35.2309344,
    lng: -89.8980217,
    pick: false,
    blurb: "Permanently closed on Goodwill’s own map. Listed so the old address does not waste a drive.",
    about: [
      "The Goodwill Memphis map still plots Austin Peay Store & Donation Center at 3830 Austin Peay Highway and marks the hours “Permanently Closed.”",
      "There is no phone on that marker. Do not plan a shop stop. Raleigh and Bartlett shoppers should use Stage Road or Millington instead.",
    ],
    source: GW_SOURCE,
  }),
  shop({
    slug: "habitat-winchester",
    name: "Habitat ReStore Winchester",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "7130 Winchester Rd, Memphis, TN 38125",
    phone: "(901) 737-8673",
    website: "https://www.memphishabitat.com/restore/shop",
    hours: "Tue–Sat 11am–5pm, closed Sunday and Monday",
    sunday: "no",
    furniture: "yes",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "restore",
    closed: false,
    lat: null,
    lng: null,
    pick: true,
    blurb: "Habitat’s southeast ReStore. Furniture, appliances, cabinets, and building supplies. Closed Sunday and Monday.",
    about: [
      "Habitat for Humanity of Greater Memphis prints this address and these hours: Tuesday–Saturday 11am–5pm, closed Sunday and Monday, (901) 737-8673.",
      "The organization says the floor carries donated furniture, appliances, décor, and building supplies. It is not a clothing Goodwill. Riverdale Goodwill is down Winchester and does open Sunday.",
    ],
    source: HAB,
  }),
  shop({
    slug: "habitat-collierville",
    name: "Habitat ReStore Collierville",
    city: "Collierville",
    citySlug: "collierville",
    state: "TN",
    address: "920 W Poplar Ave, Collierville, TN 38017",
    phone: "(901) 737-8673",
    website: "https://www.memphishabitat.com/restore/shop",
    hours: "Tue–Sat 11am–5pm, closed Sunday and Monday",
    sunday: "no",
    furniture: "yes",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "restore",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Habitat’s Collierville ReStore on West Poplar. Same hours as Winchester: no Sunday, no Monday.",
    about: [
      "Address and hours are from Habitat’s ReStore page: 920 W Poplar Ave, Tuesday–Saturday 11am–5pm, closed Sunday–Monday, (901) 737-8673.",
      "Goodwill’s Carriage Crossing shop and the Collierville bookstore are the Sunday options in this town. This ReStore is the furniture and building-supplies stop.",
    ],
    source: HAB,
  }),
  shop({
    slug: "repeat-boutique",
    name: "Junior League Repeat Boutique",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "3586 Summer Ave, Memphis, TN",
    phone: null,
    website: null,
    hours: "Tue–Sat 10am–5pm",
    sunday: "no",
    furniture: "yes",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Junior League shop on Summer Avenue. Clothing, housewares, and home furnishings. Not open Sunday.",
    about: [
      "Hey Memphis (October 11, 2026) places Repeat Boutique at 3586 Summer Ave and prints Tuesday–Saturday 10am–5pm. Donations are listed Tuesday–Saturday 10:30am–4pm at the back door.",
      "The guide describes clothing, shoes, accessories, housewares, and home furnishings. No phone was printed there, so none is printed here.",
    ],
    source: HEY,
  }),
  shop({
    slug: "blues-city",
    name: "Blues City Thrift",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "6685 Quince Rd, Suite 110, Memphis, TN 38119",
    phone: null,
    website: null,
    hours: "Mon–Sat 12pm–6pm, closed Sunday",
    sunday: "no",
    furniture: "yes",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "unstated",
    kind: "thrift",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "East Memphis charity shop. Clothing, home goods, and furniture. Opens at noon and skips Sunday.",
    about: [
      "Hey Memphis lists Blues City Thrift at 6685 Quince Rd, Suite 110, Monday–Saturday 12–6pm, closed Sunday, with clothing, home goods, and furniture.",
      "It describes the shop as a 501(c)(3). That is the guide’s claim. Confirm the tax receipt at the counter.",
    ],
    source: HEY,
  }),
  shop({
    slug: "salvation-army-kirby",
    name: "Salvation Army Thrift Store",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "2679 Kirby Whitten Rd, Memphis, TN",
    phone: null,
    website: null,
    hours: "Mon–Sat 10am–7pm, closed Sunday",
    sunday: "no",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "unstated",
    kind: "thrift",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Salvation Army’s Memphis shop on Kirby Whitten. Closed Sunday. What is on the floor is not specified by the source used here.",
    about: [
      "Hey Memphis lists The Salvation Army Thrift Store at 2679 Kirby Whitten Rd, Monday–Saturday 10am–7pm, closed Sunday, beside the Adult Rehabilitation Center.",
      "The guide does not inventory furniture or books for this door, so those fields stay “not stated.” A missing yes is not a no.",
    ],
    source: HEY,
  }),
  shop({
    slug: "legacy-thrift",
    name: "Legacy Thrift",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "6184 Macon Rd, Memphis, TN",
    phone: null,
    website: null,
    hours: "Mon, Wed, Fri, Sat 10am–4pm",
    sunday: "no",
    furniture: "yes",
    books: "yes",
    kids: "yes",
    bargain: "no",
    donation: "yes",
    kind: "thrift",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Four-day shop on Macon. Clothing, furniture, housewares, books, toys, and games. Closed Sunday, Tuesday, and Thursday.",
    about: [
      "Hey Memphis: Legacy Thrift, 6184 Macon Rd, open Monday, Wednesday, Friday, and Saturday, 10am–4pm. Donations taken those same hours.",
      "The guide says the racks hold clothing, furniture, housewares, books, toys, and games, and that mattresses, encyclopedias, and tube TVs are refused. Call if you are donating anything large.",
    ],
    source: HEY,
  }),
  shop({
    slug: "flashback",
    name: "Flashback",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "2304 Central Ave, Memphis, TN",
    phone: null,
    website: null,
    hours: "Mon–Sat 10:30am–5:30pm, Sunday 1pm–5pm",
    sunday: "yes",
    furniture: "yes",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "no",
    kind: "vintage",
    closed: false,
    lat: null,
    lng: null,
    pick: true,
    blurb: "Midtown vintage on Central. Clothing from the 1920s through the 1980s, plus retro furniture. Open Sunday afternoon.",
    about: [
      "Hey Memphis places Flashback at 2304 Central Ave, Monday–Saturday 10:30am–5:30pm, Sunday 1–5pm.",
      "It describes period clothing, hats, boots, sunglasses, and retro furniture, including diner booths and chrome dinettes. This is a vintage dealer, not a donation thrift.",
    ],
    source: HEY,
  }),
  shop({
    slug: "second-kiss",
    name: "Second Kiss Vintage",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "1559 Madison Ave, Memphis, TN",
    phone: null,
    website: null,
    hours: "Wed 4pm–8pm, Thu–Sun 12pm–5pm, closed Mon–Tue",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "no",
    kind: "vintage",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Vintage shop in Minglewood Plaza. Closed Monday and Tuesday. Sunday is a noon-to-five day.",
    about: [
      "Hey Memphis: Second Kiss Vintage, 1559 Madison Ave, Wednesday 4–8pm, Thursday–Sunday 12–5pm, closed Monday and Tuesday.",
      "The guide calls it vintage finds and does not inventory furniture or books. Those stay not stated.",
    ],
    source: HEY,
  }),
  shop({
    slug: "blue-suede",
    name: "Blue Suede Vintage",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "486 N. Hollywood St, Memphis, TN",
    phone: null,
    website: null,
    hours: "Thu, Fri, Sun 12pm–5pm, Sat 10am–5pm, Mon–Wed by appointment",
    sunday: "yes",
    furniture: "unstated",
    books: "unstated",
    kids: "unstated",
    bargain: "no",
    donation: "no",
    kind: "vintage",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Hollywood Street vintage. Sunday noon to five. Monday through Wednesday is appointment, not a walk-in.",
    about: [
      "Hey Memphis lists Blue Suede Vintage at 486 N. Hollywood St: Thursday, Friday, and Sunday 12–5pm, Saturday 10am–5pm, Monday–Wednesday by appointment.",
      "Goods described: clothing, accessories, and home goods from the 1920s to the 2000s. Home goods is not the same as a furniture warehouse, so furniture stays not stated.",
    ],
    source: HEY,
  }),
  shop({
    slug: "revive",
    name: "Revive Luxury Resale",
    city: "Memphis",
    citySlug: "memphis",
    state: "TN",
    address: "6100 Primacy Pkwy, Suite 108, Memphis, TN",
    phone: "(901) 763-7799",
    website: null,
    hours: "Tue–Sat 10am–4pm",
    sunday: "no",
    furniture: "no",
    books: "no",
    kids: "no",
    bargain: "no",
    donation: "no",
    kind: "resale",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Designer women’s consignment in East Memphis. Not a general thrift. Closed Sunday and Monday.",
    about: [
      "Hey Memphis: Revive Luxury Resale, 6100 Primacy Pkwy, Suite 108, Tuesday–Saturday 10am–4pm, phone (901) 763-7799.",
      "It describes designer consignment for women, including new, vintage, and gently used clothes. It is on this list so a “thrift in East Memphis” search does not pretend every door is a Goodwill.",
    ],
    source: HEY,
  }),
  shop({
    slug: "platos-cordova",
    name: "Plato’s Closet Cordova",
    city: "Cordova",
    citySlug: "cordova",
    state: "TN",
    address: "2200 N. Germantown Pkwy, Cordova, TN",
    phone: null,
    website: null,
    hours: "Mon–Sat 9am–9pm, Sunday 11am–7pm",
    sunday: "yes",
    furniture: "no",
    books: "no",
    kids: "no",
    bargain: "no",
    donation: "no",
    kind: "resale",
    closed: false,
    lat: null,
    lng: null,
    pick: false,
    blurb: "Teen and young-adult clothes, shoes, and accessories. Buys on the spot. Not furniture, not a donation bin.",
    about: [
      "Hey Memphis lists Plato’s Closet Cordova at 2200 N. Germantown Pkwy and prints Monday–Saturday 9am–9pm, Sunday 11am–7pm. The same guide says the chain pays cash for clothes, shoes, and accessories.",
      "Other Plato’s doors in the metro were named without hours in that guide, so they are not given their own rows. Cordova is the one with a printed schedule.",
    ],
    source: HEY,
  }),
];

function drop(row: {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  state: string;
  address: string;
  phone: string | null;
  hours: string;
  sunday: Flag;
  closed: boolean;
  lat: number;
  lng: number;
}): Store {
  return {
    ...row,
    role: "dropoff",
    website: GW,
    furniture: "no",
    books: "no",
    kids: "unstated",
    bargain: "no",
    donation: row.closed ? "no" : "yes",
    kind: "dropoff",
    pick: false,
    blurb: row.closed
      ? "Permanently closed on Goodwill’s map. Not a shop, and not a working drop-off."
      : "Attended donation center. Not a store. You cannot shop this address.",
    about: [
      row.closed
        ? `Goodwill marks this pin permanently closed at ${row.address}. Do not drive here to donate or to shop.`
        : `${row.name} is an attended donation center on the Goodwill Memphis map. Hours printed there: ${row.hours}.`,
      "Drop-offs are listed apart from shops so a pin on the map is not counted as a place to buy.",
    ],
    source: GW_SOURCE,
    ...plate(),
  };
}

const dropList: Store[] = [
  drop({ slug: "drop-stateline", name: "Goodwill drop-off, Stateline Road", city: "Southaven", citySlug: "southaven", state: "MS", address: "57 Stateline Road, Southaven, MS 38671", phone: null, hours: "Mon–Fri 9am–6pm, Sat–Sun 7am–7pm", sunday: "yes", closed: false, lat: 34.9914296, lng: -89.9883893 }),
  drop({ slug: "drop-golden-oaks", name: "Goodwill drop-off, Golden Oaks", city: "Southaven", citySlug: "southaven", state: "MS", address: "1514 Goodman Road, Southaven, MS 38637", phone: null, hours: "Mon–Fri 9am–6pm, Sat–Sun 7am–7pm", sunday: "yes", closed: false, lat: 34.9630601, lng: -89.9630381 }),
  drop({ slug: "drop-horn-lake", name: "Goodwill drop-off, Horn Lake", city: "Horn Lake", citySlug: "horn-lake", state: "MS", address: "2540 Goodman Road, Horn Lake, MS 38637", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 34.9630807, lng: -90.036682 }),
  drop({ slug: "drop-olive-branch", name: "Goodwill drop-off, Olive Branch", city: "Olive Branch", citySlug: "olive-branch", state: "MS", address: "6431 Goodman Road, Olive Branch, MS 38654", phone: null, hours: "Mon–Sun 7am–7pm", sunday: "yes", closed: false, lat: 34.9617352, lng: -89.8756238 }),
  drop({ slug: "drop-hacks-cross", name: "Goodwill drop-off, Hacks Cross", city: "Olive Branch", citySlug: "olive-branch", state: "MS", address: "7058 Hacks Cross, Olive Branch, MS 38654", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 34.9635177, lng: -89.7949338 }),
  drop({ slug: "drop-germantown", name: "Goodwill drop-off, Kirby Parkway", city: "Germantown", citySlug: "germantown", state: "TN", address: "1825 Kirby Parkway, Germantown, TN", phone: null, hours: "Mon–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.099393, lng: -89.8402969 }),
  drop({ slug: "drop-houston-levee", name: "Goodwill drop-off, Houston Levee", city: "Cordova", citySlug: "cordova", state: "TN", address: "1144 N. Houston Levee, Suite 112, Cordova, TN 38108", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 35.1563909, lng: -89.7264942 }),
  drop({ slug: "drop-trinity", name: "Goodwill drop-off, Trinity", city: "Cordova", citySlug: "cordova", state: "TN", address: "8040 Walnut Run Road, Cordova, TN 38018", phone: null, hours: "Mon–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.147313, lng: -89.7949181 }),
  drop({ slug: "drop-central", name: "Goodwill drop-off, Central Avenue", city: "Memphis", citySlug: "memphis", state: "TN", address: "2218 Central Ave, Memphis, TN 38104", phone: null, hours: "Mon–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.1262113, lng: -89.9879952 }),
  drop({ slug: "drop-chickasaw", name: "Goodwill drop-off, Poplar Avenue", city: "Memphis", citySlug: "memphis", state: "TN", address: "3109 Poplar Ave, Memphis, TN 38111", phone: null, hours: "Mon–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.1312391, lng: -89.9582468 }),
  drop({ slug: "drop-covington-pike", name: "Goodwill drop-off, Covington Pike", city: "Memphis", citySlug: "memphis", state: "TN", address: "2964 Covington Pike, Memphis, TN 38128", phone: null, hours: "Mon–Sun 7am–6pm", sunday: "yes", closed: false, lat: 35.2064723, lng: -89.8936261 }),
  drop({ slug: "drop-kirby-gate", name: "Goodwill drop-off, Kirby Gate", city: "Memphis", citySlug: "memphis", state: "TN", address: "6518 Quince Road, Memphis, TN 38115", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 35.0703228, lng: -89.8457303 }),
  drop({ slug: "drop-mount-moriah", name: "Goodwill drop-off, Mount Moriah", city: "Memphis", citySlug: "memphis", state: "TN", address: "700 Mount Moriah Road, Memphis, TN", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 35.1119616, lng: -89.8948713 }),
  drop({ slug: "drop-southwind", name: "Goodwill drop-off, Southwind", city: "Memphis", citySlug: "memphis", state: "TN", address: "3315 Hacks Cross Road, Memphis, TN 38125", phone: null, hours: "Mon–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.0593766, lng: -89.7937583 }),
  drop({ slug: "drop-summer", name: "Goodwill drop-off, Summer Avenue", city: "Memphis", citySlug: "memphis", state: "TN", address: "4725 Summer Ave, Memphis, TN 38122", phone: null, hours: "Mon–Sun 9am–7pm", sunday: "yes", closed: false, lat: 35.1482121, lng: -89.9032063 }),
  drop({ slug: "drop-white-station", name: "Goodwill drop-off, White Station", city: "Memphis", citySlug: "memphis", state: "TN", address: "1724 South White Station Road, Memphis, TN", phone: null, hours: "Mon–Fri 9am–6pm, Sat–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.0853425, lng: -89.8948512 }),
  drop({ slug: "drop-whitten", name: "Goodwill drop-off, Whitten Road", city: "Memphis", citySlug: "memphis", state: "TN", address: "1740 Whitten Rd, Memphis, TN 38134", phone: null, hours: "Mon–Sun 8am–6pm", sunday: "yes", closed: false, lat: 35.1724988, lng: -89.8360218 }),
  drop({ slug: "drop-winchester", name: "Goodwill drop-off, Winchester", city: "Memphis", citySlug: "memphis", state: "TN", address: "6745 Winchester Road, Memphis, TN 38115", phone: null, hours: "Mon–Fri 9am–6pm, Sat–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.048842, lng: -89.8382744 }),
  drop({ slug: "drop-yorkshire", name: "Goodwill drop-off, Yorkshire", city: "Memphis", citySlug: "memphis", state: "TN", address: "5679 Quince Road, Memphis, TN 38119", phone: null, hours: "Mon–Sun 8am–6pm", sunday: "yes", closed: false, lat: 35.0892106, lng: -89.8738992 }),
  drop({ slug: "drop-covington", name: "Goodwill drop-off, Covington", city: "Covington", citySlug: "covington", state: "TN", address: "1655 Hwy. 51 S, Suite M, Covington, TN 38019", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 35.5425482, lng: -89.6665229 }),
  drop({ slug: "drop-arlington", name: "Goodwill drop-off, Arlington", city: "Arlington", citySlug: "arlington", state: "TN", address: "11615 Hwy. 70, Suite 106, Arlington, TN 38002", phone: null, hours: "Mon–Sun 8am–6pm", sunday: "yes", closed: false, lat: 35.2926367, lng: -89.674458 }),
  drop({ slug: "drop-lakeland", name: "Goodwill drop-off, Lakeland", city: "Arlington", citySlug: "arlington", state: "TN", address: "9733 U.S. Hwy 64, Arlington, TN 38002", phone: null, hours: "Mon–Sun 7am–7pm", sunday: "yes", closed: false, lat: 35.2044546, lng: -89.7383075 }),
  drop({ slug: "drop-north-gloster", name: "Goodwill drop-off, North Gloster", city: "Tupelo", citySlug: "tupelo", state: "MS", address: "1960 North Gloster Street, Tupelo, MS 38804", phone: null, hours: "Mon–Fri 9am–6pm, Sat–Sun 7am–7pm", sunday: "yes", closed: false, lat: 34.2881066, lng: -88.7132851 }),
  drop({ slug: "drop-atoka", name: "Goodwill drop-off, Atoka", city: "Atoka", citySlug: "atoka", state: "TN", address: "11680 Hwy 51 S, Atoka, TN 38053", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 35.440434, lng: -89.791606 }),
  drop({ slug: "drop-batesville", name: "Goodwill drop-off, Batesville", city: "Batesville", citySlug: "batesville", state: "MS", address: "449 Highway 6 East, Batesville, MS 38606", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 34.3114697, lng: -89.9402551 }),
  drop({ slug: "drop-oakland", name: "Goodwill drop-off, Oakland", city: "Oakland", citySlug: "oakland", state: "TN", address: "6250 Hwy. 64, Oakland, TN 38060", phone: null, hours: "Mon–Sun 8am–6pm", sunday: "yes", closed: false, lat: 35.2272271, lng: -89.5312929 }),
  drop({ slug: "drop-new-albany", name: "Goodwill drop-off, New Albany", city: "New Albany", citySlug: "new-albany", state: "MS", address: "201 West Bankhead Street, New Albany, MS 38652", phone: null, hours: "Mon–Sun 9am–6pm", sunday: "yes", closed: false, lat: 34.4957239, lng: -89.0147039 }),
  drop({ slug: "drop-collierville-market", name: "Goodwill drop-off, Market Boulevard", city: "Collierville", citySlug: "collierville", state: "TN", address: "330 Market Blvd, Suite 102, Collierville, TN 38017", phone: null, hours: "Permanently closed", sunday: "no", closed: true, lat: 35.04921, lng: -89.6939768 }),
];

export const stores: Store[] = [...shopList, ...dropList];

export const cities: City[] = [
  {
    slug: "memphis",
    name: "Memphis",
    state: "Tennessee",
    intro: [
      "Memphis is where this list is thick enough to answer “thrift stores in Memphis” without padding. Shops below are either on the Goodwill Memphis map or in the October 11, 2026 Hey Memphis guide, plus Habitat’s own ReStore page.",
      "Drop-off pins are listed under the shops, not mixed in. Central, Poplar, Covington Pike, Kirby, Summer, Whitten, Winchester, and the others are donation centers. The Austin Peay Highway shop is marked permanently closed.",
    ],
  },
  {
    slug: "southaven",
    name: "Southaven",
    state: "Mississippi",
    intro: [
      "Southaven has one Goodwill shop: 925 Stateline Road West. That is the whole in-city retail list from Goodwill’s map.",
      "57 Stateline Road and 1514 Goodman Road are attended donation centers. Horn Lake’s 2540 Goodman Road is drop-off only. If you want a second and third shop the same day, Hernando has a full store and a bargain barn.",
    ],
  },
  {
    slug: "collierville",
    name: "Collierville",
    state: "Tennessee",
    intro: [
      "Collierville has three different shops, and they are not substitutes. Carriage Crossing is the full Goodwill. West Poplar has a Goodwill bookstore. Habitat’s ReStore, also on West Poplar, is furniture and building supplies and is closed Sunday.",
      "A donation center on Market Boulevard is marked permanently closed on Goodwill’s map. Do not treat it as a store.",
    ],
  },
  {
    slug: "hernando",
    name: "Hernando",
    state: "Mississippi",
    intro: [
      "Hernando has the pair Goodwill uses in a few towns: a full store on McIngvale with evening hours, and a bargain barn on East Commerce that closes at 6pm.",
      "Neither is a pay-by-the-pound outlet. From Southaven, these are the closest extra shops after Stateline Road.",
    ],
  },
  {
    slug: "millington",
    name: "Millington",
    state: "Tennessee",
    intro: [
      "Millington’s Goodwill campus is two doors on U.S. 51: 8059 is the full store, open until 8pm Monday through Saturday, and 8061 is the bargain center, open until 6pm.",
      "Both are open Sunday 10am–6pm on Goodwill’s map. They share a phone trunk. The bargain center is extension 19.",
    ],
  },
  {
    slug: "tupelo",
    name: "Tupelo",
    state: "Mississippi",
    intro: [
      "The store Goodwill titles “Tupelo” sits at 1046 Cross Creek Drive in Saltillo. The bookstore is the one inside Tupelo, at 1885 McCullough Blvd.",
      "North Gloster Street is an attended donation center, not a shop. If a pin says Tupelo and the address says Saltillo, believe the address.",
    ],
  },
  {
    slug: "cordova",
    name: "Cordova",
    state: "Tennessee",
    intro: [
      "Cordova’s shop on this list is Plato’s Closet at 2200 N. Germantown Parkway: teen and young-adult clothes, open Sunday. It is resale, not a Goodwill.",
      "Goodwill’s two Cordova pins are drop-offs, Houston Levee and Walnut Run. Neither is a store. The nearest full Goodwill floors are Stage Road and the Collierville shop.",
    ],
  },
  {
    slug: "olive-branch",
    name: "Olive Branch",
    state: "Mississippi",
    intro: [
      "Olive Branch has no Goodwill shop on the Memphis map. It has two attended donation centers: 6431 Goodman Road and 7058 Hacks Cross.",
      "To buy, cross into Southaven at 925 Stateline Road West, or Collierville at Carriage Crossing. Those are the shops. These two addresses are not.",
    ],
  },
  {
    slug: "germantown",
    name: "Germantown",
    state: "Tennessee",
    intro: [
      "Germantown has no Goodwill shop on this map. Kirby Parkway, 1825, is an attended donation center open seven days.",
      "The nearest general shops are in Memphis: Quince Road has Kirby Gate as another drop-off, not a store. Use Union, Stage Road, or Riverdale if you want racks.",
    ],
  },
  {
    slug: "horn-lake",
    name: "Horn Lake",
    state: "Mississippi",
    intro: [
      "Horn Lake’s Goodman Road pin is a drop-off, 2540 Goodman Road, seven days, 9am to 6pm. There is no shop at that address.",
      "The Southaven store is 925 Stateline Road West. Hernando adds a full store and a bargain barn if one shop is not enough.",
    ],
  },
  {
    slug: "arlington",
    name: "Arlington",
    state: "Tennessee",
    intro: [
      "Arlington has two Goodwill drop-offs and no shop. One is on Highway 70. The pin Goodwill titles Lakeland is at 9733 U.S. Highway 64, and that address is Arlington.",
      "The nearest shops on this list are the Covington store on Highway 51 and the Millington pair on U.S. 51. Do not treat either Arlington pin as a store.",
    ],
  },
  {
    slug: "covington",
    name: "Covington",
    state: "Tennessee",
    intro: [
      "Covington’s shop is 975 Highway 51 South, open until 8pm Monday through Saturday and on Sunday. That is the only retail door.",
      "Suite M at 1655 Highway 51 South is the attended donation center. Same highway, different building, not a second store.",
    ],
  },
];

export const fits: Fit[] = [
  {
    slug: "donate",
    title: "Where to donate",
    description: "Goodwill attended donation centers. Not shops. The search is “where do I donate clothes,” and a store page is the wrong answer.",
    body: [
      "People search this as often as they search for a store, and the map answers it badly by using the same pin style for both. Every row here is a drop-off Goodwill printed as an attended donation center.",
      "You cannot buy at these addresses. Sunday hours below are the donation hours, not store hours. The Collierville Market Boulevard pin is permanently closed and stays on the list so the old suite does not get a bag of clothes.",
    ],
    test: (store) => store.role === "dropoff" && !store.closed,
  },
  {
    slug: "sunday",
    title: "Open Sunday",
    description: "Shops whose published hours include Sunday. Closed-Sunday stores are left off on purpose.",
    body: [
      "A lot of charity shops in this metro take Sunday off. Goodwill Memphis stores on this map do not. Habitat ReStores do. The Junior League, Blues City, Legacy, the Salvation Army on Kirby Whitten, and Revive do not.",
      "Sunday here means the source printed a Sunday hour for a shop. Drop-off centers are on the donate page, even when they take bags on Sunday.",
    ],
    test: (store) => store.role === "shop" && !store.closed && store.sunday === "yes",
  },
  {
    slug: "furniture",
    title: "Furniture",
    description: "Shops a source actually says carry furniture, furnishings, or building-supply furniture.",
    body: [
      "Google Maps will not tell you which thrift door has a sofa. This page only lists shops where a source said furniture, home furnishings, or Habitat’s furniture and building supplies.",
      "Goodwill bargain barns are not on this page. Their maps do not say furniture. “Not stated” is not a quiet yes.",
    ],
    test: (store) => store.role === "shop" && !store.closed && store.furniture === "yes",
  },
  {
    slug: "books",
    title: "Books",
    description: "The two Goodwill bookstores, plus Legacy Thrift, which names books on the floor.",
    body: [
      "Most clothing floors are a bad answer to “thrift books.” Goodwill runs a bookstore in Collierville and one in Tupelo. Legacy Thrift on Macon names books among what it sells.",
      "Three shops is the whole honest set. A longer page would be filler.",
    ],
    test: (store) => store.role === "shop" && !store.closed && store.books === "yes",
  },
  {
    slug: "bargain",
    title: "Bargain barns",
    description: "The three Goodwill bargain floors. Cheaper leftovers. Not pay-by-the-pound bins.",
    body: [
      "Stage Road, Hernando, and Millington each put a bargain floor next to a full store. Weekday hours end at 6pm. Sunday is still 10am–6pm.",
      "People search “Goodwill bins” and land on outlets in other states that sell by the pound. Mid-South Goodwill’s map does not list one of those. These three are the local cheaper floors.",
    ],
    test: (store) => store.role === "shop" && !store.closed && store.bargain === "yes",
  },
  {
    slug: "kids",
    title: "Kids and toys",
    description: "Legacy is the only shop whose source names toys and games. Once Upon a Child is named without hours, so it is not a row.",
    body: [
      "Hey Memphis (October 11, 2026) says Once Upon a Child buys and sells kids’ clothing, shoes, toys, furniture, and baby gear in Cordova, Collierville, and Southaven. The same paragraph says to check each store’s own page for hours. No street address and no hours were printed, so those three doors are not listings.",
      "Legacy Thrift on Macon names toys and games on the floor. It is open Monday, Wednesday, Friday, and Saturday, 10am–4pm. That is the one row this filter can defend.",
      "Plato’s Closet Cordova is teen and young-adult clothes, not a kids’ store, so it stays off this page.",
    ],
    test: (store) => store.role === "shop" && !store.closed && store.kids === "yes",
  },
];

export const chains: Chain[] = [
  {
    slug: "goodwill",
    title: "Goodwill shops",
    description: "Every Goodwill retail door on the Memphis map. Bargain barns and bookstores included. Drop-offs are not.",
    body: [
      "“Goodwill near me” is the search. The official map uses similar pins for stores, bargain barns, bookstores, and attended donation centers. This page is only the doors that sell.",
      "Austin Peay Highway is permanently closed and is left off. The store titled Tupelo sits at 1046 Cross Creek Drive in Saltillo. Mid-South Goodwill does not list a pay-by-the-pound outlet.",
      "The bargain barns at Stage Road, Hernando, and Millington close at 6pm on weekdays. The full stores next to them stay open later. They are separate rows because the hours are not the same.",
    ],
    test: (store) => store.role === "shop" && !store.closed && store.name.startsWith("Goodwill"),
  },
  {
    slug: "habitat",
    title: "Habitat ReStore",
    description: "Both Greater Memphis ReStores. Furniture and building supplies. Closed Sunday and Monday.",
    body: [
      "Habitat prints two shops: 7130 Winchester Road in Memphis and 920 West Poplar in Collierville. Both are Tuesday–Saturday 11am–5pm, closed Sunday and Monday, phone (901) 737-8673.",
      "A Sunday furniture search should not land here. Riverdale Goodwill, down Winchester, does open Sunday, and it is a clothing thrift, not a ReStore.",
    ],
    test: (store) => store.kind === "restore" && !store.closed,
  },
  {
    slug: "vintage",
    title: "Vintage shops",
    description: "Flashback, Second Kiss, and Blue Suede. Two of them are not walk-in all week.",
    body: [
      "These are not donation thrifts. Flashback on Central is the Sunday-afternoon furniture stop. Second Kiss is closed Monday and Tuesday. Blue Suede is appointment-only Monday through Wednesday.",
      "Stacking all three on a Monday fails. Open today is the check. The Midtown loop is the order when the hours line up.",
    ],
    test: (store) => store.kind === "vintage" && !store.closed,
  },
  {
    slug: "resale",
    title: "Resale, not donation",
    description: "Plato’s Closet Cordova and Revive. They buy clothes. They are not a place to drop a bag.",
    body: [
      "Hey Memphis names three other Plato’s doors, in Memphis, Collierville, and Southaven, and says those post their own hours. Only Cordova had a schedule in that guide, so only Cordova is a row. Cordova is open Sunday until 7pm.",
      "Revive is designer women’s consignment on Primacy Parkway, Tuesday–Saturday 10am–4pm. It does not take household donations.",
    ],
    test: (store) => store.kind === "resale" && !store.closed,
  },
];

export const loops: Loop[] = [
  {
    slug: "southaven-hernando",
    title: "Southaven to Hernando",
    description: "One shop in Southaven, then Hernando’s full store and bargain barn.",
    stops: ["goodwill-southaven", "goodwill-hernando", "goodwill-hernando-bargain"],
    body: [
      "Start at 925 Stateline Road West. Skip 57 Stateline and Goodman Road. Those are donation centers.",
      "Then Hernando East on McIngvale if you still want a full floor with evening hours, and East Commerce if you want the bargain barn before 6pm.",
    ],
  },
  {
    slug: "midtown",
    title: "Midtown vintage and Union",
    description: "The Midtown Goodwill plus the vintage doors a clothing rack is not.",
    stops: ["goodwill-union", "flashback", "second-kiss", "blue-suede"],
    body: [
      "Union Avenue Goodwill is the general shop and it opens Sunday morning. Flashback on Central opens Sunday afternoon and is the furniture-and-vintage stop.",
      "Second Kiss is closed Monday and Tuesday. Blue Suede is appointment-only Monday through Wednesday. Read the hours before you stack all four.",
    ],
  },
  {
    slug: "furniture",
    title: "Furniture day",
    description: "Habitat’s two ReStores, then the Memphis shops that actually say furniture.",
    stops: ["habitat-winchester", "habitat-collierville", "legacy-thrift", "blues-city", "repeat-boutique", "flashback"],
    body: [
      "Habitat is closed Sunday and Monday and is the building-supplies stop. Legacy is only four days a week. Repeat Boutique is closed Sunday. Blues City opens at noon and skips Sunday.",
      "Flashback is the Sunday furniture option in this loop, and it is vintage, not a sofa warehouse. Bring a tape measure. None of these pages promise a particular piece is in stock.",
    ],
  },
];

export function flagLabel(flag: Flag) {
  if (flag === "yes") return "Yes";
  if (flag === "no") return "No";
  return "Not stated";
}

export function rackSearch(partial: Partial<RackSearch> = {}): RackSearch {
  return {
    q: partial.q ?? "",
    city: partial.city ?? "",
    sunday: partial.sunday === "yes" ? "yes" : "",
    furniture: partial.furniture === "yes" ? "yes" : "",
    books: partial.books === "yes" ? "yes" : "",
    bargain: partial.bargain === "yes" ? "yes" : "",
  };
}

export function filterStores(rows: Store[], search: RackSearch) {
  const q = search.q.trim().toLowerCase();
  return rows.filter((store) => {
    if (!q && store.closed) return false;
    if (!q && store.role === "dropoff") return false;
    if (search.city && store.citySlug !== search.city) return false;
    if (search.sunday === "yes" && store.sunday !== "yes") return false;
    if (search.furniture === "yes" && store.furniture !== "yes") return false;
    if (search.books === "yes" && store.books !== "yes") return false;
    if (search.bargain === "yes" && store.bargain !== "yes") return false;
    if (!q) return true;
    const hay = [store.name, store.city, store.address, store.blurb, store.hours, store.kind]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function getStore(slug: string) {
  return stores.find((store) => store.slug === slug) ?? null;
}

export function cityBySlug(slug: string) {
  return cities.find((city) => city.slug === slug) ?? null;
}

export function fitBySlug(slug: string) {
  return fits.find((fit) => fit.slug === slug) ?? null;
}

export function chainBySlug(slug: string) {
  return chains.find((chain) => chain.slug === slug) ?? null;
}

export function loopBySlug(slug: string) {
  return loops.find((loop) => loop.slug === slug) ?? null;
}

export function storesInCity(slug: string) {
  return stores.filter((store) => store.citySlug === slug && !store.closed && store.role !== "dropoff");
}

export function dropsInCity(slug: string) {
  return stores.filter((store) => store.citySlug === slug && !store.closed && store.role === "dropoff");
}

export function openStores() {
  return stores.filter((store) => !store.closed && store.role !== "dropoff");
}

export const kindLabel: Record<Store["kind"], string> = {
  thrift: "Thrift shop",
  bargain: "Bargain floor",
  books: "Bookstore",
  vintage: "Vintage",
  resale: "Resale",
  restore: "ReStore",
  dropoff: "Drop-off only",
};
