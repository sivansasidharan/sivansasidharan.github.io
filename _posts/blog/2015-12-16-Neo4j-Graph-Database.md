---
layout: post
category: blog
title: "Neo4j - Graph Database"
excerpt: "Overview on Neo4j & its capabilities & usecases"
tags: [bigdata, hadoop, apache, hortonworks, graphdatabases]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

#### What is Neo4j?
Sponsored by Neo Technology, Neo4j is an open-source NoSQL graph database implemented in Java and Scala.

    --> Neo4j is a Graph Database (with Lucene indexing)
    --> Non-relational (“#nosql”), transactional (ACID), embedded
    --> Data is stored as a Graph/Network 
        --> Nodes and relationships with properties 
        --> “Property Graph” or “edge-labeled multidigraph”
    --> Schema free, bottom-up data model design
    --> High Availability (with Enterprise Edition)
    --> 32 Billion Nodes, 32 Billion Relationships,64 Billion Properties
    --> Neo4j is Open Source/Free (as in speech) Software AGPLv3 
        --> Commercial (“dual license”) license available


Some particular features make Neo4j very popular among users, developers, and DBAs:

+ Materializing of relationships at creation time, resulting in no penalties for complex runtime queries
+ Constant time traversals for relationships in the graph both in depth and in breadth due to efficient representation of nodes and relationships
+ All relationships in Neo4j are equally important and fast, making it possible to materialize and use new relationships later on to “shortcut” and speed up the domain data when new needs arise
+ Compact storage and memory caching for graphs, resulting in efficient scale-up and billions of nodes in one database on moderate hardware
+ Written on top of the JVM


[About Neo4j](http://neo4j.com/developer/graph-database/#_what_is_neo4j)

---

#### Why Neo4j?

Considered to be the “World’s Best and First Graph Database”, Neo4j is used by thousands of organizations, including 50+ of the Global 2000, in mission-critical production applications.Neo4j is the only graph database on Gartner’s Operational Database Magic Quadrant providing enterprise-strength graph database that combines Native Graph Storage and Processing, Scalable architecture optimized for speed, and ACID compliance to ensure predictability of relationship-based queries.
Rock-Solid Reliability for Mission-Critical Production Applications — Neo4j is the only graph database recognized by key analysts (Forrester, Gartner and others) to have enough production applications to warrant inclusion in reports.Easy to use with Cypher, the world’s most powerful and productive graph query language adds more value and adaptability for Neo4j.

### Key Features

+ Cypher Query — Powerful and Expressive Query language 
    * SQL Like easy query language (Neo4j CQL)
    * Cypher often requires 10x to 100x less code than SQL

+ Neo4j implements the Property Graph Model efficiently down to the storage level

+ Neo4j provides full database characteristics including ACID transaction compliance, cluster support, and runtime failover, making it suitable to use graph data in production scenarios

+ Materializing of relationships at creation time, resulting in no penalties for complex runtime queries

+ Constant time traversals for relationships in the graph both in depth and in breadth due to efficient representation of nodes and relationships

+ All relationships in Neo4j are equally important and fast, making it possible to materialize and use new relationships later on to “shortcut” and speed up the domain data when new needs arise

+ Compact storage and memory caching for graphs, resulting in efficient scale-up and billions of nodes in one database on moderate hardware
Supports both Embedded and Server mode

> Neo4j provides sustainable competitive advantage when : 

+ Building new applications by leveraging value in data relationships

+ Reimagining existing applications by harnessing the ever-increasing relatedness of data

+ Accelerating innovation by decreasing the time to create complex applications
Lowering total cost of ownership compared to traditional database management systems

###### _Internal Applications : Master Data Management / Network and IT Operations / Fraud Detection_

###### _Customer-facing applications : Real-Time Recommendations / Graph-Based Search /Identity and Access Management_

#### Where does Neo4j fit in?

    Recommendations
    Business intelligence
    Social computing
    Geospatial
    Systems management
    Web of things
    Genealogy
    Time series data
    Product catalogue
    Web analytics
    Scientific computing (especially bioinformatics)
    Indexing slow RDBMS and much more!

[Refer - Enterprise Usecases - GraphDatabases](/blog/2015-12-19-Enterprise-Usecases-Graph-Databases.md)

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









