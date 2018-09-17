---
layout: post
category: blog
title: "Apache Hive Overview "
excerpt: "An Overview on Apache Hive "
tags: [bigdata, hive, apache, hortonworks]
Hortonworks: http://hortonworks.com/products/hortonworks-sandbox/
comments: true
---

Apache Hive is part of Data Access in the Hadoop ecosystem and can be installed when you install the Hortonworks Data Platform.
Topics covered in this post :

* Explain why Hive was developed 
* Assess whether Hive is suitable for online transaction processing or online analytical processing 
* List differences between Hive on MapReduce and Hive on Tez 
* Describe how Hive projects structure on unstructured data 
* List methods to submit Hive queries 
* Recognize a few basic Hive query language commands 

## The Problem

Until recently, most enterprise data has been stored in relational databases

* It has been analyzed using a structured query language (SQL) 
* The result is that many data analysts are familiar with SQL
The problem is that Hadoop data is commonly analyzed by MapReduce programs
* Many data analysts are not familiar with MapReduce
 
## How do enterprises bridge this knowledge gap?

Until recently most of the data maintained by an enterprise has been stored in a relational database and has been analyzed using a structured query language. As a result, most data analysts today are familiar with a structured query language.However, data in Hadoop is commonly analyzed using MapReduce. Many data analysts are not familiar with MapReduce and would require training to use it.This limits how quickly an enterprise can derive value from a Hadoop deployment.

## The Solution 

Apache Hive bridges the knowledge gap by converting SQL-like commands to MapReduce jobs*

* Hive is a data warehouse infrastructure built on top of Hadoop
* It was designed to enable experienced database users to analyze data using familiar SQL-like statements
* Hive includes a SQL-like language called Hive Query Language (HQL)
* With HQL, enterprises can utilize existing skillsets to quickly derive value from a Hadoop deployment

`Conversion to Apache Tez jobs is an option - will cover in a later post`

Apache Hive bridges the knowledge gap by enabling data analysts to use familiar SQL-like commands that are automatically converted to MapReduce jobs and executed across the Hadoop cluster.Hive is a data warehouse infrastructure built on top of Hadoop. It was designed to enable users with database experience to analyze data using familiar SQL-like statements. Hive includes a SQL-like language called Hive Query Language, or HQL. Hive and HQL enable an enterprise to utilize existing skillsets to quickly derive value from a Hadoop deployment.To avoid any potential confusion, you should be aware of a recent change to Hive. Hive’s default behavior is to convert HQL statements to MapReduce jobs. However starting with version 0.13.0, Hive’s default behavior can be modified so that it converts HQL statements to Apache Tez jobs. Hive on Tez significantly improves the performance of Hive queries. For example, Hive on MapReduce is suitable for batch queries whereas Hive on Tez is suitable for batch or interactive queries. 

## OLTP or OLAP?

* Hive is used for online analytical processing (OLAP) and not online transaction processing (OLTP)
* Hive was designed for batch rather than interactive queries
* Even the simplest Hive queries can take minutes to complete because of MapReduce - ( Although interactive queries are possible with Hive on Tez )
* Hive offers no support for row-level inserts, updates, and deletes - (Work is being done to add these features)

Hive is used for online analytical processing (OLAP) and not online transaction processing (OLTP). This is because Hive was originally designed to run batch jobs rather than performing interactive queries or random table updates. Currently Hive offers no support for row-level inserts, updates, and deletes which are commonly required for OLTP. When Hive is run over MapReduce even the simplest Hive queries can take minutes to complete.If you run Hive over Tez rather than MapReduce, Hive is still not designed for OLTP. While Tez increases interactive performance, Hive still has no supportfor row-level inserts, updates, and deletes. However, work is currently being done to add these features to Hive.

## Structuring Unstructured Data

* Hive is not a relational database although it might appear like one
* Hadoop collects and stores heterogeneous data types
* Hive has a mechanism to project structure onto this data
* The Hive metastore database stores user-defined table schemas
* HDFS stores the unstructured data
 
Hive is not a relational database although, on the surface, it can appear like one.Hadoop was built to collect, store, and analyze massive amounts of data. As such, the Hadoop distributed file system, called HDFS, is a reservoir of data from multiple sources. The data is often a mix of unstructured, semi-structured, and structured data. Hive provides a mechanism to project structure onto HDFS data and then query it using HQL. However, there is a limit to what Hive can do. Sometimes it is necessary to use another tool, like Apache Pig, to pre-format the unstructured data before processing it using Hive.If you are familiar with databases, then you understand that unstructured data has no schema associated with it. If you are not familiar with database schemas, they define the columns of a database along with the type of data in each column. Data types include such things as a string, an integer, a floating point number, or a date.

A Hive installation includes a metastore database. Several database types are supported by Hive including an embedded Derby database used for development or testing, or an external database like MySQL used for production deployments. To project structure on HDFS data, HQL includes statements to create a table with user-defined schema information. The table schema is stored in the metastore database.The user-defined schema is associated with the data stored in one or more HDFS files when you use HQL statements to load the files into a table. The format of the data on HDFS remains unchanged but it appears as structured data whenusing HQL commands to submit queries.
 
## Hive includes four methods to submit queries.

* The Hive CLI 
* Beeline CLI
* Web UI
* ODBC and JDBC drivers

Hive includes many methods to submit queries. Queries submitted to either the HiveServer or newer HiveServer2 result in a MapReduce or Tez job being submitted to YARN. YARN, the Hadoop resource scheduler, works in concert with HDFS to run the job in parallel across the machines in the cluster.The Hive CLI is used to interactively or non-interactively submit HQL commands to the HiveServer.The illustration shows the Hive CLI being used interactively. Users enter HQL commands at the hive> prompt. HQL commands can also be placed into a file and run using hive –f file_name.

The remaining three methods all submit HQL queries to the newer HiveServer2.
The Beeline CLI is a new JDBC client that connects to a local or remote HiveServer2. When connecting locally, beeline works just like the Hive CLI. Beeline can connect to a remote HiveServer2 usinga variety of methods that include TCP and HTTP. For example, HTTP access is useful for submitting queries to a firewall protected cluster, assuming the firewall will allow HTTP traffic.The Web UI, called the Hive Web Interface or HWI, enables you to submit Hive queries remotely using HTTP. Again, this is useful for submitting queries to a firewall protected cluster. The difference between using the Web UI or beeline is that no Hive client software has to be installed to use the Web UI.ODBC and JDBC drivers enable you to connect to popular business intelligence tools to query, analyze,and visualize Hive data.

While not illustrated above, you may also use the Hadoop User Experience, called HUE, to enter Hive queries. HUE is a graphical interface that enables you to interactively enter Hive queries, similar to what you would do from the Hive shell. Like most graphical tools, it provides many features to make Hive analysis easier. For example, you can write and test a series of Hive queries and then easily save them to a script for future use. You can use a single interface to execute queries and view the results and execution logs.

#### Example HQL Commands

> Create a table:
CREATE TABLE stockinfo (symbol STRING, price FLOAT, change FLOAT) ROW FORMAT DELIMITED FIELDS TERMINATED BY ‘,’;

> Load data from file in HDFS:
LOAD DATA INPATH ‘/user/me/stockdata.csv’ OVERWRITE INTO TABLE stockinfo;

> View everything in the table:
SELECT * from stockinfo; 

A few common HQL commands are illustrated here. 

The first command creates a table named stockinfo. The table is created with three columns named symbol, price, and change. Any data in the first column will be treated as a string of characters. Any data in the second and third columns will be treated as a floating point number. The ROW FORMAT clause tells Hive to expect each row of data to be delimited by commas.

The second command loads the data in the HDFS file named /user/me/stockdata.csv into a table named stockinfo. If any data has been previously loaded into the table it will overwritten. Loading datainto a table only associates the data with the table. The data is not altered in any way.The final command displays the entire contents of the stockinfo table. Such a command could take a long timeto complete if there is a large amount of data.(HQL syntax rules require every command end with a semi-colon)

## Hive Demonstration
The demonstration is based on one of the Hortonworks Sandbox tutorials.
The Sandbox is a downloadable virtual machine preinstalled and preconfigured with a Hadoop cluster.
It runs all master, slave, and client components on the same machine. 
The Sandbox machine and tutorials are found at [Hortonworks](http://hortonworks.com/products/hortonworks-sandbox/) website. 
