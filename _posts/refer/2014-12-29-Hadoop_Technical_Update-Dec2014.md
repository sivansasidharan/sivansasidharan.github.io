---
layout: post
category: refer
title: "Hadoop Technical Updates / 29-12-2014"
excerpt: "Hadoop Technical updates for Dec 2014"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
http://blogs.aws.amazon.com/bigdata/post/TxEUOWQRG7D9IZ/Building-and-Running-a-Recommendation-Engine-at-Any-Scale:
http://hortonworks.com/blog/discover-hdp-2-2-discover-hdp-2-2-data-storage-innovations-hadoop-distributed-filesystem-hdfs/:
http://gethue.com/how-to-deploy-hue-on-hdp/:
http://highscalability.com/blog/2014/12/17/the-big-problem-is-medium-data.html:
http://azure.microsoft.com/blog/2014/12/17/how-to-deploy-the-cloudera-evaluation-cluster-in-azure/:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

The AWS big data blog has a post on building a recommendation system using Mortar (disclosure: Mortar syndicates Hadoop Weekly and curates the events section). The tutorial walks through using Mortar’s system locally as well as in a distributed setting on Amazon EMR.

- [http://blogs.aws.amazon.com/bigdata/post/TxEUOWQRG7D9IZ/Building-and-Running-a-Recommendation-Engine-at-Any-Scale](http://blogs.aws.amazon.com/bigdata/post/TxEUOWQRG7D9IZ/Building-and-Running-a-Recommendation-Engine-at-Any-Scale)


The Hortonworks blog has a recap of a recent webinar discussing new HDFS features such as heterogeneous storage, encryption, and security enhancements. They’ve posted a Q&A from the webinar, which has a lot of good information about how these features work (or will work) in practice.

- [http://hortonworks.com/blog/discover-hdp-2-2-discover-hdp-2-2-data-storage-innovations-hadoop-distributed-filesystem-hdfs/](http://hortonworks.com/blog/discover-hdp-2-2-discover-hdp-2-2-data-storage-innovations-hadoop-distributed-filesystem-hdfs/)


The Hue blog has a post on setting up Hue for HDP 2.2. It describes the custom configuration and gotchas related to the integration.

- [http://gethue.com/how-to-deploy-hue-on-hdp/](http://gethue.com/how-to-deploy-hue-on-hdp/)


Hive-on-Spark has recently made a lot of progress, and there’s a new way to try out the integration. The team from MapR, Intel, IBM, and Cloudera have created a pre-configured Amazon AMI for trying it out.

- [http://blog.cloudera.com/blog/2014/12/hands-on-hive-on-spark-in-the-aws-cloud/](http://blog.cloudera.com/blog/2014/12/hands-on-hive-on-spark-in-the-aws-cloud/)


The High Scalability blog has a post on how Bloomberg is using HBase to serve time-series data. The post describes how they’re replacing a legacy system with HBase, which provides 1000x faster writes and 3x faster reads. With that said, they’re eagerly anticipating the upcoming timeline-consistent standby region servers will help improve read latency in the face of failure in order to meet SLAs.

- [http://highscalability.com/blog/2014/12/17/the-big-problem-is-medium-data.html](http://highscalability.com/blog/2014/12/17/the-big-problem-is-medium-data.html)


Cloudera Enterprise is available on the Microsoft Azure Marketplace for deployment in the cloud. This tutorial describes how to launch a CDH cluster in Azure, which brings up cluster with Cloudera Manager for configuration.

- [http://azure.microsoft.com/blog/2014/12/17/how-to-deploy-the-cloudera-evaluation-cluster-in-azure/](http://azure.microsoft.com/blog/2014/12/17/how-to-deploy-the-cloudera-evaluation-cluster-in-azure/)


This presentation provides an overview of using Spark together with Cassandra. The first part gives an introduction to Spark, the second looks at Spark and Cassandra (including how CQL integrates), and the last part looks at integrating Spark streaming with Cassandra.

- [http://www.slideshare.net/RussellSpitzer/zero-to-streaming-spark-and-cassandra](http://www.slideshare.net/RussellSpitzer/zero-to-streaming-spark-and-cassandra)

**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**