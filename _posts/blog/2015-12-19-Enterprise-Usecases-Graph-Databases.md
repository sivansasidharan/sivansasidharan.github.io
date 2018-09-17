---
layout: post
category: blog
title: "Enterprise Usecases - Graph Databases"
excerpt: "Overview on few Enterprise Usecases leveraging Graphs"
tags: [neo4j,bigdata, hadoop, apache, hortonworks, graphdatabases]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

#### Enterprise Usecases

> Network and Data Centre Management

Communications networks are graph structures; graph databases are, therefore, a great fit for modelling, storing, and querying this kind of domain data.A graph representation of a network enables:

    --> To catalogue assets
    --> Visualize how they are deployed
    --> Identify the dependencies between Assets. 

The graph’s connected structure, together with a query language like Cypher, enable us to conduct sophisticated impact analyses.

__Helps answering following questions:__

--> Which parts of the network — which applications, services, virtual machines, physical machines, data centers, routers, switches, and fibre — do important customers depend on? (Top-down analysis)

--> Conversely, which applications and services, and ultimately, customers, in the network will be affected if a particular network element — a router or switch, for example — fails? (Bottom-up analysis)

--> Is there redundancy throughout the network for the most important customers?

Graph databases can be used to bring together data from disparate inventory systems, providing a single view of the network and its consumers, from the smallest network element all the way to application and services and the customers who use them. It can also be used to enrich operational intelligence based on event correlations.

Graph databases are being successfully employed in the areas of telecommunications, network management and analysis, cloud platform management, data center and IT asset management, and network impact analysis

---

> Authorization and Access Control (Communications)

Graph database access control and authorization solutions are particularly applicable in the areas of content manage-ment, federated authorization services, social networking preferences, and software as a service (SaaS) offerings.

Authorization and access control solutions (_traditionally using directory services or custom solutions_) : 

--> Store information about parties (e.g., administrators, organizational units, end-users) and resources (e.g., files, shares, network devices, products, services, agreements)

--> Holds/defines the rules governing access to those resources

--> Apply these rules to determine who can access or manipulate a resource

__With Graph databases__ : 

--> Can store complex, densely connected access control structures spanning billions of parties and resources

--> Its structured yet schema-free data model supports both hierarchical and non-hierarchical structures

--> Extensible property model allows for capturing rich metadata regarding every element in the system

--> With a query engine that can traverse millions of relationships per second, access lookups over large, complex structures execute in milliseconds

---

> Master Data Management

Master data is data that is critical to the operation of a business, but which itself is non-transactional.Master data includes data concerning users, customers, products, sup‐ pliers, departments, geographies, sites, cost centres, and business units.Data is often held in many different places, with lots of overlap and redundancy, in many different formats, and with varying degrees of quality and means of access.Master Data Management (MDM) is the practice of identifying, cleaning, storing, and, most importantly, governing this data.

Graph databases don’t provide a full MDM solution; they are, however, ideally applied to the modelling, storing, and querying of hierarchies, master data metadata, and master data models, and also allowing for the rapid evolution of the master data model in line with changing business needs.

> Social and Recommendations

Social applications allow organizations to gain competitive and operational advantage by leveraging information about the connections between people,bring in discrete information about individuals,facilitate collaboration and flow of information & predict behaviour.

--> Effective recommendations are a prime example of generating end-user value through the application of an inferential or suggestive capability.

--> Recommendation algorithms are inductive and suggestive, identifying people, products, or services an individual or group is likely to have some interest in.

--> Recommendation algorithms establish relationships between people and things: other people, products, services, media content (as relevant to the domain)

--> Making an effective recommendation depends on understanding the connections between things, as well as the quality and strength of those connections — all of which are best expressed as a property graph.

--> Social networks and recommendation engines provide key differentiating capabilities in the areas of retail, recruitment, sentiment analysis, search, and knowledge management.

Graphs are a good fit for such the densely connected data structures — Storing and querying this data using a graph database allows an application to surface end-user real-time results that reflect recent changes to the data, rather than pre-calculated, stale results.

---

##### References 

[Neo4j](http://neo4j.com/)
[Neotechnology](http://info.neotechnology.com/rs/neotechnology)
[Graphaware](http://graphaware.com/)
[Neo4j Developer](http://neo4j.com/developer/)
[Infoq](http://www.infoq.com/research)
[Slideshare](http://www.slideshare.net)
[Forbes](http://www.forbes.com/)
[Gartner](http://www.gartner.com/doc/2610218)

