---
layout: post
category: refer
title: "Hadoop Technical Updates / 28-07-2015"
excerpt: "Hadoop Technical updates for July 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://eugenezhulenev.com/blog/2015/07/15/interactive-audience-analytics-with-spark-and-hyperloglog/:
https://www.mapr.com/blog/hive-transaction-feature-hive-10:
http://ingest.tips/2015/07/19/tips-for-improving-performance-of-kafka-producer/:
http://blog.cloudera.com/blog/2015/07/ibis-on-impala-python-at-scale-for-data-science/:
http://blog.cloudera.com/blog/2015/07/getting-started-with-ibis-and-how-to-contribute/:
http://blog.pivotal.io/big-data-pivotal/products/performance-benchmark-pivotal-hawq-beats-impala-apache-hive-part-1:
https://www.mapr.com/blog/5-minute-guide-understanding-significance-apache-spark:
https://www.smaato.com/big-data-nosql-meetup-hamburg-with-apache-flink-at-smaato/:
https://www.mapr.com/blog/best-practices-yarn-resource-management:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

This week's theme is new projects—Cloudera announced Ibis for Hadoop-scale data science with Python, Spree provides an alternative web UI for Spark, and Astro adds HBase support to Spark SQL. In addition, Hortonworks released HDP 2.3 and Cassandra 2.2 adds a number of interesting new features.

This post describes using HyperLogLog (HLL) for estimating things like click-through rates for ads. To run at scale, the post describes how to use HLL from Spark, including how to build a custom Spark aggregation function.  Finally, it describes a system that uses a pre-built/cached SparkContext to power a REST API server to run Spark queries with 1-2s response times across 100GB of data.
 
- [http://eugenezhulenev.com/blog/2015/07/15/interactive-audience-analytics-with-spark-and-hyperloglog/](http://eugenezhulenev.com/blog/2015/07/15/interactive-audience-analytics-with-spark-and-hyperloglog/)
 
 
This post describes the tradeoff between throughput and latency in the Kafka Producer and how to tweak the various producer settings to achieve desired performance.
 
- [http://ingest.tips/2015/07/19/tips-for-improving-performance-of-kafka-producer/](http://ingest.tips/2015/07/19/tips-for-improving-performance-of-kafka-producer/)
 
 
The MapR blog has a great introduction to Hive's new support for transactions. The post describes some use cases, the supported semantics, how to enable transaction-support, and a brief overview of how it works (including how compactions clean up delta files).
 
- [https://www.mapr.com/blog/hive-transaction-feature-hive-10](https://www.mapr.com/blog/hive-transaction-feature-hive-10)
 
 
Cloudera has announced a new project called Ibis, which has the goal of marrying Python data analysis/science libraries with Cloudera Impala to build a fast, native distributed framework. The project will including LLVM integration for code generation from Python code. The Cloudera blog has two posts about it—the first announced and describes the project goals and the second includes getting started instructions and more on contributing.
 
- [http://blog.cloudera.com/blog/2015/07/ibis-on-impala-python-at-scale-for-data-science/](http://blog.cloudera.com/blog/2015/07/ibis-on-impala-python-at-scale-for-data-science/)
- [http://blog.cloudera.com/blog/2015/07/getting-started-with-ibis-and-how-to-contribute/](http://blog.cloudera.com/blog/2015/07/getting-started-with-ibis-and-how-to-contribute/)
 
 
With the caveat (as always) that benchmarks should be taken with a grain of salt, Pivotal has posted part 1 of a comparison of HAWQ (their SQL-on-Hadoop) to Hive and Impala. The tests were performed on a 15 node cluster with the 30TB TPC-DS dataset size. Among the highlights, HAWQ shows speed improvements over Hive and Impala, and it has full support for all of the TPC-DS queries (whereas Hive and Impala do not).
 
- [http://blog.pivotal.io/big-data-pivotal/products/performance-benchmark-pivotal-hawq-beats-impala-apache-hive-part-1](http://blog.pivotal.io/big-data-pivotal/products/performance-benchmark-pivotal-hawq-beats-impala-apache-hive-part-1)
 
 
This post from the MapR blog compares MapReduce and Spark. It looks at the difference between the execution models, the differences in expressiveness (the Spark API having many more high-level operations like join and group by), and the library support (Spark includes machine learning, graph programming, and SQL as part of the core release).
 
- [https://www.mapr.com/blog/5-minute-guide-understanding-significance-apache-spark](https://www.mapr.com/blog/5-minute-guide-understanding-significance-apache-spark)
 
 
This interview with some folks from dataArtisans about Apache Flink has some interesting details about the project. Topics include how it compares to Spark/Samza/Storm, Flink's approach to iterative processing, data streaming in Flink, and the Flink roadmap.
 
- [https://www.smaato.com/big-data-nosql-meetup-hamburg-with-apache-flink-at-smaato/](https://www.smaato.com/big-data-nosql-meetup-hamburg-with-apache-flink-at-smaato/)
 
 
This post describes several parameters, including how to debug them, for best utilizing resources on a YARN cluster. In additional to the basic memory settings, the post covers the virtual and physical memory checker, several common exceptions (and their solutions), and a few MapR-specific settings.
 
- [https://www.mapr.com/blog/best-practices-yarn-resource-management](https://www.mapr.com/blog/best-practices-yarn-resource-management)


**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**