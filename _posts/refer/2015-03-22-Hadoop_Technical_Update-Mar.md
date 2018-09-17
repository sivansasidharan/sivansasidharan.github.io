---
layout: post
category: refer
title: "Hadoop Technical Updates / 23-03-2015"
excerpt: "Hadoop Technical updates for March 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://blog.confluent.io/2015/03/12/how-to-choose-the-number-of-topicspartitions-in-a-kafka-cluster/:
http://www.slideshare.net/DonaldMiner/hadoop-with-python:
https://www.youtube.com/watch?v=g99U7c4jSNs&feature=youtu.be:
http://www.qubole.com/blog/product/hadoop-enhanced-networking-aws/:
http://flink.apache.org/news/2015/03/13/peeking-into-Apache-Flinks-Engine-Room.html:
http://blog.cloudera.com/blog/2015/03/exactly-once-spark-streaming-from-apache-kafka/:
http://www.eecs.berkeley.edu/~keo/publications/nsdi15-final147.pdf:
http://hortonworks.com/blog/enterprise-grade-rolling-upgrades-in-hdp-2-2/:
http://blog.cloudera.com/blog/2015/03/how-to-build-re-usable-spark-programs-using-spark-shell-and-maven/:
http://getindata.com/blog/post/avoiding-the-mess-from-the-hadoop-cluster-part-1/:
http://hortonworks.com/blog/deploying-long-running-services-on-yarn-using-apache-slider/:
http://www.bigdatatidbits.cc/2015/03/converting-avro-data-to-parquet-format.html:
https://engineering.linkedin.com/kafka/running-kafka-scale:
https://databricks.com/blog/2015/03/20/using-mongodb-with-spark.html:
http://www.gruter.com/blog/?p=1428:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

The Confluent blog has a post that provides suggestions for choosing the number of partitions in a Kafka topic. While more partitions will help improve throughput, increasing the number will result in more open file handles, (potentially) longer unavailability in certain circumstances, higher end-to-end latency, and additional memory requirements in clients. The post describes each of these trade-offs in-depth.

- [http://blog.confluent.io/2015/03/12/how-to-choose-the-number-of-topicspartitions-in-a-kafka-cluster/](http://blog.confluent.io/2015/03/12/how-to-choose-the-number-of-topicspartitions-in-a-kafka-cluster/)


This presentation provides an up-to-date overview of the state of Hadoop with Python. It looks at several open-source frameworks, including mrjob and Pydoop for MapReduce jobs, snakebite for interacting with HDFS, and the python APIs included with Spark and Pig.

- [http://www.slideshare.net/DonaldMiner/hadoop-with-python](http://www.slideshare.net/DonaldMiner/hadoop-with-python)
- [https://www.youtube.com/watch?v=g99U7c4jSNs&feature=youtu.be](https://www.youtube.com/watch?v=g99U7c4jSNs&feature=youtu.be)


The Qubole blog has a post looking at the effects of different types and features of virtualization on the Amazon Web Services cloud. The post is worth reading in its entirety, but key takeaways are that switching from PV to HVM instances and enabling enhanced networking is a major win. They didn't see huge enhancements with placement groups. As always, its worth validating these results with your own application.

- [http://www.qubole.com/blog/product/hadoop-enhanced-networking-aws/](http://www.qubole.com/blog/product/hadoop-enhanced-networking-aws/)


This is a good read about how one distributed data processing framework solves a lot of distributed system problems. Focussing on equi-joins, the post describes the high-level Flink API, join strategies, memory management, join optimization, and performance.

- [http://flink.apache.org/news/2015/03/13/peeking-into-Apache-Flinks-Engine-Room.html](http://flink.apache.org/news/2015/03/13/peeking-into-Apache-Flinks-Engine-Room.html)


This post on the Cloudera blog describes the Spark-Kafka integration in the recent 1.3 release of Spark. Topics include creating RDDs for batch jobs, RRDs for streaming, and an overview of strategies for building at least once/at most once/exactly once delivery of results. The exactly-once section describes two strategies—idempotent writes based on unique keys and transactional writes.

- [http://blog.cloudera.com/blog/2015/03/exactly-once-spark-streaming-from-apache-kafka/](http://blog.cloudera.com/blog/2015/03/exactly-once-spark-streaming-from-apache-kafka/)


A new paper on Spark analyzed performance on the BDBench and TPC-DS benchmarks and found some surprising results. Specifically, they found that CPU is often the limiting factor and not disk or network I/O. It's a big paper with a lot of interesting findings and suggestions for improvement.

- [http://www.eecs.berkeley.edu/~keo/publications/nsdi15-final147.pdf](http://www.eecs.berkeley.edu/~keo/publications/nsdi15-final147.pdf)


The Hortonworks blog has a post on several new features that have been added to the Hadoop ecosystem in order to support rolling upgrades. It discusses some operational items like software packaging and configuration as well as the changes in core HDFS, YARN, Hive, and more. There are also instructions for the order in which to upgrade services as part of a full upgrade.

- [http://hortonworks.com/blog/enterprise-grade-rolling-upgrades-in-hdp-2-2/](http://hortonworks.com/blog/enterprise-grade-rolling-upgrades-in-hdp-2-2/)


This post looks at how to package jars into an uber-jar, package a third-party library that isn't available via maven central, and use a jar with the Spark shell.

- [http://blog.cloudera.com/blog/2015/03/how-to-build-re-usable-spark-programs-using-spark-shell-and-maven/](http://blog.cloudera.com/blog/2015/03/how-to-build-re-usable-spark-programs-using-spark-shell-and-maven/)


This post starts out with a story that's all too familiar for many people working with Hadoop—you have a seemingly simple query, but you spend a lot of time finding the right data to query. One solution to this problem is to keep every dataset in Hive and to use comments to describe the dataset. Then, Apache Falcon provides a nice interface to view and search datasets in Hive (in addition to several other features, which the article describes).

- [http://getindata.com/blog/post/avoiding-the-mess-from-the-hadoop-cluster-part-1/](http://getindata.com/blog/post/avoiding-the-mess-from-the-hadoop-cluster-part-1/)


Hortonworks has a recap of talks at the recent Apache Slider meetup. There was a talk on running dockerized applications on YARN and another on KOYA (Kafka on YARN). The post also has links to the presenter slides.

- [http://hortonworks.com/blog/deploying-long-running-services-on-yarn-using-apache-slider/](http://hortonworks.com/blog/deploying-long-running-services-on-yarn-using-apache-slider/)


This post describes how to convert data from Avro to Parquet. The instructions utilize a simple tool which runs a map-only job to do the conversion.

- [http://www.bigdatatidbits.cc/2015/03/converting-avro-data-to-parquet-format.html](http://www.bigdatatidbits.cc/2015/03/converting-avro-data-to-parquet-format.html)


While MongoDB has a built-in MapReduce framework, there are often advantages to processing data outside of Mongo. To that end, this post gives an introduction on how to integration MongoDB with Spark using the Hadoop input format for Mongo.

- [https://databricks.com/blog/2015/03/20/using-mongodb-with-spark.html](https://databricks.com/blog/2015/03/20/using-mongodb-with-spark.html)


The LinkedIn Site Reliability team has pulled back the curtain to reveal a lot about how LinkedIn uses Apache Kafka. Topics covered include scale (175 terabytes/day), the types of applications (queueing, logging, metrics, and more), their multi-datacenter setup, and integration into the application stack.

- [https://engineering.linkedin.com/kafka/running-kafka-scale](https://engineering.linkedin.com/kafka/running-kafka-scale)


Apache Tajo version 0.10 was released last week, and this tutorial provides all the instructions needed to get started with Tajo on an Amazon Elastic MapReduce cluster. After specifying a Tajo bootstrap action for the cluster, data is stored in HDFS. If you want to integrate directly with S3, the post describes the additional configuration required to do so.

- [http://www.gruter.com/blog/?p=1428](http://www.gruter.com/blog/?p=1428)


MapR has posted a new whiteboard walkthrough, which compares and contrasts Hadoop with NoSQL systems. In addition to a short video, the transcript of the presentation is available on the MapR blog. It covers the the strengths of Hadoop vs. NoSQL and when each one is appropriate.

- [https://www.mapr.com/blog/hadoop-vs-nosql-whiteboard-walkthrough](https://www.mapr.com/blog/hadoop-vs-nosql-whiteboard-walkthrough)

**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**