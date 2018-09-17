---
layout: post
category: blog
title: "MEMSQL & LAMBDA Architecture"
excerpt: "Simplifying the Lambda Architecture"
tags: [bigdata, hadoop, apache, hortonworks, cloudera,MEMSQL]
MEMSQL: http://www.memsql.com/
comments: true
---

#### Lambda in a Nutshell

In the book, 'Big Data: Principles and best practices of scalable real-time data systems', Nathan Marz coined the term ‘Lambda Architecture’ to describe a generic, scalable and fault-tolerant data processing architecture based on his experience in working on distributed systems at Backtype and Twitter.

The gist of the Lambda Architecture is to model everything that goes on in a complex computing system as an ordered, immutable log of events. Processing the data (totaling up the number of website visitors) is completed as a series of transformations that output to new tables or streams.It is important to keep the input unchanged. By breaking data processing into independent pieces, each with a defined input and output, you get closer to the ideal of purely functional programming. Writing and testing each piece is made simpler and parallelization can be automated. Parts of the dataflow can be replayed (when code changes or machines fail) and toyed together with other flows.
Most companies have responded to the influx of data by adapting their data management strategy. Most enterprises need instant access to both historical and real-time data and when managing both these data concurrently, the Lambda Architecture is by far the most accepted today.

#### MEMSQL with Simplified Lambda Architecture

MemSQL delivers real-time analytics on a rapidly changing data set, making it an ideal match for the characteristics of the Lambda Architecture speed service.It offers a complete solution: __the ability to handle millions of transactions per second while performing complex multi-table join queries.__

__Scalability__

MemSQL uses a distributed shared nothing architecture that scales on commodity hardware and local storage, supporting petabytes of data. MemSQL is a memory-first, relational database that also offers a disk-based columnstore. In-memory optimization provides high-speed data ingestion while simultaneously delivering analytics on the changing data set. The disk-based columnstore provides historical data management and access to historical data trends to leverage in combination with the “hot” data to deliver real-time analytics.

__Multi-model, Multi-mode__

1) MemSQL supports the ingestion of unstructured, structured and semi-structured data. Flexibility to align a structure to data in support of analytics meets the business requirements of the operation. Real-time analytics requires a real-time data structure, which MemSQL supports through a fully relational model. Furthermore, MemSQL supports the ingestion of unstructured and semi-structured (JSON) data into key-value pairs.

2) Full ANSI SQL support makes MemSQL readily accessible to data analysts, business analysts and data scientists reducing application code requirements. Plugging data visualization and query tools into the analytics architecture delivers immediate value from data to the business. 

3) MemSQL also has extended SQL including JSON support. Traversing a JSON document is similar to SQL with extensions to traverse the key-value pairs

__Open Source Connectors__

MemSQL offers several connectors for smooth integration with additional data sources. Two important ones are :  

1) MemSQL Streamliner: an integrated Apache Spark solution. Streamliner provides easy deployment of Apache Spark — a critical component for building real-time data pipelines that delivers advanced data enrichment and transformation. 

2) MemSQL Loader : which can import data from HDFS, as well as import and synchronize data from Amazon S3.

#### Applications & Usecases

__http://blog.memsql.com/pinterest-apache-spark-use-case/__

__http://blog.memsql.com/coinalytics-blockchain-analytics/__

Applications of today are built with infinite data sets in mind. As these real-time applications become the norm, and batch processing becomes a relic of the past, digital enterprises will implement memory-optimized, distributed data systems to simplify Lambda Architectures for real-time data processing and exploration.

#### References

[Memsql-CaseStudies](http://www.memsql.com/case-studies/) 

[MemSQL-Blog](http://blog.memsql.com/)
