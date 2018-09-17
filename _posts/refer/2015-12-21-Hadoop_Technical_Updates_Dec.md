---
layout: post
category: refer
title: "Hadoop Technical Updates / 21-12-2015"
excerpt: "Hadoop Technical updates for Dec 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
comments: true
---
### Technical Updates

TitanDB is a distributed graph database with pluggable storage backends. AWS has built a backend for the Amazon DynamoDB service.  This post describes how to use Titan and DynamoDB to perform shortest path queries and presents performance comparison across different storage models. It also shows some of the features that are unique to the setup, such as CloudWatch metrics for performance monitoring.

[TitanDB](http://blogs.aws.amazon.com/bigdata/post/Tx3JO46NGMX3WAW/Performance-Tuning-Your-Titan-Graph-Database-on-AWS)

---

Apache NiFi 0.4.0 (more about the release below) adds support for interfacing with Syslog and HBase. This tutorial shows how to configure NiFi with an HBaseClient, a ListenSyslog source, and a HBase writer to store syslog JSON data to HBase. This is a nice tutorial of a real-world use case for NiFi, including suggestions for improving performance in order to productionize the setup.

[Apache NiFi](https://blogs.apache.org/nifi/entry/storing_syslog_events_in_hbase)

---

The Cloudera blog has a post on some recent improvements to performance of Hadoop's DistCP utility. The post describes how DistCP (a distributed copy within or across HDFS clusters) works, how performance is improved with HDFS snapshots, and how a new method of computing the list of files to copy can improve setup time. If you've worked with DistCP on a non-trivial HDFS, performance improvements are likely much welcomed.

[Cloudera Blog](http://blog.cloudera.com/blog/2015/12/distcp-performance-improvements-in-apache-hadoop/)

---

The Confluent blog has a good introduction to Kafka Connect, the new framework for loading data into and out of Kafka. It shows how to use the JDBC driver to load row-level changes into Kafka without writing any custom code. From there, data is loaded into HDFS and made available via Hive. The post also discusses some of the advanced features, such as schema migration and partitioning.

[Confluent Blog](http://www.confluent.io/blog/how-to-build-a-scalable-etl-pipeline-with-kafka-connect)

---

The Altiscale blog has a nice introduction to Apache Yetus, which provides automation for testing patches, producing api documentation, and generating release notes for software project. Yetus was originally part of the Hadoop project and is used by several other ecosystem projects.

[Altiscale Blog](https://www.altiscale.com/blog/apache-yetus-faster-more-reliable-software-development/)

---

Apache Flink 0.10 added beta support for compatibility with Apache Storm. Using this support, a Storm topology can be run as-is on Flink (it must be converted to a Flink topology, though, which requires changes to a few lines of code). In addition, existing Storm Spouts and Bolts can be embedded inside of a Flink topology. This post describes the integration and gives examples of both features.

[Apache Flink](http://flink.apache.org/news/2015/12/11/storm-compatibility.html)

---

Cloudera CDH 5.5 has support for Apache HTrace (incubating), which can provide granular details about timings of HDFS operations. This post describes how to setup HTrace and htraced (from Cloudera Labs) to record this information and view it with the included web front-end.

[Cloudera CDH 5.5](http://blog.cloudera.com/blog/2015/12/new-in-cloudera-labs-apache-htrace-incubating/)

---

Region replicas are a relatively new feature of Apache HBase. By enabling them and specifying the correct flag at query time, HBase can delivery high availability of reads. This tutorial describes how to configure HBase for HA reads and gives a quick walkthrough of using the HBase CLI to create a table with replicas and query secondary regions.

[IBM Developer Blog](https://developer.ibm.com/hadoop/blog/2015/12/02/hbase-read-ha/)

---

**Reference :**
[Hadoop Weekly Publication](http://hadoopweekly.com)