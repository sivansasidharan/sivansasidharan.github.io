---
layout: post
category: refer
title: "Hadoop Technical Updates / 31-08-2015"
excerpt: "Hadoop Technical updates for August 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://www.slideshare.net/HenrySaputra/bay-area-apache-flink-meetup-community-update-august-2015:
http://www.slideshare.net/foosounds/baymeetupflinkresearch:
http://www.slideshare.net/vkalavri/gelly-in-apache-flink-bay-area-meetup:
http://www.slideshare.net/GyulaFra/stateful-distributed-stream-processing:
http://phoenix.apache.org/presentations/TuningForOLTP.pdf:
http://www.confluent.io/blog/distributed-consensus-reloaded-apache-zookeeper-and-replication-in-kafka:
http://blogs.aws.amazon.com/bigdata/post/Tx3FWOWOHSITOFC/Integrating-Amazon-Kinesis-Amazon-S3-and-Amazon-Redshift-with-Cascading-on-Amazo:
http://getindata.com/blog/post/avoiding-the-mess-in-the-hadoop-cluster-part-2/:
http://flink.apache.org/news/2015/08/24/introducing-flink-gelly.html:
http://www.qubole.com/blog/product/multi-tenant-job-history-server-for-ephemeral-hadoop-and-spark-clusters/:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

Two projects that exemplify the push in the Hadoop ecosystem to continuously improve the status quo are the covered in this week's issue. First, Apache Flink, a project with similar features to Apache Spark that has been gaining momentum (particularly for use-cases where Spark falls short), is covered in several links. Second, there's a great presentation on Apache Phoenix, which aims to improve the usability HBase through SQL access. In other news, Apache Ignite and Lens graduated from the incubator, and Hortonworks announced the acquisition of Onyara.
 
 
One of the advantages of the cloud—short-lived, on-demand clusters—violates assumptions in Hadoop's design, which creates complications. For example, the MapReduce and Spark job history servers disappear when an ephemeral cluster terminates. Qubole describes how they've designed a solution to serve job histories via S3 even when the associated cluster has been terminated.
 
- [http://www.qubole.com/blog/product/multi-tenant-job-history-server-for-ephemeral-hadoop-and-spark-clusters/](http://www.qubole.com/blog/product/multi-tenant-job-history-server-for-ephemeral-hadoop-and-spark-clusters/)
 
 
Gelly is Apache Flink's graph-processing library. It supports iterative graph processing using the vertex-centric and grather-sum-apply computation models. It includes built-in support for PageRank, single source shortest path, connected components, and several other algorithms. The introductory post describes all of these and also shows how to build music profiles via a user-user similarity graph.
 
- [http://flink.apache.org/news/2015/08/24/introducing-flink-gelly.html](http://flink.apache.org/news/2015/08/24/introducing-flink-gelly.html)
 
 
This follow-up post to an earlier introduction to Apache Falcon discusses several features and uses of Falcon. These include backup and disaster recovery and late data handling (Falcon can compute preliminary and updated results as late data arrives). The post also discusses some areas where Falcon could use improvement and how it works well in conjunction with HCatalog.
 
- [http://getindata.com/blog/post/avoiding-the-mess-in-the-hadoop-cluster-part-2/](http://getindata.com/blog/post/avoiding-the-mess-in-the-hadoop-cluster-part-2/)
 
 
Amazon Kinesis is a hosted service for streaming data with similarities to Apache Kafka. This post describes using the Cascading framework to perform a streaming analysis of microbatched data sourced from Kinesis. The tutorial describes how to deploy the necessary resources to ingest data, process it with Cascading on EMR, and store the results in Amazon Redshift for analysis.
 
- [http://blogs.aws.amazon.com/bigdata/post/Tx3FWOWOHSITOFC/Integrating-Amazon-Kinesis-Amazon-S3-and-Amazon-Redshift-with-Cascading-on-Amazo](http://blogs.aws.amazon.com/bigdata/post/Tx3FWOWOHSITOFC/Integrating-Amazon-Kinesis-Amazon-S3-and-Amazon-Redshift-with-Cascading-on-Amazo)
 
 
The Confluent blog has an excellent post about distributed consensus with Apache Zookeeper and Kafka. It introduces consensus and atomic broadcast, describes consensus in Zookeeper, describes Kafka's in-sync replica sets, and gives an overview of a couple of failure scenarios in Kafka replication.
 
- [http://www.confluent.io/blog/distributed-consensus-reloaded-apache-zookeeper-and-replication-in-kafka](http://www.confluent.io/blog/distributed-consensus-reloaded-apache-zookeeper-and-replication-in-kafka)
 
 
These slides are a fantastic overview of tuning HBase, with a focus on the Phoenix SQL-layer, for low-latency applications. The topics covered include optimizing Phoenix queries (and what to look for in EXPLAIN output), HBase regionserver config settings, JVM GC configuration options, schema considerations, HBase timeline consistent reads, OS-level tuning, and future work for Phoenix.
 
- [http://phoenix.apache.org/presentations/TuningForOLTP.pdf](http://phoenix.apache.org/presentations/TuningForOLTP.pdf)
 
 
Slides from the recent Bay Area Apache Flink meetup have been posted. Topics covered include the state of the community (e.g. recently added and upcoming features), ongoing research topics being integrated into/with Flink (including streaming machine learning pipelines and streaming graphs), the Gelly Graph library, and an overview of stateful stream processing (with details about how Flink achieves exactly-once semantics).


- [http://www.slideshare.net/HenrySaputra/bay-area-apache-flink-meetup-community-update-august-2015](http://www.slideshare.net/HenrySaputra/bay-area-apache-flink-meetup-community-update-august-2015)
- [http://www.slideshare.net/foosounds/baymeetupflinkresearch](http://www.slideshare.net/foosounds/baymeetupflinkresearch)
- [http://www.slideshare.net/vkalavri/gelly-in-apache-flink-bay-area-meetup](http://www.slideshare.net/vkalavri/gelly-in-apache-flink-bay-area-meetup)
- [http://www.slideshare.net/GyulaFra/stateful-distributed-stream-processing](http://www.slideshare.net/GyulaFra/stateful-distributed-stream-processing)


**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**