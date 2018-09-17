---
layout: post
category: refer
title: "Hadoop Technical Updates / 23-04-2015"
excerpt: "Hadoop Technical updates for April 2015"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://techblog.appnexus.com/blog/2015/03/31/parquet-columnar-storage-for-hadoop-data/:
http://www.snee.com/bobdc.blog/2015/04/running-spark-graphx-algorithm.html:
http://alex.vanboxel.be/2015/04/13/luigi-and-google-cloud-in-production-retrospective/:
https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html:
http://hortonworks.com/blog/ambari-2-0-for-deploying-comprehensive-hadoop-security/:
http://www.slideshare.net/alanfgates/hive-hbase-phoenixtp-hadoopsummiteuapr2015:
http://blog.acolyer.org/2015/04/15/cross-layer-scheduling-in-cloud-systems/:
http://blog.acolyer.org/2015/04/16/approxhadoop-bringing-approximations-to-mapreduce-frameworks/:
http://blog.thislongrun.com/2015/04/cap-availability-high-availability-and_16.html:
https://databricks.com/blog/2015/04/17/new-mllib-algorithms-in-spark-1-3-fp-growth-and-power-iteration-clustering.html:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

AppNexus has written about their experiences with Parquet. In comparison to snappy-compressed sequence files, snappy compressed parquet files use substantially less storage and aid performance (fewer and faster map tasks) across a number of Hive queries.

- [http://techblog.appnexus.com/blog/2015/03/31/parquet-columnar-storage-for-hadoop-data/](http://techblog.appnexus.com/blog/2015/03/31/parquet-columnar-storage-for-hadoop-data/)


This post looks at how to use Spark's GraphX to process RDF data. Specifically, it runs GraphX's connected components implementation on the graph defined by the `related` values field of the Library of Congress Subject header dataset.

- [http://www.snee.com/bobdc.blog/2015/04/running-spark-graphx-algorithm.html](http://www.snee.com/bobdc.blog/2015/04/running-spark-graphx-algorithm.html)


This post describe how to integrate Luigi, the workflow engine, with Google Cloud's BigQuery. The author shares some code for running BigQuery tasks as well as experiences in improvement to throughput and cluster utilization after introducing Luigi.

- [http://alex.vanboxel.be/2015/04/13/luigi-and-google-cloud-in-production-retrospective/](http://alex.vanboxel.be/2015/04/13/luigi-and-google-cloud-in-production-retrospective/)


The Databricks blog has an interesting look at how the Spark SQL "catalyst" optimizer works. It discusses Trees, which are the main data type manipulated by the optimizer, Rules, which optimize a query by transforming from one tree to another, the logical optimization phase, physical planning, and code generation (which makes use of Scala's quasiquotes). The post is based on a paper that's to appear at SIGMOD 2015.

- [https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html](https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)


The Hortonworks blog has a look at the new security-related features in Apache Ambari 2.0. These include setting up Kerberos and deploying/configuring Apache Ranger.

- [http://hortonworks.com/blog/ambari-2-0-for-deploying-comprehensive-hadoop-security/](http://hortonworks.com/blog/ambari-2-0-for-deploying-comprehensive-hadoop-security/)


This presentation from Hadoop Summit covers some of the recent and ongoing work related to SQL with Hive and HBase. It looks at Hive's "Live Long And Process" daemons for sub-second queries, work on a new HBase-backed Hive metastore (to replace a RDBMS), and some thoughts on how Apache Phoenix (which adds SQL atop of HBase) could leverage some of Hive's components.

- [http://www.slideshare.net/alanfgates/hive-hbase-phoenixtp-hadoopsummiteuapr2015](http://www.slideshare.net/alanfgates/hive-hbase-phoenixtp-hadoopsummiteuapr2015)


The morning paper has coverage of two-Hadoop related papers this week. The first, "Cross-layer scheduling in cloud systems," looks at how a network-layer aware scheduler can improve throughput. For MapReduce, the authors show improvement during the shuffle phase. The second post looks at "ApproxHadoop: Bringing Approximations to MapReduce Frameworks," which uses sampling, task dropping, and user-defined approximation to reduce execution time when approximation is acceptable.

- [http://blog.acolyer.org/2015/04/15/cross-layer-scheduling-in-cloud-systems/](http://blog.acolyer.org/2015/04/15/cross-layer-scheduling-in-cloud-systems/)
- [http://blog.acolyer.org/2015/04/16/approxhadoop-bringing-approximations-to-mapreduce-frameworks/](http://blog.acolyer.org/2015/04/16/approxhadoop-bringing-approximations-to-mapreduce-frameworks/)


The CAP theorem is the basis of a lot of distributed system research and applications. Unfortunately, it's often misunderstood—particularly when it comes to availability. This post describes the various parts of the CAP theorem and gives real-world examples of several CAP trade-offs (HDFS is used as the example of a CP system).

- [http://blog.thislongrun.com/2015/04/cap-availability-high-availability-and_16.html](http://blog.thislongrun.com/2015/04/cap-availability-high-availability-and_16.html)


This post looks at using Spark ML to analyze network data. It describes frequent pattern mining, and how to use Spark 1.3's implementation of Parallel FP-growth to compute it. The authors describe how Spark's implementation scales in comparison to Mahout. The post also describes MLlib's Power Iteration Clustering.

- [https://databricks.com/blog/2015/04/17/new-mllib-algorithms-in-spark-1-3-fp-growth-and-power-iteration-clustering.html](https://databricks.com/blog/2015/04/17/new-mllib-algorithms-in-spark-1-3-fp-growth-and-power-iteration-clustering.html)


**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**
