--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."Account" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO taha;

--
-- Name: Account_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."Account_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Account_id_seq" OWNER TO taha;

--
-- Name: Account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."Account_id_seq" OWNED BY public."Account".id;


--
-- Name: BuildGuide; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."BuildGuide" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    difficulty text NOT NULL,
    "estimatedTime" text NOT NULL,
    "authorId" integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    views integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."BuildGuide" OWNER TO taha;

--
-- Name: BuildGuideComponent; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."BuildGuideComponent" (
    id integer NOT NULL,
    "buildGuideId" text NOT NULL,
    "componentId" text NOT NULL
);


ALTER TABLE public."BuildGuideComponent" OWNER TO taha;

--
-- Name: BuildGuideComponent_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."BuildGuideComponent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BuildGuideComponent_id_seq" OWNER TO taha;

--
-- Name: BuildGuideComponent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."BuildGuideComponent_id_seq" OWNED BY public."BuildGuideComponent".id;


--
-- Name: BuildGuideImage; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."BuildGuideImage" (
    id integer NOT NULL,
    "buildGuideId" text NOT NULL,
    url text NOT NULL
);


ALTER TABLE public."BuildGuideImage" OWNER TO taha;

--
-- Name: BuildGuideImage_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."BuildGuideImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BuildGuideImage_id_seq" OWNER TO taha;

--
-- Name: BuildGuideImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."BuildGuideImage_id_seq" OWNED BY public."BuildGuideImage".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    "authorId" integer NOT NULL,
    "componentId" text,
    "buildGuideId" text,
    "userBuildId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Comment" OWNER TO taha;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comment_id_seq" OWNER TO taha;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Component; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."Component" (
    id text NOT NULL,
    name text NOT NULL,
    brand text NOT NULL,
    category text NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public."Component" OWNER TO taha;

--
-- Name: ComponentSpec; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."ComponentSpec" (
    id integer NOT NULL,
    "componentId" text NOT NULL,
    name text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public."ComponentSpec" OWNER TO taha;

--
-- Name: ComponentSpec_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."ComponentSpec_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComponentSpec_id_seq" OWNER TO taha;

--
-- Name: ComponentSpec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."ComponentSpec_id_seq" OWNED BY public."ComponentSpec".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    content text NOT NULL,
    rating integer,
    "authorId" integer,
    "componentId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Review" OWNER TO taha;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO taha;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."Session" (
    id integer NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" integer NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO taha;

--
-- Name: Session_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."Session_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Session_id_seq" OWNER TO taha;

--
-- Name: Session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."Session_id_seq" OWNED BY public."Session".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text,
    email text NOT NULL,
    "passwordHash" text,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO taha;

--
-- Name: UserBuild; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."UserBuild" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "authorId" integer,
    date timestamp(3) without time zone NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    "commentsCount" integer DEFAULT 0 NOT NULL,
    shared boolean DEFAULT false NOT NULL
);


ALTER TABLE public."UserBuild" OWNER TO taha;

--
-- Name: UserBuildComponent; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."UserBuildComponent" (
    id integer NOT NULL,
    "userBuildId" text NOT NULL,
    "componentId" text NOT NULL
);


ALTER TABLE public."UserBuildComponent" OWNER TO taha;

--
-- Name: UserBuildComponent_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."UserBuildComponent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserBuildComponent_id_seq" OWNER TO taha;

--
-- Name: UserBuildComponent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."UserBuildComponent_id_seq" OWNED BY public."UserBuildComponent".id;


--
-- Name: UserBuildImage; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."UserBuildImage" (
    id integer NOT NULL,
    "userBuildId" text NOT NULL,
    url text NOT NULL
);


ALTER TABLE public."UserBuildImage" OWNER TO taha;

--
-- Name: UserBuildImage_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."UserBuildImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserBuildImage_id_seq" OWNER TO taha;

--
-- Name: UserBuildImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."UserBuildImage_id_seq" OWNED BY public."UserBuildImage".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: taha
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO taha;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taha
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO taha;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: taha
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO taha;

--
-- Name: Account id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Account" ALTER COLUMN id SET DEFAULT nextval('public."Account_id_seq"'::regclass);


--
-- Name: BuildGuideComponent id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuideComponent" ALTER COLUMN id SET DEFAULT nextval('public."BuildGuideComponent_id_seq"'::regclass);


--
-- Name: BuildGuideImage id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuideImage" ALTER COLUMN id SET DEFAULT nextval('public."BuildGuideImage_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: ComponentSpec id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."ComponentSpec" ALTER COLUMN id SET DEFAULT nextval('public."ComponentSpec_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Session id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Session" ALTER COLUMN id SET DEFAULT nextval('public."Session_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserBuildComponent id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuildComponent" ALTER COLUMN id SET DEFAULT nextval('public."UserBuildComponent_id_seq"'::regclass);


--
-- Name: UserBuildImage id; Type: DEFAULT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuildImage" ALTER COLUMN id SET DEFAULT nextval('public."UserBuildImage_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- Data for Name: BuildGuide; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."BuildGuide" (id, title, description, difficulty, "estimatedTime", "authorId", date, likes, views) FROM stdin;
guide-1	Budget Gaming PC Build	A budget-friendly gaming PC build that can handle most modern games at 1080p.	Beginner	2-3 hours	1	2023-05-15 00:00:00	245	12500
guide-2	High-End Gaming PC Build	A high-end gaming PC build that can handle 4K gaming and content creation.	Intermediate	3-4 hours	2	2023-06-22 00:00:00	378	18900
guide-3	Compact Mini-ITX Build	A compact Mini-ITX build that's perfect for small spaces.	Advanced	4-5 hours	3	2023-07-10 00:00:00	156	8700
guide-4	Workstation Build for Content Creation	A powerful workstation build for video editing, 3D rendering, and other content creation tasks.	Intermediate	3-4 hours	4	2023-08-05 00:00:00	210	11200
\.


--
-- Data for Name: BuildGuideComponent; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."BuildGuideComponent" (id, "buildGuideId", "componentId") FROM stdin;
1	guide-1	case-2
2	guide-1	psu-3
3	guide-1	storage-4
4	guide-1	gpu-4
5	guide-1	ram-2
6	guide-1	mb-3
7	guide-1	cpu-3
8	guide-2	case-4
9	guide-2	psu-2
10	guide-2	storage-3
11	guide-2	gpu-3
12	guide-2	ram-1
13	guide-2	mb-2
14	guide-2	cpu-2
15	guide-3	case-1
16	guide-3	psu-1
17	guide-3	storage-1
18	guide-3	gpu-1
19	guide-3	ram-3
20	guide-3	mb-1
21	guide-3	cpu-1
22	guide-4	case-3
23	guide-4	psu-2
24	guide-4	storage-3
25	guide-4	gpu-2
26	guide-4	ram-4
27	guide-4	mb-1
28	guide-4	cpu-1
\.


--
-- Data for Name: BuildGuideImage; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."BuildGuideImage" (id, "buildGuideId", url) FROM stdin;
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."Comment" (id, content, "authorId", "componentId", "buildGuideId", "userBuildId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Component; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."Component" (id, name, brand, category, price) FROM stdin;
cpu-1	Ryzen 7 5800X	AMD	cpu	299.99
cpu-2	Core i7-12700K	Intel	cpu	379.99
cpu-3	Ryzen 5 5600X	AMD	cpu	199.99
cpu-4	Core i5-12600K	Intel	cpu	279.99
mb-1	B550 Tomahawk	MSI	motherboard	169.99
mb-2	Z690 Aorus Elite	Gigabyte	motherboard	249.99
mb-3	X570 Gaming Plus	MSI	motherboard	159.99
mb-4	B660 Gaming X	Gigabyte	motherboard	149.99
ram-1	Vengeance RGB Pro 32GB	Corsair	ram	129.99
ram-2	Trident Z RGB 16GB	G.Skill	ram	89.99
ram-3	Fury Beast 32GB	Kingston	ram	169.99
ram-4	Dominator Platinum 32GB	Corsair	ram	219.99
gpu-1	GeForce RTX 3070	NVIDIA	gpu	599.99
gpu-2	Radeon RX 6800 XT	AMD	gpu	649.99
gpu-3	GeForce RTX 3080	NVIDIA	gpu	699.99
gpu-4	Radeon RX 6700 XT	AMD	gpu	479.99
storage-1	970 EVO Plus 1TB	Samsung	storage	119.99
storage-2	Barracuda 2TB	Seagate	storage	54.99
storage-3	SN850 2TB	Western Digital	storage	249.99
storage-4	MX500 1TB	Crucial	storage	89.99
psu-1	RM750x	Corsair	psu	129.99
psu-2	SuperNOVA 850 G5	EVGA	psu	149.99
psu-3	Focus GX-650	Seasonic	psu	109.99
psu-4	Toughpower GF1 750W	Thermaltake	psu	119.99
case-1	4000D Airflow	Corsair	case	94.99
case-2	H510	NZXT	case	69.99
case-3	Meshify C	Fractal Design	case	89.99
case-4	Lancool II Mesh	Lian Li	case	109.99
\.


--
-- Data for Name: ComponentSpec; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."ComponentSpec" (id, "componentId", name, value) FROM stdin;
1	cpu-1	Cores	8
2	cpu-1	Threads	16
3	cpu-1	Base Clock	3.8 GHz
4	cpu-1	Socket	AM4
5	cpu-1	TDP	105W
6	cpu-2	Cores	12 (8P+4E)
7	cpu-2	Threads	20
8	cpu-2	Base Clock	3.6 GHz
9	cpu-2	Socket	LGA1700
10	cpu-2	TDP	125W
11	cpu-3	Cores	6
12	cpu-3	Threads	12
13	cpu-3	Base Clock	3.7 GHz
14	cpu-3	Socket	AM4
15	cpu-3	TDP	65W
16	cpu-4	Cores	10 (6P+4E)
17	cpu-4	Threads	16
18	cpu-4	Base Clock	3.7 GHz
19	cpu-4	Socket	LGA1700
20	cpu-4	TDP	125W
21	mb-1	Socket	AM4
22	mb-1	Form Factor	ATX
23	mb-1	Memory Slots	4
24	mb-1	Max Memory	128GB
25	mb-1	PCIe x16 Slots	2
26	mb-2	Socket	LGA1700
27	mb-2	Form Factor	ATX
28	mb-2	Memory Slots	4
29	mb-2	Max Memory	128GB
30	mb-2	PCIe x16 Slots	2
31	mb-3	Socket	AM4
32	mb-3	Form Factor	ATX
33	mb-3	Memory Slots	4
34	mb-3	Max Memory	128GB
35	mb-3	PCIe x16 Slots	2
36	mb-4	Socket	LGA1700
37	mb-4	Form Factor	ATX
38	mb-4	Memory Slots	4
39	mb-4	Max Memory	128GB
40	mb-4	PCIe x16 Slots	1
41	ram-1	Capacity	32GB (2x16GB)
42	ram-1	Type	DDR4
43	ram-1	Speed	3600MHz
44	ram-1	CAS Latency	CL18
45	ram-1	Voltage	1.35V
46	ram-2	Capacity	16GB (2x8GB)
47	ram-2	Type	DDR4
48	ram-2	Speed	3200MHz
49	ram-2	CAS Latency	CL16
50	ram-2	Voltage	1.35V
51	ram-3	Capacity	32GB (2x16GB)
52	ram-3	Type	DDR5
53	ram-3	Speed	5200MHz
54	ram-3	CAS Latency	CL40
55	ram-3	Voltage	1.25V
56	ram-4	Capacity	32GB (2x16GB)
57	ram-4	Type	DDR5
58	ram-4	Speed	5600MHz
59	ram-4	CAS Latency	CL36
60	ram-4	Voltage	1.25V
61	gpu-1	VRAM	8GB GDDR6
62	gpu-1	Boost Clock	1.73 GHz
63	gpu-1	CUDA Cores	5888
64	gpu-1	Power Connectors	1x 12-pin
65	gpu-1	TDP	220W
66	gpu-2	VRAM	16GB GDDR6
67	gpu-2	Boost Clock	2.25 GHz
68	gpu-2	Stream Processors	4608
69	gpu-2	Power Connectors	2x 8-pin
70	gpu-2	TDP	300W
71	gpu-3	VRAM	10GB GDDR6X
72	gpu-3	Boost Clock	1.71 GHz
73	gpu-3	CUDA Cores	8704
74	gpu-3	Power Connectors	2x 8-pin
75	gpu-3	TDP	320W
76	gpu-4	VRAM	12GB GDDR6
77	gpu-4	Boost Clock	2.58 GHz
78	gpu-4	Stream Processors	2560
79	gpu-4	Power Connectors	1x 8-pin + 1x 6-pin
80	gpu-4	TDP	230W
81	storage-1	Capacity	1TB
82	storage-1	Type	NVMe SSD
83	storage-1	Read Speed	3500 MB/s
84	storage-1	Write Speed	3300 MB/s
85	storage-1	Form Factor	M.2 2280
86	storage-2	Capacity	2TB
87	storage-2	Type	HDD
88	storage-2	Speed	7200 RPM
89	storage-2	Cache	256MB
90	storage-2	Form Factor	3.5"
91	storage-3	Capacity	2TB
92	storage-3	Type	NVMe SSD
93	storage-3	Read Speed	7000 MB/s
94	storage-3	Write Speed	5300 MB/s
95	storage-3	Form Factor	M.2 2280
96	storage-4	Capacity	1TB
97	storage-4	Type	SATA SSD
98	storage-4	Read Speed	560 MB/s
99	storage-4	Write Speed	510 MB/s
100	storage-4	Form Factor	2.5"
101	psu-1	Wattage	750W
102	psu-1	Efficiency	80+ Gold
103	psu-1	Modularity	Fully Modular
104	psu-1	Fan Size	135mm
105	psu-1	ATX Version	2.4
106	psu-2	Wattage	850W
107	psu-2	Efficiency	80+ Gold
108	psu-2	Modularity	Fully Modular
109	psu-2	Fan Size	135mm
110	psu-2	ATX Version	2.4
111	psu-3	Wattage	650W
112	psu-3	Efficiency	80+ Gold
113	psu-3	Modularity	Fully Modular
114	psu-3	Fan Size	120mm
115	psu-3	ATX Version	2.4
116	psu-4	Wattage	750W
117	psu-4	Efficiency	80+ Gold
118	psu-4	Modularity	Fully Modular
119	psu-4	Fan Size	140mm
120	psu-4	ATX Version	2.4
121	case-1	Form Factor	Mid Tower
122	case-1	Motherboard Support	ATX, mATX, Mini-ITX
123	case-1	Drive Bays	2x 3.5", 2x 2.5"
124	case-1	Front I/O	1x USB 3.1 Type-C, 1x USB 3.0, Audio
125	case-1	Dimensions	453 x 230 x 466 mm
126	case-2	Form Factor	Mid Tower
127	case-2	Motherboard Support	ATX, mATX, Mini-ITX
128	case-2	Drive Bays	3x 3.5", 2x 2.5"
129	case-2	Front I/O	1x USB 3.1 Type-C, 1x USB 3.0, Audio
130	case-2	Dimensions	428 x 210 x 460 mm
131	case-3	Form Factor	Mid Tower
132	case-3	Motherboard Support	ATX, mATX, Mini-ITX
133	case-3	Drive Bays	2x 3.5", 3x 2.5"
134	case-3	Front I/O	2x USB 3.0, Audio
135	case-3	Dimensions	413 x 217 x 453 mm
136	case-4	Form Factor	Mid Tower
137	case-4	Motherboard Support	E-ATX, ATX, mATX, Mini-ITX
138	case-4	Drive Bays	3x 3.5", 4x 2.5"
139	case-4	Front I/O	2x USB 3.0, 1x USB 3.1 Type-C, Audio
140	case-4	Dimensions	478 x 229 x 494 mm
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."Review" (id, content, rating, "authorId", "componentId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."User" (id, name, email, "passwordHash", image, "createdAt") FROM stdin;
1	PCBuildPro	pcbuildpro@example.com	\N	\N	2025-04-28 18:28:28.172
2	TechGuru	techguru@example.com	\N	\N	2025-04-28 18:28:28.188
3	SFFMaster	sffmaster@example.com	\N	\N	2025-04-28 18:28:28.199
4	CreatorPro	creatorpro@example.com	\N	\N	2025-04-28 18:28:28.213
5	GamerNewbie	gamernewbie@example.com	\N	\N	2025-04-28 18:28:28.228
6	4KGamer	4kgamer@example.com	\N	\N	2025-04-28 18:28:28.246
7	SFFEnthusiast	sffenthusiast@example.com	\N	\N	2025-04-28 18:28:28.261
8	StreamerOnABudget	streameronabudget@example.com	\N	\N	2025-04-28 18:28:28.276
9	Taha	trdev4@gmail.com	$2b$10$zPVp6eUgJzNlkBk94Z8RBut9kciZvGM5f.619q4d2NyVVlR.cHTle	\N	2025-04-30 13:08:20.168
10	sameed ahmed siddiqui	sameed@gmail.com	$2b$10$/B47Y.qvZe4YuPF/soS5UOQlUiQlOy.RNCI/5fLmm/JF4ZG7nzf/C	\N	2025-05-03 14:24:50.548
\.


--
-- Data for Name: UserBuild; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."UserBuild" (id, title, description, "authorId", date, likes, "commentsCount", shared) FROM stdin;
build-1	My First Gaming PC	My first gaming PC build. It's not much, but it's mine!	5	2023-06-10 00:00:00	45	12	t
build-2	Dream 4K Gaming Rig	Finally built my dream 4K gaming rig. It's a beast!	6	2023-07-15 00:00:00	87	24	t
build-3	Compact Powerhouse	A small form factor build that packs a punch.	7	2023-08-20 00:00:00	62	18	t
build-4	Budget Streaming Setup	A budget-friendly PC build for streaming and light gaming.	8	2023-09-05 00:00:00	34	9	t
\.


--
-- Data for Name: UserBuildComponent; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."UserBuildComponent" (id, "userBuildId", "componentId") FROM stdin;
1	build-1	case-2
2	build-1	psu-3
3	build-1	storage-4
4	build-1	gpu-4
5	build-1	ram-2
6	build-1	mb-3
7	build-1	cpu-3
8	build-2	case-4
9	build-2	psu-2
10	build-2	storage-3
11	build-2	gpu-3
12	build-2	ram-1
13	build-2	mb-2
14	build-2	cpu-2
15	build-3	case-1
16	build-3	psu-1
17	build-3	storage-1
18	build-3	gpu-1
19	build-3	ram-3
20	build-3	mb-1
21	build-3	cpu-1
22	build-4	case-2
23	build-4	psu-3
24	build-4	storage-2
25	build-4	gpu-4
26	build-4	ram-2
27	build-4	mb-4
28	build-4	cpu-3
\.


--
-- Data for Name: UserBuildImage; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."UserBuildImage" (id, "userBuildId", url) FROM stdin;
1	build-1	/placeholder.svg?height=400&width=600
2	build-2	/placeholder.svg?height=400&width=600
3	build-2	/placeholder.svg?height=400&width=600
4	build-3	/placeholder.svg?height=400&width=600
5	build-4	/placeholder.svg?height=400&width=600
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: taha
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e8c34839-6d7b-4ed7-b9c9-206913f5aa7d	f28fedfa9bf0cefa8e1c83b4c45cb53e28d0428c5c0dd221fe71a9b52b30e533	2025-04-28 17:00:19.952584+00	20250428170019_init	\N	\N	2025-04-28 17:00:19.729571+00	1
d27e2a40-f10f-4d7b-8c82-c8300d83df6b	096f07dd9dfcb55d9c9fbf3cbce357d8f84ad4d18d1e7eb2551ba9dece61e624	2025-04-30 06:52:27.227283+00	20250430065227_add_review_table	\N	\N	2025-04-30 06:52:27.170641+00	1
1677aa91-e6cd-4e46-93f2-5c92e7799f65	bb982c24d6a3c8413743d94ed73e65ae2aeaca952bb1bb57ad14ae281cc415e3	2025-04-30 11:45:01.834242+00	20250430114501_add_shared_to_userbuild	\N	\N	2025-04-30 11:45:01.808349+00	1
\.


--
-- Name: Account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."Account_id_seq"', 1, false);


--
-- Name: BuildGuideComponent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."BuildGuideComponent_id_seq"', 28, true);


--
-- Name: BuildGuideImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."BuildGuideImage_id_seq"', 1, false);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 1, false);


--
-- Name: ComponentSpec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."ComponentSpec_id_seq"', 140, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, false);


--
-- Name: Session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."Session_id_seq"', 1, false);


--
-- Name: UserBuildComponent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."UserBuildComponent_id_seq"', 28, true);


--
-- Name: UserBuildImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."UserBuildImage_id_seq"', 5, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taha
--

SELECT pg_catalog.setval('public."User_id_seq"', 10, true);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: BuildGuideComponent BuildGuideComponent_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuideComponent"
    ADD CONSTRAINT "BuildGuideComponent_pkey" PRIMARY KEY (id);


--
-- Name: BuildGuideImage BuildGuideImage_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuideImage"
    ADD CONSTRAINT "BuildGuideImage_pkey" PRIMARY KEY (id);


--
-- Name: BuildGuide BuildGuide_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuide"
    ADD CONSTRAINT "BuildGuide_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: ComponentSpec ComponentSpec_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."ComponentSpec"
    ADD CONSTRAINT "ComponentSpec_pkey" PRIMARY KEY (id);


--
-- Name: Component Component_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Component"
    ADD CONSTRAINT "Component_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: UserBuildComponent UserBuildComponent_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuildComponent"
    ADD CONSTRAINT "UserBuildComponent_pkey" PRIMARY KEY (id);


--
-- Name: UserBuildImage UserBuildImage_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuildImage"
    ADD CONSTRAINT "UserBuildImage_pkey" PRIMARY KEY (id);


--
-- Name: UserBuild UserBuild_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuild"
    ADD CONSTRAINT "UserBuild_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: taha
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: taha
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: taha
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: taha
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: taha
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BuildGuideComponent BuildGuideComponent_buildGuideId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuideComponent"
    ADD CONSTRAINT "BuildGuideComponent_buildGuideId_fkey" FOREIGN KEY ("buildGuideId") REFERENCES public."BuildGuide"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BuildGuideComponent BuildGuideComponent_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuideComponent"
    ADD CONSTRAINT "BuildGuideComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."Component"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BuildGuideImage BuildGuideImage_buildGuideId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuideImage"
    ADD CONSTRAINT "BuildGuideImage_buildGuideId_fkey" FOREIGN KEY ("buildGuideId") REFERENCES public."BuildGuide"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BuildGuide BuildGuide_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."BuildGuide"
    ADD CONSTRAINT "BuildGuide_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_buildGuideId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_buildGuideId_fkey" FOREIGN KEY ("buildGuideId") REFERENCES public."BuildGuide"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."Component"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_userBuildId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userBuildId_fkey" FOREIGN KEY ("userBuildId") REFERENCES public."UserBuild"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ComponentSpec ComponentSpec_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."ComponentSpec"
    ADD CONSTRAINT "ComponentSpec_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."Component"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Review Review_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."Component"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserBuildComponent UserBuildComponent_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuildComponent"
    ADD CONSTRAINT "UserBuildComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."Component"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserBuildComponent UserBuildComponent_userBuildId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuildComponent"
    ADD CONSTRAINT "UserBuildComponent_userBuildId_fkey" FOREIGN KEY ("userBuildId") REFERENCES public."UserBuild"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserBuildImage UserBuildImage_userBuildId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuildImage"
    ADD CONSTRAINT "UserBuildImage_userBuildId_fkey" FOREIGN KEY ("userBuildId") REFERENCES public."UserBuild"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserBuild UserBuild_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taha
--

ALTER TABLE ONLY public."UserBuild"
    ADD CONSTRAINT "UserBuild_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

SELECT "userBuildId", COUNT(*)
FROM "UserBuildImage"
GROUP BY "userBuildId"
HAVING COUNT(*) > 1;

DELETE FROM "UserBuildImage"
WHERE id NOT IN (
  SELECT MIN(id)
  FROM "UserBuildImage"
  GROUP BY "userBuildId"
);

SELECT "userBuildId", COUNT(*)
FROM "UserBuildImage"
GROUP BY "userBuildId"
HAVING COUNT(*) > 1;

GRANT ALL ON SCHEMA public TO sameed;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sameed;


--
-- PostgreSQL database dump complete
--

