---
layout: post
category: refer
title: "Hadoop Technical Updates - May 2016"
excerpt: "Hadoop Technical updates for May 2016"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
comments: true
---
### Technical Updates - May2016

***
The DataTorrent blog has a post about fault tolerance for Apache Apex when consuming data from or writing data to files. Apex operates on unbounded streams, so there are some subtle but important details to consider. When using HDFS for output, there are additional complications due to the HDFS lease mechanisms. [Fault-Tolerance](https://www.datatorrent.com/blog/fault-tolerant-file-processing/)

***

The Databricks blog has an overview of the upcoming performance improvements in Spark 2.0 as part of the new Tungsten code generation engine. The post offers illustrative examples that explain how specific code generation can be much faster than generic code, due to virtual function overhead, making better use of CPU registers, and loop unrolling. In addition to the Databricks post, The Morning Paper has an overview of the VLDB paper on which the implementation is based.
[Spark2.0] (https://databricks.com/blog/2016/05/23/apache-spark-as-a-compiler-joining-a-billion-rows-per-second-on-a-laptop.html)
[Query-Plan-Spark2.0](https://blog.acolyer.org/2016/05/23/efficiently-compiling-efficient-query-plans-for-modern-hardware/)

***

StreamScope, which is Microsoft's stream processing system, is another one of the papers covered by The Morning Paper this week. The post pulls out some of the highlights—the throughput/cluster sizes, a look at the programming model (SQL), the time model, the delivery semantics/guarantees, and its use in production at Microsoft.
[StreamScope](https://blog.acolyer.org/2016/05/24/streamscope-continuous-reliable-distributed-processing-of-big-data-streams/)

***

The Apache blog has a post from the team at HubSpot on tuning the G1GC for Apache HBase. The article walks through the progression of changes that HubSpot tried and how they impacted the stability, 99% performance, and overall time spent in stop-the-world garbage collections. The team used lots of tricks and does a good job explaining intricacies of the GC algorithms. At the end of the post, there's a step-by-step guide to tuning G1GC for HBase.
[Apache HBase](https://blogs.apache.org/hbase/entry/tuning_g1gc_for_your_hbase)

***

LinkedIn has a post about some difficult to debug issues with Kafka offset management. The article details the symptoms of two so-called "offset rewind" events, how to detect these types of events with monitoring, and the underlying causes (and their solutions) of both incidents.
[Kafka](https://engineering.linkedin.com/blog/2016/05/kafkaesque-days-at-linkedin--part-1)

***

The Databricks blog has the third and final part of a series on using Apache Spark for Genome Variant Analysis. The post describes the needed preparation (converting files to Parquet and reading data into Spark RRDs), how to load genotype data, and running k-means clustering on the resulting genotypes to predict geographic population based on the genotype features.
[Spark-Usecase](https://databricks.com/blog/2016/05/24/predicting-geographic-population-using-genome-variants-and-k-means.html)

***

Much of the batch big data ecosystem has progressed from custom APIs back to SQL, so it'll be interesting to see if the same happens to stream processing frameworks as well. In this post, the Apache Flink team has written about their plans for supporting streaming SQL. Flink already has a Table API, and they're using Apache Calcite to add SQL support. For things like windowing, they're planning to use Calcite's streaming SQL extensions.  The initial SQL work is targeted for the 1.1.0 release, with much richer support in 1.2.0.
[Apache Flink](http://flink.apache.org/news/2016/05/24/stream-sql.html)

***

This post gives an introduction to the XML plugin for Apache Drill. The support doesn't yet ship with Drill, but it's relatively easy to compile the jar and configure XML support.
[Apache Drill](https://www.mapr.com/blog/how-use-xml-plugin-apache-drill)

***

The Hortonworks blog has a brief introduction to the architecture of the Ambari metrics system, which recently added support for Grafana as a front-end for dashboards. The system uses Apache Phoenix and Apache HBase as the system of record, so it scales horizontally.
[Grafana - Amabri](http://hortonworks.com/blog/hood-ambari-metrics-grafana/)

***

This tutorial describes how to use Spark SQL on Amazon EMR with Hue and Apache Zeppelin to run SQL queries across tab-delimited data stored in S3. The post finishes off by showing how to save data from Spark to DynamoDB.
[Spark-SQL-for-ETL](http://blogs.aws.amazon.com/bigdata/post/Tx2D93GZRHU3TES/Using-Spark-SQL-for-ETL)

***

The Heroku team has written about their experience with the latest version of Apache Kafka—the introduction of the timestamp field (an additional 8-bytes) led to some counter intuitive performance changes.
[Apache Kafka -0.10-](https://engineering.heroku.com/blogs/2016-05-27-apache-kafka-010-evaluating-performance-in-distributed-systems/)

***


**Reference :**
[Hadoop Weekly Publication](http://hadoopweekly.com)
