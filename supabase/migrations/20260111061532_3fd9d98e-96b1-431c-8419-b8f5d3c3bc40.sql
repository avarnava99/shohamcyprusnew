-- Insert blog categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Port Agency News', 'port-agency-news', 'News about port agency operations and maritime services'),
('Oil & Gas', 'oil-gas', 'Oil and gas industry news and developments'),
('Energy', 'energy', 'Energy sector news and updates'),
('Car Shipping', 'car-shipping', 'Car shipping, import, and export news'),
('Customs Clearance', 'customs-clearance', 'Customs and import regulations updates'),
('ZIM Cyprus', 'zim-cyprus', 'ZIM shipping line news and updates'),
('Shipping News', 'shipping-news', 'General shipping industry news'),
('Freight Forwarding', 'freight-forwarding', 'Freight and logistics news'),
('Cyprus Marina', 'cyprus-marina', 'Marina developments and yacht news'),
('eCommerce', 'ecommerce', 'E-commerce and online retail news')
ON CONFLICT (slug) DO NOTHING;

-- Insert blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, published, published_at) VALUES
-- Port Agency News
('New bigger cranes for Limassol', 'the-new-cranes-in-limassol', 
'<p>Limassol port container terminal operator Eurogate said Tuesday it has taken delivery of two new gantry cranes that will enable the company to handle the biggest cargo ships worldwide.</p>
<p>Eurogate said the Super Post – Panamax cranes arrived on Tuesday and would be put in operation as soon as possible.</p>
<p>The company''s director, Giorgos Pouros, said the cranes will allow the company to offer better service since they can handle the largest ships in the world.</p>
<p>The gantries were manufactured in Italy and can serve ships with the capacity of carrying 23 rows of containers across their deck. Their acquisition is part of a €30m investment package.</p>', 
'Limassol port container terminal operator Eurogate has taken delivery of two new gantry cranes.', 
true, '2018-11-25'),

('Limassol anchorage', 'limassol-anchorage',
'<h2>Short calls at Limassol Anchorage for crew changes, bunkering, provisions and waiting for orders.</h2>
<p>Vessels can call Limassol anchorage where we can assist with crew changes, bunkering, ship spares and provisions.</p>
<p>The convenient position of the anchorage makes easy to perform these tasks efficiently and fast.</p>
<p>Vessels can make short calls of under 12 hours stay and pay low port charges.</p>
<p>Finally vessels can wait for orders at a low rate.</p>
<p>Please contact us for a competitive proforma DA.</p>',
'Short calls at Limassol Anchorage for crew changes, bunkering, provisions and waiting for orders.',
true, '2013-11-30'),

('ZIM vessel operation with 3 gantry cranes', 'zim-vessel-operation-with-3-gantry-cranes',
'<p>ZIM vessel M/V E.R. PUSAN was operating in Eurogate Limassol terminal for the first time in Limassol port history with 3 gantry cranes.</p>
<p>One of the gantry cranes from the East Quay has been moved to the Eurogate quay recently.</p>
<p>M/V E.R. PUSAN is the first container vessel ever operating with 3 gantry cranes in Limassol port.</p>',
'ZIM vessel operation in Limassol port Cyprus. The first time a vessel is operating with 3 gantry cranes.',
true, '2019-04-28'),

('Moni anchorage', 'moni-anchorage',
'<p>Moni is an anchorage area which is operated by the Cyprus Ports Authority.</p>
<p>The UN Port code is CYMOI and is situated in Limassol area.</p>
<h3>What are those cruise ships doing in Moni, Limassol?</h3>
<p>Recently you can see quite a few cruise ships anchored in Moni.</p>
<p>Due to the COVID19 crisis the cruise vessels have been anchoraged there until the situation is more clear.</p>
<p>If you are a ship owner and you want to check the charges for Moni Limassol anchorage please contact us.</p>',
'Information about Moni Anchorage in Limassol, Cyprus.',
true, '2020-08-14'),

-- Oil & Gas
('TOTAL may expand presence into block 8', 'frances-total-may-expand-presence-into-block-8-of-eez',
'<h2>French energy giant Total wants to expand its presence into block 8 of Cyprus'' exclusive economic zone (EEZ) Energy Minister Yiorgos Lakkotrypis said on Monday.</h2>
<p>Speaking to reporters at the presidential palace after the meeting between President Nicos Anastasiades and the Regional Director of Total, Stephane Michel, Lakkotrypis said the discussion had been constructive.</p>
<p>"The next steps in the exploration programme were discussed and one of the most important issues was the interest by Total in participating in block 8," he said.</p>
<p>Block 8 was licensed to Italy''s ENI and "now we see interest by the French company to grow in this segment. It is a very important development that strengthens the [ENI-Total] consortium and expand its presence in Cyprus'' EEZ," Lakkotrypis added.</p>',
'French energy giant Total wants to expand its presence into block 8 of Cyprus'' exclusive economic zone.',
true, '2018-02-06'),

('Defa publishes tender documents for LNG terminal', 'defa-publishes-tender-documents-for-lng-terminal',
'<p>Cyprus'' natural gas public company (DEFA) on Friday published the tender documents for the design, construction, and operation of an LNG import terminal that will be located at Vassilikos.</p>
<p>"This is an important milestone for DEFA, and for the people of Cyprus, who will soon benefit from the cost savings and environmental benefits from the use of natural gas. We expect to issue a request for expressions of interest for the supply of LNG in the coming weeks and a full tender early in 2019," DEFA chairman Symeon Kassianides said.</p>
<p>The €300m LNG Terminal will include a floating storage and regasification unit (FSRU), a jetty for mooring the FSRU, a jetty-borne gas pipeline and related infrastructure.</p>
<p>The LNG Terminal will be completed in 2020 and 40 per cent of its cost, or €101m, will be funded by the EU.</p>',
'Cyprus'' natural gas public company (DEFA) published the tender documents for the LNG import terminal.',
true, '2018-10-05'),

('Eight offshore drills for hydrocarbons over next 24 months', 'eight-offshore-drills-for-hydrocarbons-over-next-24-months',
'<p>Cyprus plans to carry out eight offshore drills for hydrocarbons over the next 24 months, the government revealed on Tuesday.</p>
<p>"Activities within the Exclusive Economic Zone are ongoing. For the next 24 months we are planning eight drills, six exploratory and two appraisal drills," energy minister Giorgos Lakkotrypis said presenting an overview of his ministry''s work over the past year.</p>
<p>He did not disclose where the drills would be taking place, but said the targets have been identified.</p>
<p>The intention is for the drilling programme to commence by the end of this year or early 2020.</p>',
'Cyprus plans to carry out eight offshore drills for hydrocarbons over the next 24 months.',
true, '2019-05-26'),

('ENI and Total drillings officially on hold for one year', 'eni-and-total-drillings-officially-on-hold-for-one-year',
'<p>Energy companies ENI and Total have notified the government they are postponing their scheduled gas drilling operations off Cyprus for approximately one year.</p>
<p>Government spokesman Kyriacos Koushios confirmed to the Cyprus Mail that they recently received word of the delay from the two companies.</p>
<p>Drilling will be postponed until March 2021 due to the coronavirus pandemic and falling oil prices.</p>',
'Energy companies ENI and Total have postponed their scheduled gas drilling operations off Cyprus.',
true, '2020-05-05'),

-- Shipping News
('We work intensively on Cyprus-Greece ferry link', 'we-work-intensively-on-cyprus-greece-ferry-link-shipping-deputy-minister-says',
'<h2>The Minister pointed out that these data which must be examined are quite complex, adding that there are various issues regarding government subsidy of passengers.</h2>
<p>Shipping Deputy Minister Natasa Pilides has said that Ministry staff is working feverishly on the proposal to be presented to the European Commission regarding a ferry connection between Cyprus and Greece which is expected to be operational by the upcoming summer season.</p>
<p>Speaking to the press in Limassol, Natasa Pilides said that the Ministry is working very intensively on this matter noting that employees at the Ministry are exclusively dealing with this issue by preparing the data to be submitted to the European Commission.</p>',
'Shipping Deputy Minister Natasa Pilides on the Cyprus-Greece ferry connection plans.',
true, '2019-10-26'),

-- Cyprus Marina
('Ayia Napa Marina Nearing Completion', 'ayia-napa-marina-nearing-completion',
'<p>The flagship Ayia Napa Marina project is now in the final phase of its construction, gearing up to the start of operations, with the main infrastructure building works nearing completion.</p>
<p>This marks a milestone for the iconic project, promoting development and projecting the power of Cypriot entrepreneurship, which will, upon completion, contribute significantly to showcasing Cyprus'' high tourism profile.</p>
<p>Administration offices, buildings housing government services (port, police, customs, medical services, veterinary services), maintenance facilities, as well as boat storage, have already been delivered.</p>',
'The flagship Ayia Napa Marina project is now in the final phase of its construction.',
true, '2020-05-16'),

('Larnaca port, marina rebuild gets final nod', 'larnaca-port-marina-rebuild-gets-final-nod',
'<p>The long-awaited €1.2 bln redevelopment of Larnaca port and its marina got the final green light Monday after the Transport Ministry sent a ''Successful Tenderer Letter'' to the chosen consortium after protracted negotiations.</p>
<p>The consortium awarded the project is Kition Ocean Holdings, a Cypriot-Israeli consortium, composing of investors Eldeman Holding and Alexandrou Corporate Services.</p>',
'The long-awaited €1.2 bln redevelopment of Larnaca port and its marina got the final green light.',
true, '2020-08-04'),

-- Car Shipping
('Second-hand cars stranded at port as tax fraud scheme investigated', 'second-hand-cars-stranded-at-port-as-tax-fraud-scheme-investigated',
'<p>Hundreds of cars from the UK have been stranded at Limassol port since the weekend as the customs and tax departments issued a directive on Tuesday forcing buyers to pay a deposit to release their car from customs.</p>
<p>The issue caused mass confusion among those who had already bought the cars, as many were caught off-guard by the directive, and some did not have the money for the deposit, calculated at 25 per cent of the cost of the vehicle.</p>
<p>According to reports, 914 cars have been stranded at the port since the weekend as the directive was implemented without warning.</p>',
'Customs and tax departments issued a directive forcing buyers to pay a deposit to release their car from customs.',
true, '2020-10-28'),

-- Container Shipping
('Container shipping from Cyprus', 'container-shipping-from-cyprus',
'<h2>Offering container shipping services from Cyprus.</h2>
<p>Are you a Cyprus manufacturer?</p>
<p>Does your company need to return goods to your suppliers?</p>
<p>You can ship with ZIM lines from Limassol port to the following ports:</p>
<ul>
<li>Felixstowe</li>
<li>Antwerp</li>
<li>Rotterdam</li>
<li>Hamburg</li>
</ul>',
'Container shipping services from Cyprus to Europe via ZIM lines.',
true, '2020-11-05'),

-- Container dimensions info
('20 foot container dimensions', '20-foot-container-dimensions',
'<p>The standard <strong>20-foot container</strong> or "dry van" is one of the most commonly-used containers for the shipment of goods in ocean freight along with the 40-foot container.</p>
<h2>Dimensions of the 20-foot container</h2>
<p>External dimensions: 6.058m long × 2.438m wide × 2.591m high (19''10.5" × 8''0" × 8''6")</p>
<p>Internal dimensions: 5.898m long × 2.352m wide × 2.393m high (19''4" × 7''8.5" × 7''10")</p>
<p>Door opening: 2.343m wide × 2.280m high (7''8" × 7''5.5")</p>
<p>Tare weight: 2,300 kg (5,070 lbs)</p>
<p>Maximum payload: 25,000 kg (55,126 lbs)</p>
<p>Volume: 33.2 m³ (1,172 cu ft)</p>',
'Standard 20-foot container specifications and dimensions for ocean freight.',
true, '2020-05-20'),

-- eCommerce
('Shopify Cyprus Store', 'ecommerce-shopify-cyprus-store',
'<h2>Everything you need to start an ecommerce store and sell online</h2>
<p>Do you want to open an e-commerce Shop? We design and setup of your e-commerce shop with Shopify.</p>
<p>Shopify powers over 800,000 businesses worldwide. It''s the all-in-one commerce platform to start, run, and grow an online business.</p>
<p>Selling online has never been easier. Contact us to learn how we can help you build your Shopify store.</p>',
'Design and setup of your e-commerce shop with Shopify in Cyprus.',
true, '2019-10-26'),

-- More recent posts
('OPL Limassol Services', 'opl-limassol-services',
'<h2>OPL (Outer Port Limits) Limassol Services</h2>
<p>Shoham provides comprehensive OPL services at Limassol anchorage for vessels requiring quick turnaround operations.</p>
<p>Our OPL services include:</p>
<ul>
<li>Crew changes</li>
<li>Bunker arrangements</li>
<li>Provisions supply</li>
<li>Spare parts delivery</li>
<li>Cash to master</li>
</ul>
<p>Contact our operations team for competitive rates and efficient service.</p>',
'Comprehensive OPL services at Limassol anchorage for vessels.',
true, '2025-08-20');

-- Update category_id for posts (link posts to their categories)
UPDATE blog_posts SET category_id = (SELECT id FROM blog_categories WHERE slug = 'port-agency-news')
WHERE slug IN ('the-new-cranes-in-limassol', 'limassol-anchorage', 'zim-vessel-operation-with-3-gantry-cranes', 'moni-anchorage', 'opl-limassol-services');

UPDATE blog_posts SET category_id = (SELECT id FROM blog_categories WHERE slug = 'oil-gas')
WHERE slug IN ('frances-total-may-expand-presence-into-block-8-of-eez', 'defa-publishes-tender-documents-for-lng-terminal', 'eight-offshore-drills-for-hydrocarbons-over-next-24-months', 'eni-and-total-drillings-officially-on-hold-for-one-year');

UPDATE blog_posts SET category_id = (SELECT id FROM blog_categories WHERE slug = 'shipping-news')
WHERE slug IN ('we-work-intensively-on-cyprus-greece-ferry-link-shipping-deputy-minister-says', 'container-shipping-from-cyprus', '20-foot-container-dimensions');

UPDATE blog_posts SET category_id = (SELECT id FROM blog_categories WHERE slug = 'cyprus-marina')
WHERE slug IN ('ayia-napa-marina-nearing-completion', 'larnaca-port-marina-rebuild-gets-final-nod');

UPDATE blog_posts SET category_id = (SELECT id FROM blog_categories WHERE slug = 'car-shipping')
WHERE slug = 'second-hand-cars-stranded-at-port-as-tax-fraud-scheme-investigated';

UPDATE blog_posts SET category_id = (SELECT id FROM blog_categories WHERE slug = 'ecommerce')
WHERE slug = 'ecommerce-shopify-cyprus-store';