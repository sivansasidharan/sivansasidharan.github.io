---
layout: post
category: blog
title: "Apache Kudu"
excerpt: "Enabling fast analytics on fast data"
tags: [bigdata, hadoop, apache, hortonworks, cloudera]
ApacheKudu: http://getkudu.io/
comments: true
---
#### Apache Kudu 
![KUDU](/downloads/kudu_logo.png)
A new addition to the open source Apache Hadoop ecosystem, Apache Kudu (incubating) completes Hadoop's storage layer which is specifically designed for use cases that require fast analytics on fast (rapidly changing) data.

Kudu is Open Source software, licensed under the Apache 2.0 license. Currently, a limited-functionality version of Kudu is available as a Beta.

> Why Kudu ?

--> Kudu provides a combination of fast inserts/updates and efficient columnar scans to enable multiple real-time analytic workloads across a single storage layer.

--> As a new complement to HDFS and Apache HBase, Kudu gives architects the flexibility to address a wider variety of use cases without exotic workarounds.

--> Kudu lowers query latency significantly for Apache Impala (incubating) and Apache Spark (initially, with other execution engines to come).

> Overview

1) A Simple Data Model 

A Kudu cluster stores tables that look just like tables you're used to from relational (SQL) databases. A table can be as simple as an binary key and value, or as complex as a few hundred different strongly-typed attributes.Just like SQL, every table has a PRIMARY KEY made up of one or more columns.Rows can be efficiently read, updated, or deleted by their primary key.
	
Kudu's simple data model makes it breeze to port legacy applications or build new ones: no need to worry about how to encode your data into binary blobs or make sense of a huge database full of hard-to-interpret JSON. Tables are self-describing, so you can use standard tools like SQL engines or Spark to analyze your data.The data model is fully typed, so you don't need to worry about binary encodings or exotic serialization. You can just store primitive types, like when you use JDBC or ODBC.

2) Low-latency random access

Kudu isn't just a file format (unlike other storage), it's a live storage system which supports low-latency millisecond-scale access to individual rows.Kudu's APIs (Java or C++ APIs) can be used in conjunction with batch access for machine learning or analytics.Kudu isn't designed to be an OLTP system, but if you have some subset of data which fits in memory, it offers competitive random access performance.

 3) Integration with the Hadoop Ecosystem
 
 Kudu is a good citizen on a Hadoop ecosystem : integrating it with other data processing frameworks is simple.You can stream data in from live real-time data sources using the Java client, and then process it immediately upon arrival using Spark, Impala, or MapReduce. 
 
 You can even transparently join Kudu tables with data stored in other Hadoop storage such as HDFS or HBase.Kudu includes advanced in-process tracing capabilities, extensive metrics support, and even watchdog threads that helps in tracing & debugging production issues must faster.

> Architecture

__Super-fast Columnar Storage__ - Kudu internally organizes its data by column rather than row. Columnar storage allows efficient encoding and compression. For example, a string field with only a few unique values can use only a few bits per row of storage. With techniques such as run-length encoding, differential encoding, and vectorized bit-packing, Kudu is as fast at reading the data as it is space-efficient at storing it.

Columnar storage also dramatically reduces the amount of data IO required to service analytic queries. Using techniques such as lazy data materialization and predicate pushdown, Kudu can perform drill-down and needle-in-a-haystack queries over billions of rows and terabytes of data in seconds.

__Distribution and Fault Tolerance__ - In order to scale out to large datasets and large clusters, Kudu splits tables into smaller units called tablets. This splitting can be configured on a per-table basis to be based on hashing, range partitioning, or a combination thereof. This allows the operator to easily trade off between parallelism for analytic workloads and high concurrency for more online ones.

In order to keep your data safe and available at all times, Kudu uses the Raft consensus algorithm to replicate all operations for a given tablet. Raft(raft.github.io) ensures that every write is persisted by at least two nodes before responding to the client request, ensuring that no data is ever lost due to a machine failure. 

When machines do fail, replicas reconfigure themselves within a few seconds to maintain extremely high system availability.The use of majority consensus provides very low tail latencies even when some nodes may be stressed by concurrent workloads such as MapReduce jobs or heavy Impala queries.

__Designed For Next Generation Hardware__ - Kudu is implemented in C++, so it can scale easily to large amounts of memory per node. And because key storage data structures are designed to be highly concurrent, it can scale easily to tens of cores. Kudu's storage is designed to take advantage of the IO characteristics of solid state drives, and it includes an experimental cache implementation with an in-memory columnar execution path.

##### References 
[Apache Kudu](http://getkudu.io/)
[Cloudera](https://blog.cloudera.com/blog/2015/09/kudu-new-apache-hadoop-storage-for-fast-analytics-on-fast-data/)
