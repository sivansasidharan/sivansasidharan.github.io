---
layout: post
category: refer
title: "Hadoop Technical Updates / 28-05-2015"
excerpt: "Hadoop Technical updates for May 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://ingest.tips/2015/05/20/a-roundtrip-from-mysql-to-hive/:
https://www.altiscale.com/hadoop-blog/spark-on-hadoop/:
http://hortonworks.com/blog/standards-based-packaging-to-support-rolling-upgrades-in-hdp/:
http://blog.confluent.io/2015/05/19/how-i-learned-to-stop-worrying-and-love-the-schema-part-1/:
https://www.dynamicyield.com/2015/05/apache-hbase-for-the-win-2/:
http://www.slideshare.net/stephanewen1/apache-flink-strata-hadoop-world-london:
http://steveloughran.blogspot.co.uk/2015/05/distributed-system-testing-where-now.html:
http://blog.parsely.com/post/1928/cass/:
https://speakerdeck.com/xorlev/using-kafka-and-crunch-for-realtime-processing:
http://hortonworks.com/blog/evaluating-hive-with-tez-as-a-fast-query-engine/:
http://blog.cloudera.com/blog/2015/05/how-to-read-fix-messages-using-apache-hive-and-impala/:
http://hortonworks.com/blog/apache-hadoop-yarn-in-hdp-2-2-isolation-of-cpu-resources-in-your-hadoop-yarn-clusters/:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

The Parse.ly blog has a post describing several hard-fought lessons-learned when deploying Cassandra for timeseries data at scale. These include understanding CQL, COMPACT STORAGE, Cassandra Counters, row sizes, and more. The end of the post has some pointers to documentation of Cassandra best practices, which is aimed at anyone just getting started.

- [http://blog.parsely.com/post/1928/cass/](http://blog.parsely.com/post/1928/cass/)


Testing a distributed system is difficult, and it's a problem that hasn't gotten a lot of attention. This post looks at some of the work that's been done, defines what it means for a distributed system to "work," describes tools for testing distributed systems, and details the types of tests that are part of the Apache Slider framework (among which is the Slider Integral Chaos Monkey).

- [http://steveloughran.blogspot.co.uk/2015/05/distributed-system-testing-where-now.html](http://steveloughran.blogspot.co.uk/2015/05/distributed-system-testing-where-now.html)


This presentation from Strata & Hadoop World in London describes the architecture of Apache Flink. Topics covered include the Flink engine, data streaming analysis, Flink streaming (APIs, windowing, checkpointing), Flink for batch processing, memory management, and Flink's ML and Graph libraries.

- [http://www.slideshare.net/stephanewen1/apache-flink-strata-hadoop-world-london](http://www.slideshare.net/stephanewen1/apache-flink-strata-hadoop-world-london)


The Dynamic Yield engineering blog has a post on Apache HBase, which enumerates four best practices. These are: ensuring good key-distribution, generating HBase-friendly ids, working with HBase snapshots, and when to use (or not use) HBase for real-time analytics.

- [https://www.dynamicyield.com/2015/05/apache-hbase-for-the-win-2/](https://www.dynamicyield.com/2015/05/apache-hbase-for-the-win-2/)


This post, the first in a series, looks at the advantages of using schemas for data (vs CSV, JSON, XML, etc). It also describes why a serialization format, such as JSON, isn't enough by itself.

- [http://blog.confluent.io/2015/05/19/how-i-learned-to-stop-worrying-and-love-the-schema-part-1/](http://blog.confluent.io/2015/05/19/how-i-learned-to-stop-worrying-and-love-the-schema-part-1/)


With traditional linux packaging, only a single version of a package is installed at a time. But when doing rolling upgrades, it's best to have multiple version installed in order to minimize downtime. The Hortonworks blog describes how HDP 2.2 installs multiple versions simultaneously by using RPMs and Debs which include the version number. HDP also includes a tool to update symlinks to activate a specific version.

- [http://hortonworks.com/blog/standards-based-packaging-to-support-rolling-upgrades-in-hdp/](http://hortonworks.com/blog/standards-based-packaging-to-support-rolling-upgrades-in-hdp/)


The Altiscale blog has kicked off a blog series containing tips for running Spark on Hadoop with an overview of the three common ways to invoke Spark. These are local mode (single JVM), YARN cluster (spark-submit), and YARN client (distributed spark-shell). The post describes when each mode is most appropriate.

- [https://www.altiscale.com/hadoop-blog/spark-on-hadoop/](https://www.altiscale.com/hadoop-blog/spark-on-hadoop/)


This post looks at using Sqoop to import and export data from MySQL to Hive. It includes examples and describes several caveats related to metadata (e.g. an export can only work on files in HDFS not on a Hive table as described in the Hive metastore).

- [http://ingest.tips/2015/05/20/a-roundtrip-from-mysql-to-hive/](http://ingest.tips/2015/05/20/a-roundtrip-from-mysql-to-hive/)


The Hortonworks blog has a guest post about benchmarking Hive 0.11, 0.13, 0.14 against two vendors. There are a number of interesting things about this post: seeing the speedup on a real-world use-case from Hive 0.11 to 0.13 to 0.14, Hive hold its weight against multiple vendors, and how the author collects metrics to evaluate query performance and bottlenecks.

- [http://hortonworks.com/blog/evaluating-hive-with-tez-as-a-fast-query-engine/](http://hortonworks.com/blog/evaluating-hive-with-tez-as-a-fast-query-engine/)


The Financial Information eXchange (FIX) is a delimited, key-value pair format. This post describes how to query data in the format using Hive and Impala. There are several tricks and advanced Hive features demonstrated in the post, such as defining a table with various "TERMINATED BY" declarations and building a view.

- [http://blog.cloudera.com/blog/2015/05/how-to-read-fix-messages-using-apache-hive-and-impala/](http://blog.cloudera.com/blog/2015/05/how-to-read-fix-messages-using-apache-hive-and-impala/)


The Hortonworks blog has a post describing how YARN uses Linux cgroups to ensure CPU isolation when vcore resource allocation is enabled. The post describes how (at a high-level) cgroups work, the basic configuration, advanced configuration (e.g. hard vs. soft limits), and provides some examples of the cgroup hierarchy.

- [http://hortonworks.com/blog/apache-hadoop-yarn-in-hdp-2-2-isolation-of-cpu-resources-in-your-hadoop-yarn-clusters/](http://hortonworks.com/blog/apache-hadoop-yarn-in-hdp-2-2-isolation-of-cpu-resources-in-your-hadoop-yarn-clusters/)


This presentation from the recent Gluecon describes the data platform at FullContact. The platform has moved from a batch-only system to also have a real-time component powered by Apache Kafka and Apache Crunch. Given that they already had implementations of their algorithms in Crunch, they are using Crunch's in-memory runner to process data in micro-batch directly from Kafka.

- [https://speakerdeck.com/xorlev/using-kafka-and-crunch-for-realtime-processing](https://speakerdeck.com/xorlev/using-kafka-and-crunch-for-realtime-processing)

**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**