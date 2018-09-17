---
layout: post
category: refer
title: "Hadoop Technical Updates / 09-11-2015"
excerpt: "Hadoop Technical updates for Nov 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
https://www.datatorrent.com/blog-writing-apache-apex-application-in-scala/:
http://www.confluent.io/blog/apache-kafka-purgatory-hierarchical-timing-wheels:
http://hortonworks.com/blog/spark-hdp-perfect-together/:
https://blogs.apache.org/phoenix/entry/new_optimization_for_time_series:
http://blog.cloudera.com/blog/2015/11/how-to-use-impala-with-kudu/:
https://www.altiscale.com/blog/tips-and-tricks-for-running-spark-on-hadoop-part-3-rdd-persistence/:
https://developer.ibm.com/hadoop/blog/2015/11/04/installing-tachyon-0-8-0-on-iop-4-1-4-2/:
https://haifengl.wordpress.com/2015/11/04/inner-join-with-mapreduce/:
https://www.mapr.com/blog/docker-global-hack-day-on-demand-yarn-clusters:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

The DataTorrent blog has a tutorial for writing an Apache Apex application in Scala. The tutorial shows how to setup a Maven project, write a LineReader, Parser, and Application, and run the application with `dtcli`.

- [https://www.datatorrent.com/blog-writing-apache-apex-application-in-scala/](https://www.datatorrent.com/blog-writing-apache-apex-application-in-scala/)


The Confluent blog has a post describing how Kafka implements "request purgatory"—tracking  requests that haven't yet succeeded or encountered an error. The original implementation uses Java's DelayQueue, which shares performance characteristics with a priority queue. The new design uses Hierarchical Timing Wheels, which offer faster, tunable performance characters. The post describes the implementation in detail and gives an overview of performance benchmarks comparing the old and the new.

- [http://www.confluent.io/blog/apache-kafka-purgatory-hierarchical-timing-wheels](http://www.confluent.io/blog/apache-kafka-purgatory-hierarchical-timing-wheels)


Hortonworks has a post describing the components and features of Spark that they've worked on in the past year, and where they're concentrating effort for the future. Past work includes ORC support, an Ambari stack definition for Spark, machine learning library improvements, and documentation updates. Future work includes maturing Apache Zeppelin, an entity disambiguation library, a new Spark + HBase integration, the ability to persist RDDs to HDFS's memory tier, and making Spark streaming more robust.

- [http://hortonworks.com/blog/spark-hdp-perfect-together/](http://hortonworks.com/blog/spark-hdp-perfect-together/)


The recently released Apache Phoenix 4.6 includes support for declaring `ROW_TIMESTAMP` as part of a table's primary key. BY doing so, the value is stored using HBase's native row timestamp, which provides performance gains. Particularly, when scanning regions with HFiles that haven't been compacted, the `ROW_TIMESTAMP` information can be used to skip entire files. This is particularly handy when reading recently-written data. The introductory blog post describes the optimization in more details and shows example query response times with this feature enabled and not.

- [https://blogs.apache.org/phoenix/entry/new_optimization_for_time_series](https://blogs.apache.org/phoenix/entry/new_optimization_for_time_series)


Kudu, the new storage engine from Cloudera, integrates with Impala for SQL access. This post describes how to setup Impala with Kudu (this currently requires a custom build of Impala), how to tell Impala about data stored in Kudu, how to perform various SQL operations (both read and write/update queries), and more.

- [http://blog.cloudera.com/blog/2015/11/how-to-use-impala-with-kudu/](http://blog.cloudera.com/blog/2015/11/how-to-use-impala-with-kudu/)


This post describes the types of RDD persistence available in Spark. The default is memory-only, which is performant but can lead to OutOfMemoryError's. The post has a brief overview of the performance characteristics and trade-offs of several other options.

[https://www.altiscale.com/blog/tips-and-tricks-for-running-spark-on-hadoop-part-3-rdd-persistence/](https://www.altiscale.com/blog/tips-and-tricks-for-running-spark-on-hadoop-part-3-rdd-persistence/)


This tutorial describes how to use Apache Ambari to install and configure the Tachyon FileSystem, which is a memory-centric distributed storage system. The post also has a brief example of using TachyonFS from Spark.

- [https://developer.ibm.com/hadoop/blog/2015/11/04/installing-tachyon-0-8-0-on-iop-4-1-4-2/](https://developer.ibm.com/hadoop/blog/2015/11/04/installing-tachyon-0-8-0-on-iop-4-1-4-2/)


Depending on data sizes and distributions, an inner join in MapReduce can be performed efficiently in a few different ways. This post describes, in a high-level, several of the strategies for implementing an inner-join with MapReduce. For each (e.g. reduce-side, map-side), the post describes some of the relevant Hadoop APIs.

- [https://haifengl.wordpress.com/2015/11/04/inner-join-with-mapreduce/](https://haifengl.wordpress.com/2015/11/04/inner-join-with-mapreduce/)


Myriad is a system for running YARN atop of a Mesos cluster. This post looks at how to use Docker's overlay network plugin to isolate YARN clusters (with the ResourceManager and NodeManager running inside of Docker). All clusters share a common distributed file system, which can be accessed via another network bridge. The post has many more details about and code (including Dockerfiles and scripts) for implementing the solution.

- [https://www.mapr.com/blog/docker-global-hack-day-on-demand-yarn-clusters](https://www.mapr.com/blog/docker-global-hack-day-on-demand-yarn-clusters)



**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**