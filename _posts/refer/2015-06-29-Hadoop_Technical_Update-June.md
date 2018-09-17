---
layout: post
category: refer
title: "Hadoop Technical Updates / 24-06-2015"
excerpt: "Hadoop Technical updates for June 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://blog.revolutionanalytics.com/2015/06/using-hadoop-with-r-it-depends.html:
http://www.bluedata.com/blog/2015/06/docker-and-spark-and-hadoop-oh-my:
https://databricks.com/blog/2015/06/22/understanding-your-spark-application-through-visualization.html:
https://www.elastic.co/blog/logstash-kafka-intro:
https://www.altiscale.com/hadoop-blog/whats-next-for-yarn-and-docker/:
http://ingest.tips/2015/06/24/real-time-analytics-with-kafka-and-spark-streaming/:
http://blog.matthewrathbone.com/2015/06/25/real-world-hadoop---implementing-a-left-outer-join-in-java-with-cascading.html:
http://technology.finra.org/blogs/hbase-mapreduce.html:
http://blogs.teradata.com/data-points/love-presto/:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

On the technical side, there are articles covering R & Hadoop, Docker & Hadoop, Spark, HBase, Presto, and Cascading.

This post discusses four open-source solutions for using Hadoop with R, each of which has its own strengths and weaknesses. The options are R on a workstation or shared server to connect to Hadoop (which works with rhdfs, rhbase, RHive, and more), Revolution R Open (which works with similar tools but adds the Intel Math Kernel Libraries), and RMR2 for executing R inside of MapReduce programs.
 
- [http://blog.revolutionanalytics.com/2015/06/using-hadoop-with-r-it-depends.html](http://blog.revolutionanalytics.com/2015/06/using-hadoop-with-r-it-depends.html)
 
 
BlueData provides a software platform for deploying Hadoop using virtualization. A recent version of the platform adds support for deployment via Docker containers in addition to hypervisors. This post compares the trade-offs of the two options in terms of performance, reliability, and security.
 
- [http://www.bluedata.com/blog/2015/06/docker-and-spark-and-hadoop-oh-my](http://www.bluedata.com/blog/2015/06/docker-and-spark-and-hadoop-oh-my)
 
 
Spark 1.4 has greatly enhanced the builtin UI for visualizing job details. This post gives a tour of these new features, which include a timeline view of spark events (across jobs, within a job, and within a stage of a job) and the execution DAG (which shows RDD transformations and how they map to operations). There are a lot of useful features in here, such as the ability to visualize the breakdown of time spent in a stage across compute/shuffle/deserialization/serialization/etc.
 
- [https://databricks.com/blog/2015/06/22/understanding-your-spark-application-through-visualization.html](https://databricks.com/blog/2015/06/22/understanding-your-spark-application-through-visualization.html)
 
 
Logstash 1.5 added an integration with Apache Kafka, which is the subject of this post. The article shows how to use Logstash to read and write data from Kafka, describes some of the important configuration settings of the integration, and discusses the scaling characteristics of the integration.
 
- [https://www.elastic.co/blog/logstash-kafka-intro](https://www.elastic.co/blog/logstash-kafka-intro)
 
 
The Altiscale blog has an update on the efforts to integrate YARN and docker. Rather than continuing to develop the DockerContainerExecutor, the current plan is to extend the existing LinuxContainerExecutor to also support docker containers. Otherwise, the two were going to share a lot of very similar code (e.g. for creating cgroups within which to run tasks).
 
- [https://www.altiscale.com/hadoop-blog/whats-next-for-yarn-and-docker/](https://www.altiscale.com/hadoop-blog/whats-next-for-yarn-and-docker/)
 
 
This post introduces Pankh, which is a demonstrative application for building a real-time stream processing system with Kafka, Spark Streaming, and HBase. The post describes the main components of the canonical stream processing architecture and describes the component implementations used by Pankh.
 
- [http://ingest.tips/2015/06/24/real-time-analytics-with-kafka-and-spark-streaming/](http://ingest.tips/2015/06/24/real-time-analytics-with-kafka-and-spark-streaming/)
 
 
In the latest post in guide to MapReduce frameworks, this post describes how to implement a left-join with the Cascading Java APIs. The code verbosity fits somewhere between Pig/Hive (quite short) and raw MapReduce (quite long). The post describes the details of the implementation and the full code (including a unit test) is available on github.
 
- [http://blog.matthewrathbone.com/2015/06/25/real-world-hadoop---implementing-a-left-outer-join-in-java-with-cascading.html](http://blog.matthewrathbone.com/2015/06/25/real-world-hadoop---implementing-a-left-outer-join-in-java-with-cascading.html)
 
 
A common pattern in HBase schema design is to prefix keys with a salt in order to equally distribute load (avoid hot regions) when key prefixes are changing slowly. This post describes how to build a custom InputFormat to run MapReduce jobs over a logical key range for a salted table. The implementation overrides the getSplits() method, which is described in detail.
 
- [http://technology.finra.org/blogs/hbase-mapreduce.html](http://technology.finra.org/blogs/hbase-mapreduce.html)
 
 
The Teradata blog has a post describing why they've chosen to adopt Presto and their near-term plans for contributing. On the former, the post gives background on Hadapt (whose architecture didn't fit with low-latency queries), the IQ execution engine they were developing for low-latency, why IQ didn't quite fit with Tez, and several of the advantageous features of Presto.
 
- [http://blogs.teradata.com/data-points/love-presto/](http://blogs.teradata.com/data-points/love-presto/)


**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**