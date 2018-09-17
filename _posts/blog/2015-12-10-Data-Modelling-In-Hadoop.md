---
layout: post
category: blog
title: "Data Modelling In Hadoop - Key Considerations"
excerpt: "Key considerations while modelling data in Hadoop"
tags: [bigdata, hadoop, apache, hortonworks, datamodelling]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

###Data Modelling In Hadoop


A common term one hears in the context of Hadoop is Schema-on-Read. This simply refers to the fact that raw, unprocessed data can be loaded into Hadoop, with the structure imposed at processing time based on the requirements of the processing application.This is different from Schema-on-Write, which is generally used with traditional data management systems.When the application or structure of data is not as well understood, the agility provided by the Schema-on-Read pattern can provide invaluable insights on data not previously accessible.

Relational databases and data warehouses are often a good fit for well-understood and frequently accessed queries and reports on high-value data. Increasingly, though, Hadoop is taking on many of these workloads, particularly for queries that need to operate on volumes of data that are not economically or technically practical to process with traditional systems.

Although being able to store all of your raw data is a powerful feature, there are still many factors that you should take into consideration before dumping your data into Hadoop. These considerations include:

> Data storage formats

There are a number of file formats and compression formats supported on Hadoop.Each has particular strengths that make it better suited to specific applications. Additionally, although Hadoop provides the Hadoop Distributed File System (HDFS) for storing data, there are several commonly used systems implemented on top of HDFS, such as HBase for additional data access functionality and Hive for additional data management functionality. Such systems need to be taken into consideration as well.

> Multitenancy

It’s common for clusters to host multiple users, groups, and application types.Supporting multitenant clusters involves a number of important considerations when you are planning how data will be stored and managed.

> Schema design

Despite the schema-less nature of Hadoop, there are still important considerations to take into account around the structure of data stored in Hadoop. This includes directory structures for data loaded into HDFS as well as the output of data processing and analysis. This also includes the schemas of objects stored in systems such as HBase and Hive.

> Metadata management

As with any data management system, metadata related to the stored data is often as important as the data itself. Understanding and making decisions related to metadata management are critical.

*Another important factor when making storage decisions with Hadoop is security and its associated considerations. This includes decisions around authentication, fine-grained access control, and encryption—both for data on the wire and data at rest.*

*Reference -*
[Cloudera](http://blog.cloudera.com) | 
[Hortonworks](http://hortonworks.com) | 
[O'Reilly - Hadoop Application Architectures](http://shop.oreilly.com/product/0636920033196.do)

