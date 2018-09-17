---
layout: post
category: refer
title: "Hadoop Technical Updates / 17-11-2014"
excerpt: "Hadoop Technical updates for Nov 2014"
tags: [bigdata, hadoop, apache, hortonworks, compression]
http://blog.cloudera.com/blog/2014/11/how-cerner-uses-cdh-with-apache-kafka/:
https://www.mapr.com/blog/how-turn-raw-data-yelp-insights-minutes-apache-drill:
http://blog.cloudera.com/blog/2014/11/how-apache-sqoop-1-4-5-improves-oracle-databaseapache-hadoop-integration/:
http://hortonworks.com/blog/data-science-apacheh-hadoop-predicting-airline-delays/:
http://ingest.tips/2014/11/10/parquet-support-arriving-in-sqoop/:
http://blog.cask.co/2014/11/how-we-built-it-designing-a-globally-consistent-transaction-engine/:
http://www.slideshare.net/pacoid/tiny-batches-in-the-wine-shiny-new-bits-in-spark-streaming:
Hadoop Weekly Publication:
comments: true
---

### Technical Updates

The Cloudera blog has a guest post from Cerner about integrating Apache Kafka with HBase and Storm for real-time processing. The post describes how adopting Kafka helped reduce load on HBase (which was previously used for queuing) and improve performance. This style of Kafka-based architecture seems to be more and more common, but it’s always interesting to hear how folks are putting together the pieces of the Hadoop ecosystem.

- [http://blog.cloudera.com/blog/2014/11/how-cerner-uses-cdh-with-apache-kafka/](http://blog.cloudera.com/blog/2014/11/how-cerner-uses-cdh-with-apache-kafka/)


The MapR blog has a post on using the recently-released Apache Drill 0.6.0-incubating to analyze Yelp’s public data set. The data, which is a JSON file, can be queried directly via SQL in Drill without first declaring the data’s schema (drill auto-detects it). The post has a number of sample queries which you can use to get started analyzing this or any other data set.

- [https://www.mapr.com/blog/how-turn-raw-data-yelp-insights-minutes-apache-drill](https://www.mapr.com/blog/how-turn-raw-data-yelp-insights-minutes-apache-drill)


The Cloudera blog has a second guest post, this time from Dell, on the new Oracle direct-mode in Sqoop 1.4.5. The post describes several of the implemented optimizations in the Oracle direct mode and includes an analysis of performance improvements the connector provides.

- [http://blog.cloudera.com/blog/2014/11/how-apache-sqoop-1-4-5-improves-oracle-databaseapache-hadoop-integration/](http://blog.cloudera.com/blog/2014/11/how-apache-sqoop-1-4-5-improves-oracle-databaseapache-hadoop-integration/)


The Hortonworks blog has a post on using Apache Pig with the Python Scikit-learn package in order predict flight delays using logistic regression and random forests. The post is a bit light in details, but there is a linked IPython notebook which has a very detailed overview and description of the entire process.  Given that Python is often a data scientist’s top choice for machine learning on small data sets, it’s useful to see how to extend it to larger data sets with Pig.

- [http://hortonworks.com/blog/data-science-apacheh-hadoop-predicting-airline-delays/](http://hortonworks.com/blog/data-science-apacheh-hadoop-predicting-airline-delays/)


The ingest.tips blog has a post on Sqoop1 support for Parquet, which leverages the Kite SDK to generate Parquet files during import. The post serves as a good introduction to Sqoop1, which can both import data to HDFS and update the Hive metastore with information about the data. There are examples demonstrating how to use Parquet support.

- [http://ingest.tips/2014/11/10/parquet-support-arriving-in-sqoop/](http://ingest.tips/2014/11/10/parquet-support-arriving-in-sqoop/)


Tephra is a open-source system that provides globally-consistent transactions for Apache HBase. Cask, the makers of Tephra, have written a blog post describing the requirements and design of Tephra. Tephra is designed in such a way that it can be used with systems other than HBase, and it is even designed to support transactions spanning multiple data stores.

- [http://blog.cask.co/2014/11/how-we-built-it-designing-a-globally-consistent-transaction-engine/](http://blog.cask.co/2014/11/how-we-built-it-designing-a-globally-consistent-transaction-engine/)


This presentation focusses on Spark streaming, the micro-batch component of Apache Spark. The slides give an introduction to both Spark and Spark streaming, describe several use cases (claiming there are 40+ known production use cases), give an overview of several integrations (Cassandra, Kafka, Elastic Search, and more), and look ahead to some upcoming features and improvements in the development pipeline.

- [http://www.slideshare.net/pacoid/tiny-batches-in-the-wine-shiny-new-bits-in-spark-streaming](http://www.slideshare.net/pacoid/tiny-batches-in-the-wine-shiny-new-bits-in-spark-streaming)

**Reference : [Hadoop Weekly Publication](http://hadoopweekly.com)**