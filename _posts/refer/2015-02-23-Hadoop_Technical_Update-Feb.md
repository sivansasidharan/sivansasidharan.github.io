---
layout: post
category: refer
title: "Hadoop Technical Updates / 22-02-2015"
excerpt: "Hadoop Technical updates for Feb 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://radar.oreilly.com/2015/02/processing-frameworks-for-hadoop.html:
http://ingest.tips/2015/02/17/kite-0-18-0-adds-custom-inputformat-support/:
https://databricks.com/blog/2015/02/17/introducing-dataframes-in-spark-for-large-scale-data-science.html:
https://blog.twitter.com/2015/handling-five-billion-sessions-a-day-in-real-time:
http://engineering.pinterest.com/post/111380432054/real-time-analytics-at-pinterest:
http://blogs.msdn.com/b/bigdatasupport/archive/2015/02/17/sqoop-job-performance-tuning-in-hdinsight-hadoop.aspx:
http://www.mongodb.com/blog/post/using-mongodb-hadoop-spark-part-2-hive-example:
https://www.mapr.com/blog/how-use-mapreduce-api:
http://techblog.netflix.com/2015/02/rad-outlier-detection-on-big-data.html:
http://www.slideshare.net/gwenshap/data-architectures-for-robust-decision-making:
http://www.samritchie.io/cascalog-hadoop-counters/:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

The O'Reilly Radar blog has a post describing several compute frameworks for Hadoop—everything from SQL to machine learning to real-time. The post describes the key considerations for choosing a framework and gives some guidance as to when to use each.

- [http://radar.oreilly.com/2015/02/processing-frameworks-for-hadoop.html](http://radar.oreilly.com/2015/02/processing-frameworks-for-hadoop.html)


Apache Spark is adding a new DataFrames API, which is inspired by data frames in R and Pandas (Python). DataFrames are like a table in a RDBMS, but contain additional optimizations. In particular, materialization of DataFrames uses the Spark SQL optimizer and code generation framework. There are more details on the API, which is planned for Spark 1.3, in the introductory post.

- [https://databricks.com/blog/2015/02/17/introducing-dataframes-in-spark-for-large-scale-data-science.html](https://databricks.com/blog/2015/02/17/introducing-dataframes-in-spark-for-large-scale-data-science.html)


The ingest.tips blog has a walkthrough of a new feature in Kite 0.18.0, which allows importing of data using custom InputFormats.

- [http://ingest.tips/2015/02/17/kite-0-18-0-adds-custom-inputformat-support/](http://ingest.tips/2015/02/17/kite-0-18-0-adds-custom-inputformat-support/)


Answers is a near real-time mobile app analytics system built by Crashlytics/Twitter. The Twitter blog has a post describing the architecture of the system, which ingests billions of events per second. The system implements the Lamda architecture, using Kafka as the messaging layer, Storm for the speed layer, and EMR with Cascading for batch computation.

- [https://blog.twitter.com/2015/handling-five-billion-sessions-a-day-in-real-time](https://blog.twitter.com/2015/handling-five-billion-sessions-a-day-in-real-time)


In last week's newsletter, there was mention of separating Spark from Hadoop. This week, Pinterest has written about just that—they're using Spark streaming with MemSQL for real-time analytics. The prototype system uses Spark streaming to take data from a Kafka topic, join it with dimensional data, and send the data to MemSQL.

- [http://engineering.pinterest.com/post/111380432054/real-time-analytics-at-pinterest](http://engineering.pinterest.com/post/111380432054/real-time-analytics-at-pinterest)


The MSDN blog has a post about tuning performance of Sqoop jobs on Azure HDInsight. The suggestions are mostly distribution-independent (e.g. tuning number of map tasks, sizing the cluster and db properly), so it's a useful read if you're working with Sqoop.

- [http://blogs.msdn.com/b/bigdatasupport/archive/2015/02/17/sqoop-job-performance-tuning-in-hdinsight-hadoop.aspx](http://blogs.msdn.com/b/bigdatasupport/archive/2015/02/17/sqoop-job-performance-tuning-in-hdinsight-hadoop.aspx)


The MongoDB blog has a tutorial on integrating MongoDB and Hive. The post describe how to use the MongoStorageHandler for Hive to query a Mongo-backed table.

- [http://www.mongodb.com/blog/post/using-mongodb-hadoop-spark-part-2-hive-example](http://www.mongodb.com/blog/post/using-mongodb-hadoop-spark-part-2-hive-example)


This post how the components of the MapReduce API fit together and the role of each. Topics covered include InputFormats, RecordReaders, and OutputCommitters.

- [https://www.mapr.com/blog/how-use-mapreduce-api](https://www.mapr.com/blog/how-use-mapreduce-api)


Netflix recently announced the Surus project, which is an open-source library of analysis tools for Pig and Hive. This week, they added the second function to the library: Robust Anomaly Detection (RAD). The Netflix blog has an overview of the goals of the tool, the algorithm it implements, and how it can be used via Apache Pig.

- [http://techblog.netflix.com/2015/02/rad-outlier-detection-on-big-data.html](http://techblog.netflix.com/2015/02/rad-outlier-detection-on-big-data.html)


This presentation describes best practices for building a data architecture. It contains ideas like using Kafka as a data bus, directory layouts for datasets in HDFS, using Spark streaming, and schema management. Lots of tips for building a reliable and consistent system.

- [http://www.slideshare.net/gwenshap/data-architectures-for-robust-decision-making](http://www.slideshare.net/gwenshap/data-architectures-for-robust-decision-making)


Cascalog, the Clojure library for Cascading, has recently added support for customer Hadoop counters (on master). This post describes how to update counters as part of a Cascalog job and how to access the counters programmatically afterwards.

- [http://www.samritchie.io/cascalog-hadoop-counters/](http://www.samritchie.io/cascalog-hadoop-counters/)


**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**