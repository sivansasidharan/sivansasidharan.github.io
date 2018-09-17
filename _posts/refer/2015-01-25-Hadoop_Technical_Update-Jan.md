---
layout: post
category: refer
title: "Hadoop Technical Updates / 25-01-2015"
excerpt: "Hadoop Technical updates for Jan 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
https://www.paypal-engineering.com/2015/01/12/deep-learning-on-hadoop-2-0-2/:
http://www.slideshare.net/KostasTzoumas/apache-flink-api-runtime-and-project-roadmap:
http://www.andyamick.com/blog/easier-get-started-with-scalding:
http://ingest.tips/2015/01/21/handling-large-messages-kafka/:
http://databricks.com/blog/2015/01/21/random-forests-and-boosting-in-mllib.html:
http://hortonworks.com/blog/apache-hbase-high-availability-next-level/:
https://www.mapr.com/blog/hbase-key-design-opentsdb:
http://gethue.com/automatic-high-availability-with-hue-and-cloudera-manager/:
http://blog.sematext.com/2015/01/21/spark-performance-monitoring-use-case/:
https://www.backblaze.com/blog/best-hard-drive/:
http://www.slideshare.net/esammer/from-source-to-solution-building-a-system-for-eventoriented-data:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

PayPal has a post on how they’re training Restricted Boltzmann Machines to build Deep Belief Networks. While many folks are using GPUs to speed up these types of computations, PayPal was looking for a way to make use of existing Hadoop infrastructure. They’ve implemented an adaptation of IterativeReduce running on YARN (Hadoop 2.4.1). The post has a thorough overview of how they use the YARN APIs to build their system, and they show good results from an evaluation of the implementation.

- [https://www.paypal-engineering.com/2015/01/12/deep-learning-on-hadoop-2-0-2/](https://www.paypal-engineering.com/2015/01/12/deep-learning-on-hadoop-2-0-2/)


Apache Flink is a large-scale, in-memory processing and data streaming framework that’s compatible with Hadoop. This presentation gives an overview of the API ( which resembles Spark and Scalding and includes streaming and graph APIs), compatibility with the Hadoop ecosystem (Mappers and Reducers can be used unmodified), the included visualization tool, the runtime (and how it compares to Spark), and the project roadmap (improvements to fault tolerance and streaming fault tolerance, backend for Hive, and more more).

- [http://www.slideshare.net/KostasTzoumas/apache-flink-api-runtime-and-project-roadmap](http://www.slideshare.net/KostasTzoumas/apache-flink-api-runtime-and-project-roadmap)


Making the leap from running a Hadoop job in-memory to on a cluster (especially a pseudo distributed one) can be frustrating as you battle configuration, setup, etc. This post suggests using the Kiji Bento Box, which will build a local Hadoop cluster with Hadoop and setup all the proper environment variables to interact with that cluster.

- [http://www.andyamick.com/blog/easier-get-started-with-scalding](http://www.andyamick.com/blog/easier-get-started-with-scalding)


The ingest tips blog has some guidance for using Kafka to ship large messages. The post has several suggestions for avoiding large messages, as well as advice for how to configure Kafka to handle large messages if the other suggestions aren’t feasible.

- [http://ingest.tips/2015/01/21/handling-large-messages-kafka/](http://ingest.tips/2015/01/21/handling-large-messages-kafka/)


The Databricks blog has a post about the implementation of Random Forests and Gradient-Boosted Trees in Spark 1.2’s MLlib. The post gives a high-level overview of how decision trees work and how MLlib distributes the computation. It then provides some code snippets to provide an introduction to the API and shows several scalability results based on evaluating a dataset in AWS EC2.

- [http://databricks.com/blog/2015/01/21/random-forests-and-boosting-in-mllib.html](http://databricks.com/blog/2015/01/21/random-forests-and-boosting-in-mllib.html)


MapR has a new Whiteboard Walkthrough (both a video and a transcript) about HBase key design. OpenTSDB’s schema is used as an example, and the presentation discusses things like sequential vs. random keys and the importance of knowing the data access patterns.

- [https://www.mapr.com/blog/hbase-key-design-opentsdb](https://www.mapr.com/blog/hbase-key-design-opentsdb)


The Hue blog has a post on making Hue highly-available by running multiple instances of the Hue application behind a load-balancer. The tutorial walks through the requirements (a HA database backend and nginx/haproxy installed), and describes how to enable the load-balancer (which runs via supervisord).

- [http://gethue.com/automatic-high-availability-with-hue-and-cloudera-manager/](http://gethue.com/automatic-high-availability-with-hue-and-cloudera-manager/)


Sematext offers a monitoring solution for Spark as part of their Performance Monitoring (SPM) product. This post by a customer describes how to integrate the monitoring with Spark and gives an example of a production issue they solved with the help of SPM. Given that Spark is still relatively young, it’s good to see more solutions for monitoring and debugging helping folks become more productive.

- [http://blog.sematext.com/2015/01/21/spark-performance-monitoring-use-case/](http://blog.sematext.com/2015/01/21/spark-performance-monitoring-use-case/)


Hadoop’s cost advantage is based on using commodity hardware, including commodity hard drives. Not all hard drives are the same, though, and failure can be expensive and time consuming. Cloud-backup provider Backblaze has posted a new analysis of hard drive failure rates based on their experience with many different kinds of disks. They look at drives from HGST, Seagate, Toshiba, and Western Digital.

- [https://www.backblaze.com/blog/best-hard-drive/](https://www.backblaze.com/blog/best-hard-drive/)


The Hortonworks blog has a post about the past, present, and future of HBase High Availability. The majority of the post looks at the recently added Timeline-Consistent Region Replicas, which provide a read-only version of the data in case of a region failure. Combined with best practices, this feature allows for 99.99% availability, although clients must decide if they need strict consistency (i.e. can only query the primary region) or if they can accept stale data. Looking ahead, the HBase team is working on write-availability during failures and cross-datacenter consistency.

- [http://hortonworks.com/blog/apache-hbase-high-availability-next-level/](http://hortonworks.com/blog/apache-hbase-high-availability-next-level/)


A lot of presentations and posts on event-processing are either very high-level and theoretical or about the low-level details of a particular technology. This talk centers around a few technologies (kafka and avro), but it strikes a good balance of theory and practice. There are several important details and ideas related to building an event-based processing system.

- [http://www.slideshare.net/esammer/from-source-to-solution-building-a-system-for-eventoriented-data](http://www.slideshare.net/esammer/from-source-to-solution-building-a-system-for-eventoriented-data)

**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**