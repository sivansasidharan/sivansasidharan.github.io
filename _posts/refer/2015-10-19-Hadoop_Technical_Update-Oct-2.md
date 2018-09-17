---
layout: post
category: refer
title: "Hadoop Technical Updates / 19-10-2015"
excerpt: "Hadoop Technical updates for Oct 19 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
https://www.datatorrent.com/blog-tracing-dags-from-specification-to-execution/:
http://blog.ibis-project.org/ibis-for-sql-programmers/:
http://www.confluent.io/blog/log-compaction-highlights-in-the-kafka-and-stream-processing-community-october-2015:
https://databricks.com/blog/2015/10/13/interactive-audience-analytics-with-spark-and-hyperloglog.html:
http://www.slideshare.net/NavinaRamesh/apache-samza-new-features-in-the-upcoming-samza-release-0100:
http://blog.cloudera.com/blog/2015/10/untangling-apache-hadoop-yarn-part-2/:
https://developer.ibm.com/hadoop/blog/2015/10/15/update-open-source-component-configurations-via-ambari-part-one/:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

The DataTorrent blog has a post about Apache Apex (incubating) that describes how Apex's architecture is built around DAGs. At a high-level, a data flow is specified as a DAG (the Logical Plan) using the Java API or JSON, and the Streaming Application Master converts this logical plan into a physical plan for execution on a cluster. The post gives an overview of how Apex performs the conversion and executes it on a distributed platform like YARN.

- [https://www.datatorrent.com/blog-tracing-dags-from-specification-to-execution/](https://www.datatorrent.com/blog-tracing-dags-from-specification-to-execution/)


Ibis, the Python data analysis framework for big data, contains an integration with SQL engines (in particular, Ibis aims to work well with Cloudera Impala). This post describes Ibis' SQL API, which provides an API for building and running SQL queries.

- [http://blog.ibis-project.org/ibis-for-sql-programmers/](http://blog.ibis-project.org/ibis-for-sql-programmers/)


The Confluent blog has an update on Apache Kafka, which includes news on a number of features in various stages of development. Of particular note, support for authorization and the new Kafka Streams library have both been committed to trunk.

- [http://www.confluent.io/blog/log-compaction-highlights-in-the-kafka-and-stream-processing-community-october-2015](http://www.confluent.io/blog/log-compaction-highlights-in-the-kafka-and-stream-processing-community-october-2015)


This post describes how Collective is using a long-running Spark cluster to power interactive dashboards. The system makes use of HyperLogLog for estimating cardinality of the audiences they measure, and the post describes the custom Spark aggregation function they've built for merging HyperLogLogs. After putting all of these things together, a 40 node cluster with 100GB of cached data can answer queries in under 2 seconds.

- [https://databricks.com/blog/2015/10/13/interactive-audience-analytics-with-spark-and-hyperloglog.html](https://databricks.com/blog/2015/10/13/interactive-audience-analytics-with-spark-and-hyperloglog.html)


The Bay Area Samza Meetup hosted a presentation about the next release of Apache Samza, version 0.10.0. In addition to support for new consumers and producers (Amazon Kinesis, HDFS, ElasticSearch), version 0.10.0 adds support for dynamic configuration and host affinity which can improve job startup/recovery time when tasks have a lot of local state. Samza 0.10.0 is expected to be released in November.

- [http://www.slideshare.net/NavinaRamesh/apache-samza-new-features-in-the-upcoming-samza-release-0100](http://www.slideshare.net/NavinaRamesh/apache-samza-new-features-in-the-upcoming-samza-release-0100)


Also at the Bay Area Samza Meetup, Netflix presented on how Samza fits into the Netflix data pipeline. Netflix processes over 1 Petabyte / day (550 billion events), using Samza instances running inside of docker on hosts in an EC2 auto-scaling group. The presentation describes their production experience (and some improvements/workarounds they're using) and the number and types of instances that they use for both Samza and Kafka.

- [http://www.slideshare.net/mmddtmp/netflix-keystone-samzaeetup10132015](http://www.slideshare.net/mmddtmp/netflix-keystone-samzaeetup10132015)


This tutorial shows how to update configuration settings in Apache Ambari using the Ambari web UI. The UI exposes knobs for common settings and supports configuration of additional settings by setting raw property values. Ambari also supports comparison/diff across configuration versions.

- [https://developer.ibm.com/hadoop/blog/2015/10/15/update-open-source-component-configurations-via-ambari-part-one/](https://developer.ibm.com/hadoop/blog/2015/10/15/update-open-source-component-configurations-via-ambari-part-one/)


This post on the Cloudera blog discusses how to calculate resources for YARN by taking into consideration common cluster scenarios and accounting for operating system overhead. It also shows how to verify configuration using the ResourceManager Web UI.

- [http://blog.cloudera.com/blog/2015/10/untangling-apache-hadoop-yarn-part-2/](http://blog.cloudera.com/blog/2015/10/untangling-apache-hadoop-yarn-part-2/)


**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**