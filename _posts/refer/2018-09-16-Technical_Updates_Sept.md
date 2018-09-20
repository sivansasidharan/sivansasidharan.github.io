---
layout: post
category: refer
title: "Hadoop Technical Updates - 16 September 2018"
excerpt: "Bigdata Technical updates for September 2018"
tags: [bigdata, hadoop, apache, hortonworks, cloudera, mapr, databricks, spark]
comments: true
---
### Technical Updates - 16 September 2018

New open source projects from Facebook, LinkedIn, Two Sigma, and Oath this week. Several great posts about company's data experiences—the Netflix Keystone platform, Hike's experiences with BigQuery, Clio's experience sharding a production database, nextgen timeseries database at Pinterest, optimizing Redshift at Plaid, and more. And based on some of the news out of Strata, it sounds like Hadoop is really getting ready to ride the Kubernetes wave.

***
Azure Data Factory is a tool for visually designing and running ETLs between various systems (it has a bunch of connectors). This tutorial demonstrates setting up a job to load data from blob storage to a SQL database.

[More Info](https://medium.com/@karandama2006/data-load-using-azure-data-factory-2528747752fc)

***

Hike shares their experiences in moving from a Hive-based ad hoc analytics system to Google BigQuery. They saw good speedups, especially after making use of clustered tables. They detail their tooling and why they enabled require_partition_filter as a guard rail. Overall, they're seeing 50x speedups and half the cost.

[More Info] (https://blog.hike.in/moving-to-bigquery-data-at-our-fingertips-2273a71252ce)

***

Clio recently went through the process of sharding their online MySQL database, and they've documented the details of the transition. Among these, they applied a regex to detect which operations contained joins and transactions that might be problematic. Lots of practical advice if you're facing something similar.
[More Info](https://labs.clio.com/sharding-clios-database-part-1-710ec8f4861c)

***

Keystone is Netflix's platform for real-time stream processing for analytics. It's built on Apache Kafka and Apache Flink (in addition to a number of Netflix tools). This overview shows just how big the challenges are for building a multi-tenant tool at their scale—all the various flavors of stream processing are needed. The post then describes how they've built the system to meet those requirements and to be self-service with good operational characteristics.

[Keystone](https://medium.com/netflix-techblog/keystone-real-time-stream-processing-platform-a3ee651812a)

***

The AWS blog has published a sample Complex Event Processing application built on Apache Flink and EMR. It's built to detect brush fires based on sensor data.
[Apache Flink and EMR](https://aws.amazon.com/blogs/big-data/real-time-bushfire-alerting-with-complex-event-processing-in-apache-flink-on-amazon-emr-and-iot-sensor-network/)

***


**Reference :**
[Data Eng Weekly Publication](http://hadoopweekly.com)
